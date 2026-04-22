import { Outlet, Link, useLocation } from 'react-router-dom';
import { Vote, Share2, Award, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import VoteBot from './VoteBot';
import { useProgress } from '../context/ProgressContext';

export default function Layout() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { score, badges, recentBadge, clearRecentBadge } = useProgress();

  useEffect(() => {
    // Force dark mode active
    document.documentElement.classList.add('dark');
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Journey', path: '/journey' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Hub & FAQ', path: '/hub' },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'VoteWise India',
        text: 'Understand the Indian Election process step-by-step!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Share feature is not supported on this browser.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-slate-900 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-blue text-white w-8 h-8 rounded-lg flex items-center justify-center">
                <Vote size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                VoteWise <span className="text-brand-saffron">India</span>
              </span>
            </Link>

            <nav className="hidden md:flex gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    location.pathname === link.path
                      ? 'text-brand-saffron'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 bg-brand-saffron/10 text-brand-saffron hover:bg-brand-saffron/20 px-4 py-2 rounded-full font-bold transition-colors text-sm"
              >
                <span>🏆</span> {score} XP
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Vote size={20} className="text-brand-blue dark:text-white" />
            <span className="font-semibold text-brand-blue dark:text-white">VoteWise India</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Empowering voters with knowledge. Not an official government website.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <VoteBot />

      {/* Profile/Badges Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A2540]/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-card overflow-hidden"
            >
              <div className="bg-[#0A2540] p-6 text-white text-center relative">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {score >= 200 ? '🎖️' : score >= 100 ? '🌟' : '🌱'}
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Your Civic Profile</h2>
                <p className="text-brand-saffron font-bold text-lg">{score} XP Earned</p>
              </div>
              
              <div className="p-6 h-[50vh] overflow-y-auto">
                <h3 className="font-bold text-lg mb-4 text-[#0A2540] dark:text-white">Earned Badges ({badges.length})</h3>
                
                {badges.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <Award size={40} className="mx-auto mb-3 opacity-20" />
                    <p>No badges yet. Start your journey or read the Hub to earn points!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {badges.map((badge, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-center transform transition hover:-translate-y-1">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h4 className="font-bold text-sm text-[#0A2540] dark:text-white leading-tight mb-1">{badge.name}</h4>
                        <p className="text-xs text-slate-500 leading-tight">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gamification Toast Notification */}
      <AnimatePresence>
        {recentBadge && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] bg-white dark:bg-slate-900 border border-brand-saffron/30 shadow-card p-4 rounded-2xl flex items-center gap-4 w-[90%] max-w-sm"
          >
            <div className="text-4xl">{recentBadge.icon}</div>
            <div className="flex-1">
              <p className="text-xs font-bold text-brand-saffron uppercase tracking-wider mb-0.5">Badge Earned!</p>
              <h4 className="font-bold text-[#0A2540] dark:text-white leading-tight">{recentBadge.name}</h4>
            </div>
            <button onClick={clearRecentBadge} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
