import { Menu, Bell, User } from 'lucide-react';
import { MenuOption } from '@/lib/library-types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  currentView: MenuOption;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const viewTitles: Record<MenuOption, string> = {
  'menu': 'Menu',
  'add-book': 'Add New Book',
  'view-books': 'All Books',
  'search-books': 'Search Books',
  'register-member': 'Register Member',
  'borrow-book': 'Borrow Book',
  'return-book': 'Return Book',
  'statistics': 'Dashboard',
  'exit': 'Exit',
};

const DashboardHeader = ({ currentView, onToggleSidebar, sidebarOpen }: DashboardHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {viewTitles[currentView]}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-destructive rounded-full" />
        </Button>
        
        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            LB
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
