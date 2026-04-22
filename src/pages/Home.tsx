import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, CheckCircle, Search, Info, MessageCircle, Sparkles, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';

export default function Home() {
  const [localQuery, setLocalQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isSearchingLocal, setIsSearchingLocal] = useState(false);

  const handleLocalSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    
    if (!query) return;

    if (!process.env.GEMINI_API_KEY) {
      alert("AI Configuration is missing.");
      return;
    }
    
    setIsSearchingLocal(true);
    setAiResponse(null);
    setLocalQuery(query);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a 2 to 3 sentence summary of the general election structure, number of legislative assembly seats, or any key political setup for the Indian region: ${query}. Keep it strictly factual, brief, and purely informative about India's elections. If the region is invalid, politely state that you can only provide information on Indian states and major cities.`,
      });
      setAiResponse(response.text?.trim() || "No information found.");
    } catch (error) {
      setAiResponse("Failed to fetch information. Please try again.");
      console.error(error);
    } finally {
      setIsSearchingLocal(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-saffron text-white px-3 py-1 rounded-full mb-6">
            Empowering Every Indian Voter
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0A2540] dark:text-white mb-6">
            Understand Elections.<br />
            <span className="font-medium text-slate-400">Step by Step.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Your complete, easy-to-understand guide to voting, timelines, and democratic procedures in India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/journey"
              className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-10 py-4 rounded-2xl font-bold shadow-card text-sm transition-transform hover:scale-105"
            >
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link
              to="/hub"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-white border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-10 py-4 rounded-2xl font-bold text-sm shadow-sm transition-transform hover:scale-105"
            >
              Learning Hub
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quick Location Check */}
      <section className="max-w-3xl mx-auto w-full px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-card flex flex-col gap-6 target-feature">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2">Find Your Local Info (AI)</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0 text-sm">Enter your State or City to instantly fetch election structure insights via Gemini AI.</p>
            </div>
            <form 
              className="w-full md:w-auto relative flex items-center"
              onSubmit={handleLocalSearch}
            >
              <input 
                type="text" 
                name="search"
                placeholder="e.g. Haryana" 
                className="w-full md:w-64 pl-4 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-brand-saffron transition-all dark:text-white"
                disabled={isSearchingLocal}
              />
              <button 
                type="submit" 
                disabled={isSearchingLocal}
                className="absolute right-3 p-2 bg-brand-saffron text-white rounded-xl hover:bg-orange-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSearchingLocal ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              </button>
            </form>
          </div>

          {/* AI Response Area */}
          <AnimatePresence>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-brand-blue/5 dark:bg-brand-blue/10 border border-brand-blue/20 rounded-2xl p-6 relative">
                  <span className="font-bold text-xs uppercase tracking-wider text-brand-blue mb-2 block">AI Overview for {localQuery}</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {aiResponse}
                  </p>
                  <button 
                    onClick={() => setAiResponse(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold text-center tracking-tight text-[#0A2540] dark:text-white mb-12">How VoteWise Helps You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Flow",
              desc: "A step-by-step wizard checking eligibility, registration, and election day readiness.",
              icon: <CheckCircle size={28} />,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-100 dark:bg-blue-900/20"
            },
            {
              title: "Election Timeline",
              desc: "Visualize the entire process from nomination filing to the final result declaration.",
              icon: <Info size={28} />,
              color: "text-brand-saffron",
              bg: "bg-orange-100 dark:bg-orange-900/20"
            },
            {
              title: "AI VoteBot",
              desc: "Have a question about EVMs, NOTA, or timing? Ask our smart assistant anytime.",
              icon: <MessageCircle size={28} />,
              color: "text-brand-green",
              bg: "bg-green-100 dark:bg-green-900/20"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-card flex-1 flex flex-col group transition-colors hover:border-brand-saffron"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex flex-col justify-center items-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
