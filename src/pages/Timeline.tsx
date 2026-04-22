import { motion } from 'motion/react';
import { CalendarDays } from 'lucide-react';
import { useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';

export default function Timeline() {
  const { markCompleted } = useProgress();

  useEffect(() => {
    markCompleted('timeline_view', 50, { id: 'historian', name: 'Timeline Tracker', icon: '⏳', description: 'Reviewed the election timeline process.' });
  }, [markCompleted]);

  const timelineEvents = [
    {
      title: "Notification of Election",
      desc: "Election Commission issues the formal notification.",
      details: "This marks the official start of the election process. The Model Code of Conduct comes into active enforcement."
    },
    {
      title: "Filing Nominations",
      desc: "Candidates file their papers.",
      details: "Candidates must submit an affidavit detailing their criminal record, assets, liabilities, and educational qualifications."
    },
    {
      title: "Scrutiny",
      desc: "Checking of nomination papers.",
      details: "Returning Officer verifies the validity of the papers submitted."
    },
    {
      title: "Withdrawal",
      desc: "Last day to withdraw candidacy.",
      details: "Candidates who change their mind can withdraw. Final list of candidates is published after this."
    },
    {
      title: "Campaigning",
      desc: "Rallies, speeches, and outreach.",
      details: "Campaigning must stop 48 hours before the end of polling (usually known as the silence period)."
    },
    {
      title: "Polling Day",
      desc: "Voters cast their votes using EVMs.",
      details: "Occurs in multiple phases for general elections. Security forces ensure safe and fair voting."
    },
    {
      title: "Counting & Results",
      desc: "EVMs are opened and votes are tallied.",
      details: "Results are usually declared the same day counting begins."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
       <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-brand-saffron/10 flex items-center justify-center mx-auto mb-6">
            <CalendarDays size={32} className="text-brand-saffron" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0A2540] dark:text-white mb-4">Election Timeline</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">The journey from notification to declaration.</p>
       </div>

       <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12">
          {timelineEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[73px] top-6 w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center shadow-lg shadow-blue-900/20 border-4 border-slate-50 dark:border-slate-950">
                 <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-card flex flex-col group">
                 <h3 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">{event.title}</h3>
                 <p className="text-lg font-medium text-brand-blue dark:text-blue-400 mb-4">{event.desc}</p>
                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{event.details}</p>
              </div>
            </motion.div>
          ))}
       </div>
    </div>
  );
}
