import { useState } from 'react';
import { libraryService } from '@/lib/library-service';

interface BorrowBookProps {
  onBack: () => void;
}

const BorrowBook = ({ onBack }: BorrowBookProps) => {
  const [step, setStep] = useState(0);
  const [memberId, setMemberId] = useState('');
  const [isbn, setIsbn] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const availableBooks = libraryService.getAvailableBooks();
  const members = libraryService.getAllMembers();

  const handleSubmit = () => {
    if (!memberId.trim() || !isbn.trim()) {
      setResult({ success: false, message: 'Both Member ID and ISBN are required.' });
      return;
    }

    const response = libraryService.borrowBook(isbn.trim(), memberId.trim().toUpperCase());
    setResult(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextStep: () => void) => {
    if (e.key === 'Enter') {
      nextStep();
    }
  };

  if (result) {
    return (
      <div className="fade-in">
        <div className="terminal-text-amber text-lg mb-4">
          === BORROW BOOK ===
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
        === BORROW BOOK ===
      </div>
      
      <div className="terminal-text-dim mb-2">Available Books:</div>
      <div className="terminal-text-dim mb-4">{'─'.repeat(60)}</div>
      
      {availableBooks.length === 0 ? (
        <div className="terminal-text-amber mb-4">No books available for borrowing.</div>
      ) : (
        <div className="space-y-1 mb-4">
          {availableBooks.map((book) => (
            <div key={book.isbn} className="terminal-text text-sm">
              <span className="terminal-text-cyan">{book.isbn}</span> - {book.title} by {book.author}
            </div>
          ))}
        </div>
      )}
      
      <div className="terminal-text-dim mb-2 mt-4">Registered Members:</div>
      <div className="terminal-text-dim mb-4">{'─'.repeat(60)}</div>
      
      <div className="space-y-1 mb-6">
        {members.map((member) => (
          <div key={member.id} className="terminal-text text-sm">
            <span className="terminal-text-cyan">{member.id}</span> - {member.name}
          </div>
        ))}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <span className="terminal-text-dim mr-2">Enter Member ID:</span>
          {step === 0 ? (
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => setStep(1))}
              className="terminal-input flex-1"
              placeholder="MEM001"
              autoFocus
            />
          ) : (
            <span className="terminal-text">{memberId}</span>
          )}
        </div>
        
        {step >= 1 && (
          <div className="flex items-center">
            <span className="terminal-text-dim mr-2">Enter Book ISBN:</span>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              className="terminal-input flex-1"
              autoFocus
            />
          </div>
        )}
      </div>
      
      {step === 1 && isbn && (
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

export default BorrowBook;
