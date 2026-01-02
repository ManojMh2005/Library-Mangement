import { MenuOption } from '@/lib/library-types';
import StatisticsView from './views/StatisticsView';
import BooksTableView from './views/BooksTableView';
import AddBookView from './views/AddBookView';
import SearchBooksView from './views/SearchBooksView';
import RegisterMemberView from './views/RegisterMemberView';
import BorrowBookView from './views/BorrowBookView';
import ReturnBookView from './views/ReturnBookView';

interface DashboardContentProps {
  currentView: MenuOption;
  onViewChange: (view: MenuOption) => void;
}

const DashboardContent = ({ currentView, onViewChange }: DashboardContentProps) => {
  const renderView = () => {
    switch (currentView) {
      case 'statistics':
        return <StatisticsView onViewChange={onViewChange} />;
      case 'view-books':
        return <BooksTableView />;
      case 'add-book':
        return <AddBookView onSuccess={() => onViewChange('view-books')} />;
      case 'search-books':
        return <SearchBooksView />;
      case 'register-member':
        return <RegisterMemberView />;
      case 'borrow-book':
        return <BorrowBookView />;
      case 'return-book':
        return <ReturnBookView />;
      default:
        return <StatisticsView onViewChange={onViewChange} />;
    }
  };

  return (
    <div className="animate-fade-in">
      {renderView()}
    </div>
  );
};

export default DashboardContent;
