import { useState } from 'react';
import { MenuOption } from '@/lib/library-types';
import TerminalHeader from './TerminalHeader';
import MainMenu from './MainMenu';
import AddBook from './AddBook';
import ViewBooks from './ViewBooks';
import SearchBooks from './SearchBooks';
import RegisterMember from './RegisterMember';
import BorrowBook from './BorrowBook';
import ReturnBook from './ReturnBook';
import Statistics from './Statistics';
import ExitScreen from './ExitScreen';

const LibraryTerminal = () => {
  const [currentView, setCurrentView] = useState<MenuOption>('menu');

  const handleMenuSelect = (option: MenuOption) => {
    setCurrentView(option);
  };

  const handleBack = () => {
    setCurrentView('menu');
  };

  const renderView = () => {
    switch (currentView) {
      case 'add-book':
        return <AddBook onBack={handleBack} />;
      case 'view-books':
        return <ViewBooks onBack={handleBack} />;
      case 'search-books':
        return <SearchBooks onBack={handleBack} />;
      case 'register-member':
        return <RegisterMember onBack={handleBack} />;
      case 'borrow-book':
        return <BorrowBook onBack={handleBack} />;
      case 'return-book':
        return <ReturnBook onBack={handleBack} />;
      case 'statistics':
        return <Statistics onBack={handleBack} />;
      case 'exit':
        return <ExitScreen onBack={handleBack} />;
      default:
        return <MainMenu onSelect={handleMenuSelect} />;
    }
  };

  return (
    <div className="terminal-container min-h-screen p-4 sm:p-8">
      <div className="scanlines" />
      <div className="crt-effect" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="terminal-border rounded-lg p-4 sm:p-8 bg-background/80 backdrop-blur-sm">
          <TerminalHeader />
          {renderView()}
          
          <div className="mt-8 pt-4 border-t border-border">
            <div className="flex justify-between items-center text-xs terminal-text-dim">
              <span>Library Management System v2.0</span>
              <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryTerminal;
