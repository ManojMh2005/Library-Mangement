import { useState } from 'react';
import { libraryService } from '@/lib/library-service';

interface ReturnBookProps {
  onBack: () => void;
}

const ReturnBook = ({ onBack }: ReturnBookProps) => {
  const [isbn, setIsbn] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const borrowedBooks = libraryService.getBorrowedBooks();

  const handleSubmit = () => {
    if (!isbn.trim()) {
      setResult({ success: false, message: 'ISBN is required.' });
      return;
    }

    const response = libraryService.returnBook(isbn.trim());
    setResult(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (result) {
    return (
      <div className="fade-in">
        <div className="terminal-text-amber text-lg mb-4">
          === RETURN BOOK ===
        </div>
        
        <div className={result.success ? 'terminal-text mb-4' : 'terminal-text-red mb-4'}>
          {result.message}
        </div>
        
        <button
          onClick={onBack}
          className="terminal-text hover:terminal-text-amber focus:outline-none"
        >
          [Press any key to return to menu...]
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="terminal-text-amber text-lg mb-4">
        === RETURN BOOK ===
      </div>
      
      <div className="terminal-text-dim mb-2">Currently Borrowed Books:</div>
      <div className="terminal-text-dim mb-4">{'─'.repeat(60)}</div>
      
      {borrowedBooks.length === 0 ? (
        <div className="terminal-text mb-4">No books are currently borrowed.</div>
      ) : (
        <div className="space-y-1 mb-6">
          {borrowedBooks.map((book) => {
            const isOverdue = book.dueDate && new Date(book.dueDate) < new Date();
            return (
              <div key={book.isbn} className="terminal-text text-sm">
                <span className="terminal-text-cyan">{book.isbn}</span> - {book.title} |{' '}
                <span className="terminal-text-dim">Borrowed by:</span> {book.borrowedBy} |{' '}
                <span className={isOverdue ? 'terminal-text-red' : 'terminal-text-dim'}>
                  Due: {book.dueDate} {isOverdue && '(OVERDUE)'}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="flex items-center mb-6">
        <span className="terminal-text-dim mr-2">Enter Book ISBN to return:</span>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input flex-1"
          autoFocus
        />
      </div>
      
      {isbn && (
        <button
          onClick={handleSubmit}
          className="terminal-text hover:terminal-text-amber focus:outline-none mr-4"
        >
          [Submit]
        </button>
      )}
      
      <button
        onClick={onBack}
        className="terminal-text-dim hover:terminal-text focus:outline-none"
      >
        [Cancel]
      </button>
    </div>
  );
};

export default ReturnBook;
