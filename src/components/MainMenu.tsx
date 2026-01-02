import { MenuOption } from '@/lib/library-types';

interface MainMenuProps {
  onSelect: (option: MenuOption) => void;
}

const MainMenu = ({ onSelect }: MainMenuProps) => {
  const menuItems: { key: string; label: string; option: MenuOption }[] = [
    { key: '1', label: 'Add New Book', option: 'add-book' },
    { key: '2', label: 'View All Books', option: 'view-books' },
    { key: '3', label: 'Search Books', option: 'search-books' },
    { key: '4', label: 'Register Member', option: 'register-member' },
    { key: '5', label: 'Borrow Book', option: 'borrow-book' },
    { key: '6', label: 'Return Book', option: 'return-book' },
    { key: '7', label: 'View Library Statistics', option: 'statistics' },
    { key: '8', label: 'Exit', option: 'exit' },
  ];

  return (
    <div className="fade-in">
      <div className="terminal-text-amber text-lg mb-4">
        === LIBRARY MANAGEMENT SYSTEM ===
      </div>
      
      <div className="space-y-2 mb-6">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.option)}
            className="menu-item block w-full text-left terminal-text hover:terminal-text-amber focus:outline-none"
          >
            {item.key}. {item.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center terminal-text">
        <span>Enter your choice:</span>
        <span className="ml-2 cursor-blink">▌</span>
      </div>
    </div>
  );
};

export default MainMenu;
