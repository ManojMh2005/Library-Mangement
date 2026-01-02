import { libraryService } from '@/lib/library-service';

interface StatisticsProps {
  onBack: () => void;
}

const Statistics = ({ onBack }: StatisticsProps) => {
  const stats = libraryService.getStatistics();

  const statItems = [
    { label: 'Total Books', value: stats.totalBooks },
    { label: 'Available Books', value: stats.availableBooks },
    { label: 'Borrowed Books', value: stats.borrowedBooks },
    { label: 'Registered Members', value: stats.registeredMembers },
    { label: 'Overdue Books', value: stats.overdueBooks, highlight: stats.overdueBooks > 0 },
  ];

  return (
    <div className="fade-in">
      <div className="terminal-text-amber text-lg mb-4">
        === LIBRARY STATISTICS ===
      </div>
      
      <div className="space-y-2 mb-6">
        {statItems.map((item) => (
          <div key={item.label} className="flex items-center">
            <span className="terminal-text-dim w-48">{item.label}:</span>
            <span className={item.highlight ? 'terminal-text-red' : 'terminal-text-cyan'}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
      <div className="terminal-text-dim mb-4">{'─'.repeat(60)}</div>
      
      <div className="terminal-text mb-4">
        <span className="terminal-text-dim">Library Utilization:</span>{' '}
        <span className="terminal-text-cyan">
          {stats.totalBooks > 0 
            ? `${Math.round((stats.borrowedBooks / stats.totalBooks) * 100)}%`
            : '0%'
          }
        </span>
      </div>
      
      <button
        onClick={onBack}
        className="terminal-text hover:terminal-text-amber focus:outline-none"
      >
        [Press any key to return to menu...]
      </button>
    </div>
  );
};

export default Statistics;
