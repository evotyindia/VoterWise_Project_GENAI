import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function VoteBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm VoteBot. I can help you with questions about Indian elections, voter registration, and EVMs. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.GEMINI_API_KEY) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are VoteBot, a friendly and helpful AI assistant for 'VoteWise India'. 
Your task is to help users (especially first-time voters aged 18-25) understand the Indian election process.
Use simple, clear English. Avoid overly complex legal or political jargon.
If asked about a specific location's election dates, politely state that you provide general guidance and they should check the official ECI website for exact dates.
Topics you cover: Eligibility, Voter ID (EPIC) registration, checking name in voter list, polling day process, EVM/VVPAT operation, NOTA, and the general timeline (Nomination to Results).
Keep responses concise (1-2 short paragraphs) and formatted nicely.`,
        },
      });

      // Send history (excluding the first welcome string since it's hardcoded for UI, but let's just send the user message for simplicity since we don't persist history deeply here, or we can build the history array)
      
      // We will just do generateContent for simplicity unless full chat history is needed. Let's use simple generateContent with the user message and recent context.
      const historyContext = messages
        .filter(m => m.id !== '1') // skip welcome msg
        .slice(-4)
        .map(m => `${m.role === 'user' ? 'User' : 'VoteBot'}: ${m.text}`)
        .join('\n');
        
      const prompt = `Recent conversation:\n${historyContext}\n\nUser: ${userMsg}\nVoteBot:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: `You are VoteBot, a friendly and helpful AI assistant for 'VoteWise India'. 
Your task is to help users (especially young Indian voters) understand the Indian election process.
Keep answers very brief, simple, and avoid jargon.`
        }
      });

      const text = response.text || "I'm having trouble connecting to my database. Please check the official ECI website.";
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'model', text: 'Oops! Something went wrong. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-card hover:bg-brand-blue/90 transition-transform ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[350px] bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}
      >
        <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={24} />
            <span className="font-semibold">VoteBot</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-blue text-white rounded-tr-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-[#0A2540] dark:text-slate-100 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl rounded-tl-sm">
                <Loader2 size={16} className="animate-spin flex-shrink-0 text-brand-blue dark:text-white" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-blue"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center hover:bg-brand-blue/90 disabled:opacity-50"
            >
              <Send size={18} className="translate-x-[2px]" />
            </button>
          </form>
        </div>
        {!process.env.GEMINI_API_KEY && (
             <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
               <span className="text-xl mb-2">🔑</span>
               <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">API Key Required</p>
               <p className="text-xs text-slate-500 dark:text-slate-400">Please configure the GEMINI_API_KEY in the AI Studio platform to use VoteBot.</p>
             </div>
        )}
      </div>
    </>
  );
}
