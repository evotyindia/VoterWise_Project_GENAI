import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, BookOpen, AlertTriangle } from 'lucide-react';
import { QA } from '../types';
import { useProgress } from '../context/ProgressContext';

const FAQS: QA[] = [
  {
    question: "Can I vote without Voter ID?",
    answer: "Yes, if your name is on the electoral roll. You can show alternative photo IDs approved by ECI, such as Passport, Driving License, PAN card, or Aadhaar card."
  },
  {
    question: "What is NOTA?",
    answer: "NOTA stands for 'None of the Above'. It allows voters to officially register a vote of rejection for all candidates contesting. However, NOTA does not affect the election result (the candidate with highest valid votes still wins)."
  },
  {
    question: "How to transfer voter registration?",
    answer: "You need to fill Form 8 online via the Voter Service Portal or offline to shift your constituency in case you shifted your residence."
  },
  {
    question: "What is an EVM and VVPAT?",
    answer: "EVM (Electronic Voting Machine) records votes electronically. VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing who you voted for. It's visible through a glass for 7 seconds before falling into a sealed box, ensuring transparency."
  }
];

export default function Hub() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { markCompleted } = useProgress();

  const handleArticleClick = (idx: number) => {
    markCompleted(`hub_article_${idx}`, 30, { id: `scholar_${idx}`, name: 'Democracy Scholar', icon: '📚', description: 'Read a quick guide on voting.' });
  };

  const handleFaqClick = (idx: number) => {
    markCompleted('hub_faq', 20, { id: 'curious', name: 'Curious Citizen', icon: '🔍', description: 'Explored the Frequently Asked Questions.' });
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-16">
       
       {/* Hub Header */}
       <div className="text-center">
         <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0A2540] dark:text-white mb-4">Learning Hub</h1>
         <p className="text-xl text-slate-600 dark:text-slate-400">Articles, facts, and answers to common questions.</p>
       </div>

       {/* Articles Grid */}
       <section>
          <div className="flex items-center gap-3 mb-6">
             <BookOpen size={24} className="text-brand-blue dark:text-brand-saffron" />
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Guides</h2>
          </div>
           <div className="grid sm:grid-cols-2 gap-6">
            <div onClick={() => handleArticleClick(1)} className="group border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-card hover:border-brand-saffron transition-colors cursor-pointer">
              <h3 className="font-bold text-xl mb-3 text-[#0A2540] dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-saffron">Why Voting Matters</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Understand the power of a single vote and how democratic participation shapes local and national policies.</p>
            </div>
            <div onClick={() => handleArticleClick(2)} className="group border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-card hover:border-brand-saffron transition-colors cursor-pointer">
              <h3 className="font-bold text-xl mb-3 text-[#0A2540] dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-saffron">Understanding the Model Code of Conduct</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">A brief guide on rules political parties must follow during elections to ensure fairness.</p>
            </div>
          </div>
       </section>

       {/* Myth vs Fact */}
       <section className="bg-[#0A2540] text-white rounded-3xl p-8 shadow-card">
          <div className="flex items-center gap-3 mb-8">
             <AlertTriangle size={24} className="text-brand-saffron" />
             <h2 className="text-2xl font-bold tracking-tight">Myth vs Fact</h2>
          </div>
          <div className="space-y-6">
             <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-red-900/40 p-4 rounded-xl border border-red-500/30">
                   <span className="text-red-400 font-bold block mb-1">Myth:</span>
                   "EVMs can be connected to wifi and hacked."
                </div>
                <div className="flex-1 bg-green-900/40 p-4 rounded-xl border border-green-500/30">
                   <span className="text-green-400 font-bold block mb-1">Fact:</span>
                   EVMs are standalone machines with NO wireless communication capabilities. They cannot connect to the internet.
                </div>
             </div>
          </div>
       </section>

       {/* FAQ Accordion */}
       <section>
          <h2 className="text-3xl font-bold tracking-tight text-[#0A2540] dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
             {FAQS.map((faq, idx) => {
               const isOpen = openFaq === idx;
               return (
                 <div key={idx} className="border border-slate-100 dark:border-slate-800 shadow-card bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
                      <button 
                        onClick={() => handleFaqClick(idx)}
                        className="w-full flex justify-between items-center p-6 text-left"
                      >
                        <span className="font-bold text-lg text-[#0A2540] dark:text-white">{faq.question}</span>
                        <ChevronDown className={`transform transition-transform text-slate-500 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               )
             })}
          </div>
       </section>
    </div>
  );
}
