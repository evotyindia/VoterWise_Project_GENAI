import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

interface ProgressState {
  score: number;
  completedItems: string[];
  badges: Badge[];
}

interface ProgressContextType extends ProgressState {
  markCompleted: (itemId: string, points: number, badgeData?: Omit<Badge, 'earnedAt'>) => void;
  resetProgress: () => void;
  recentBadge: Badge | null;
  clearRecentBadge: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ProgressState>({
    score: 0,
    completedItems: [],
    badges: []
  });
  
  const [recentBadge, setRecentBadge] = useState<Badge | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('votewise_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState({
          score: parsed.score || 0,
          completedItems: parsed.completedItems || [],
          badges: parsed.badges || []
        });
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const markCompleted = useCallback((itemId: string, points: number, badgeData?: Omit<Badge, 'earnedAt'>) => {
    setState(prev => {
      if (prev.completedItems.includes(itemId)) {
        return prev;
      }
      
      const newBadge = badgeData ? { ...badgeData, earnedAt: new Date().toISOString() } : null;
      
      const nextState = {
        score: prev.score + points,
        completedItems: [...prev.completedItems, itemId],
        badges: newBadge ? [...prev.badges, newBadge] : prev.badges
      };
      
      localStorage.setItem('votewise_progress', JSON.stringify(nextState));
      
      if (newBadge) {
        setRecentBadge(newBadge);
        // Auto-hide popup after 4 seconds
        setTimeout(() => setRecentBadge(null), 4000);
      }
      
      return nextState;
    });
  }, []);

  const clearRecentBadge = useCallback(() => {
    setRecentBadge(null);
  }, []);

  const resetProgress = useCallback(() => {
    const newState = { score: 0, completedItems: [], badges: [] };
    setState(newState);
    localStorage.setItem('votewise_progress', JSON.stringify(newState));
  }, []);

  return (
    <ProgressContext.Provider value={{ ...state, markCompleted, resetProgress, recentBadge, clearRecentBadge }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
