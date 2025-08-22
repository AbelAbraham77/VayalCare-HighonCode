
import React from 'react';
import { Home, MessageSquare, Bell, User, BookOpen } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'notifications', label: 'Updates', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg backdrop-blur-sm transition-all duration-300">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 transition-all duration-300 rounded-lg mx-1 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 transition-all duration-300 ${
                isActive 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground'
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
