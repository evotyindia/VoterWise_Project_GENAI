import { motion } from 'motion/react';
import { ArrowRight, MapPin, CheckCircle, Search, Info, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
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
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-card flex flex-col md:flex-row gap-6 items-center target-feature">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
            <MapPin size={20} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2">Find Your Local Info</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0">Enter your State or City to search the ECI portal for relevant guidelines.</p>
          </div>
          <form 
            className="w-full md:w-auto relative flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
              if (query) {
                window.open(`https://results.eci.gov.in/search?q=${encodeURIComponent(query)}`, '_blank');
              }
            }}
          >
            <input 
              type="text" 
              name="search"
              placeholder="e.g. Maharashtra" 
              className="w-full md:w-64 pl-4 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-brand-blue transition-all dark:text-white"
            />
            <button type="submit" className="absolute right-3 p-2 bg-brand-blue text-white rounded-xl hover:bg-[#0A2540] transition-colors cursor-pointer">
              <Search size={16} />
            </button>
          </form>
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
