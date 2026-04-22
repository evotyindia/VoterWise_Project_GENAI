import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, User, FileText, Calendar, Info, MapPin } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';

const STEPS = [
  { id: 1, title: 'Eligibility', icon: User },
  { id: 2, title: 'Registration', icon: FileText },
  { id: 3, title: 'Voter ID (EPIC)', icon: Info },
  { id: 4, title: 'Voting Day', icon: Calendar },
];

export default function Journey() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);
  const { markCompleted } = useProgress();

  const handleNext = () => {
    if (currentStep === 1) {
      markCompleted('journey_1', 50, { id: 'eligibility', name: 'Eligibility Master', icon: '🎓', description: 'Completed checking voter eligibility.' });
    } else if (currentStep === 2) {
      markCompleted('journey_2', 50, { id: 'registration', name: 'Registration Pro', icon: '📝', description: 'Learned the forms for registration.' });
    } else if (currentStep === 3) {
      markCompleted('journey_3', 50, { id: 'epic', name: 'EPIC Holder', icon: '🪪', description: 'Understood Voter ID importance.' });
    }
    setCurrentStep((p) => Math.min(p + 1, STEPS.length));
  };
  
  const handleFinish = () => {
    markCompleted('journey_4', 100, { id: 'ready', name: 'Ready Voter', icon: '🗳️', description: 'Fully prepared for Voting Day!' });
    setIsFinished(true);
  };

  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const updateAnswer = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
  };

  const isEligible = answers['age'] === 'yes' && answers['citizen'] === 'yes';

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto w-full px-4 pt-16 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 shadow-card"
        >
          <span className="text-6xl mb-6 block drop-shadow-md">🗳️</span>
          <h2 className="text-4xl font-bold tracking-tight text-[#0A2540] dark:text-white mb-4">You're Ready to Vote!</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">
            You've completed the voting journey guide. Keep this knowledge handy and make sure your registration is active before polling day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/timeline" className="px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl shadow-card transition-transform hover:-translate-y-1">
              View Election Timeline
            </Link>
            <Link to="/hub" className="px-8 py-4 bg-slate-50 dark:bg-slate-800 text-[#0A2540] border border-slate-100 dark:border-slate-700 dark:text-white font-bold rounded-2xl transition-transform hover:-translate-y-1">
              Explore Learning Hub
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 pt-8">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-blue z-0 transition-all duration-500 rounded-full"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isPast = currentStep > step.id;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 z-10 bg-[#F8FAFC] dark:bg-slate-950 px-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    isActive
                      ? 'border-brand-blue bg-brand-blue text-white'
                      : isPast
                      ? 'border-brand-green bg-brand-green text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400'
                  }`}
                >
                  {isPast ? <Check size={20} /> : <Icon size={20} />}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider hidden sm:block ${
                  isActive ? 'text-brand-blue dark:text-white' : 'text-slate-500'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-card min-h-[400px] flex flex-col">
        <AnimatePresence mode="popLayout">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-saffron text-white px-3 py-1 rounded-full">Step 01</span>
                <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white mt-4">Check Your Eligibility</h2>
                <p className="text-slate-500 mt-2">Let's check if you are ready for the upcoming elections in India.</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Are you 18 or older?</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateAnswer('age', 'yes')}
                        className={`flex-1 py-4 border rounded-2xl font-bold text-sm transition-all ${answers['age'] === 'yes' ? 'border-brand-saffron bg-brand-saffron/5 text-brand-saffron' : 'border-slate-200 dark:border-slate-800 hover:border-brand-blue hover:text-brand-blue'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => updateAnswer('age', 'no')}
                        className={`flex-1 py-4 border rounded-2xl font-bold text-sm transition-all ${answers['age'] === 'no' ? 'border-brand-saffron bg-brand-saffron/5 text-brand-saffron' : 'border-slate-200 dark:border-slate-800 hover:border-brand-blue hover:text-brand-blue'}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Indian Citizen?</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateAnswer('citizen', 'yes')}
                        className={`flex-1 py-4 border rounded-2xl font-bold text-sm transition-all ${answers['citizen'] === 'yes' ? 'border-brand-saffron bg-brand-saffron/5 text-brand-saffron' : 'border-slate-200 dark:border-slate-800 hover:border-brand-blue hover:text-brand-blue'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => updateAnswer('citizen', 'no')}
                        className={`flex-1 py-4 border rounded-2xl font-bold text-sm transition-all ${answers['citizen'] === 'no' ? 'border-brand-saffron bg-brand-saffron/5 text-brand-saffron' : 'border-slate-200 dark:border-slate-800 hover:border-brand-blue hover:text-brand-blue'}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Did you know?</strong> Every citizen of India who is 18 years of age on the qualifying date is eligible to vote.
                  </p>
                </div>

                {answers['age'] && answers['citizen'] && !isEligible && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-brand-saffron/10 rounded-2xl border border-brand-saffron/20"
                  >
                    <p className="text-sm font-bold text-brand-saffron">
                      Note: You must be an Indian citizen and 18 years or older to vote. However, you can still continue exploring this guide to learn how the election process works!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-6 flex-1">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-saffron text-white px-3 py-1 rounded-full">Step 02</span>
                  <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white mt-4">Voter Registration</h2>
                  <p className="text-slate-500 mt-2">To vote, your name must be on the electoral roll. Here is how you do it:</p>
                </div>

              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="p-6 border border-slate-100 dark:border-slate-800 shadow-card rounded-2xl">
                    <h3 className="font-bold text-xl mb-2 text-brand-blue dark:text-blue-400">Form 6</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">For applying to register as a new voter.</p>
                    <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-saffron hover:underline">Download / Fill Online &rarr;</a>
                 </div>
                 <div className="p-6 border border-slate-100 dark:border-slate-800 shadow-card rounded-2xl">
                    <h3 className="font-bold text-xl mb-2 text-brand-blue dark:text-blue-400">Form 8</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">For address change or correction in details.</p>
                    <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-saffron hover:underline">Download / Fill Online &rarr;</a>
                 </div>
              </div>

                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl mt-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2 text-[#0A2540] dark:text-white"><MapPin size={18}/> Documents Needed:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li>Passport size photograph</li>
                    <li>Proof of Age (Birth certificate, 10th marksheet, PAN, Aadhaar)</li>
                    <li>Proof of Address (Aadhaar, Bank Passbook, Passport, Utility bill)</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-6 flex-1">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-saffron text-white px-3 py-1 rounded-full">Step 03</span>
                  <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white mt-4">Your Voter ID (EPIC)</h2>
                  <p className="text-slate-500 mt-2">Electors Photo Identity Card (EPIC) is your primary proof on voting day.</p>
                </div>
              
              <div className="aspect-video bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center p-8 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                  <div className="w-full max-w-sm h-48 bg-white dark:bg-slate-900 shadow-card rounded-3xl flex p-4 border border-slate-100 dark:border-slate-800 transform rotate-[-2deg] relative z-10">
                     <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 pr-4 flex flex-col items-center">
                        <div className="w-16 h-20 bg-slate-50 dark:bg-slate-800 rounded-xl mb-2"></div>
                        <div className="w-16 h-4 bg-slate-50 dark:bg-slate-800 rounded-md mt-auto"></div>
                     </div>
                     <div className="w-2/3 pl-4 flex flex-col gap-3">
                         <div className="h-4 bg-slate-50 dark:bg-slate-800 w-3/4 rounded-md"></div>
                         <div className="h-4 bg-slate-50 dark:bg-slate-800 w-1/2 rounded-md"></div>
                         <div className="h-4 bg-slate-50 dark:bg-slate-800 w-full rounded-md mt-4"></div>
                         <div className="h-4 bg-slate-50 dark:bg-slate-800 w-5/6 rounded-md"></div>
                     </div>
                  </div>
              </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm">
                  <strong className="text-[#0A2540] dark:text-white">Tip:</strong> Don't have a physical Voter ID? You can download e-EPIC from the Voter Portal or carry alternative approved IDs like Aadhaar or Passport.
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-6 flex-1">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-saffron text-white px-3 py-1 rounded-full">Step 04</span>
                  <h2 className="text-3xl font-bold text-[#0A2540] dark:text-white mt-4">Voting Day Guide</h2>
                  <p className="text-slate-500 mt-2">Step-by-step what happens at the polling booth.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Identity Check", desc: "Show your EPIC or approved ID to the polling officer." },
                    { title: "Finger Marking", desc: "Officer will mark your left index finger with indelible ink." },
                    { title: "Register Sign", desc: "Sign or put thumb impression in the register (Form 17A)." },
                    { title: "Cast Vote", desc: "Go to EVM, press the blue button against your chosen candidate. A red light flashes." },
                    { title: "VVPAT Verification", desc: "Look at the VVPAT machine. A slip showing your candidate prints and is visible for 7 seconds before dropping into the box." }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold">{i+1}</div>
                      <div>
                        <h4 className="font-bold text-[#0A2540] dark:text-white">{s.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={currentStep === STEPS.length ? handleFinish : handleNext}
          disabled={currentStep === 1 && (!answers['age'] || !answers['citizen'])}
          className="px-10 py-4 bg-brand-blue text-white rounded-2xl font-bold shadow-card flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {currentStep === STEPS.length ? "Finish" : "Next Step"}
          {currentStep !== STEPS.length && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );
}
