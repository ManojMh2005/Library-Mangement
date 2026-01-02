import { useState } from 'react';
import { MenuOption } from '@/lib/library-types';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';

const DashboardLayout = () => {
  const [currentView, setCurrentView] = useState<MenuOption>('statistics');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          currentView={currentView}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <DashboardContent currentView={currentView} onViewChange={setCurrentView} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
