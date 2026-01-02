import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Plus, 
  Search, 
  BookUp, 
  BookDown,
  Library,
  ChevronLeft
} from 'lucide-react';
import { MenuOption } from '@/lib/library-types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  currentView: MenuOption;
  onViewChange: (view: MenuOption) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems: { icon: React.ElementType; label: string; value: MenuOption; section: string }[] = [
  { icon: BarChart3, label: 'Dashboard', value: 'statistics', section: 'overview' },
  { icon: BookOpen, label: 'All Books', value: 'view-books', section: 'books' },
  { icon: Plus, label: 'Add Book', value: 'add-book', section: 'books' },
  { icon: Search, label: 'Search Books', value: 'search-books', section: 'books' },
  { icon: Users, label: 'Register Member', value: 'register-member', section: 'members' },
  { icon: BookUp, label: 'Borrow Book', value: 'borrow-book', section: 'transactions' },
  { icon: BookDown, label: 'Return Book', value: 'return-book', section: 'transactions' },
];

const DashboardSidebar = ({ currentView, onViewChange, isOpen, onToggle }: DashboardSidebarProps) => {
  const sections = [
    { key: 'overview', label: 'Overview' },
    { key: 'books', label: 'Books' },
    { key: 'members', label: 'Members' },
    { key: 'transactions', label: 'Transactions' },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Library className="w-5 h-5 text-primary-foreground" />
          </div>
          {isOpen && (
            <span className="font-semibold text-sidebar-foreground animate-fade-in">
              LibraryOS
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        {sections.map((section) => {
          const sectionItems = menuItems.filter(item => item.section === section.key);
          if (sectionItems.length === 0) return null;
          
          return (
            <div key={section.key}>
              {isOpen && (
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-3">
                  {section.label}
                </p>
              )}
              <div className="space-y-1">
                {sectionItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.value;
                  
                  return (
                    <button
                      key={item.value}
                      onClick={() => onViewChange(item.value)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                        !isOpen && "justify-center"
                      )}
                      title={!isOpen ? item.label : undefined}
                    >
                      <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                      {isOpen && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn("w-full", !isOpen && "px-0")}
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform duration-200",
            !isOpen && "rotate-180"
          )} />
          {isOpen && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
