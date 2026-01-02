import { Book } from '@/lib/library-types';
import { libraryService } from '@/lib/library-service';

interface ViewBooksProps {
  onBack: () => void;
}

const ViewBooks = ({ onBack }: ViewBooksProps) => {
  const books = libraryService.getAllBooks();

  const getStatusDisplay = (book: Book): string => {
    if (book.borrowedBy) {
      return `Borrowed by: ${book.borrowedBy}`;
    }
    return 'Available';
  };

  return (
    <div className="fade-in">
      <div className="terminal-text-amber text-lg mb-4">
        === ALL BOOKS ===
      </div>
      
      <div className="terminal-text mb-2">
        Total books: {books.length}
      </div>
      
      <div className="terminal-text-dim mb-4">
        {'─'.repeat(80)}
      </div>
      
      {books.length === 0 ? (
        <div className="terminal-text-dim mb-4">No books in the library.</div>
      ) : (
        <div className="space-y-2 mb-6">
          {books.map((book, index) => (
            <div key={book.isbn} className="terminal-text">
              <span className="terminal-text-cyan">{index + 1}.</span>{' '}
              <span className="terminal-text-dim">ISBN:</span> {book.isbn} |{' '}
              <span className="terminal-text-dim">Title:</span> {book.title} |{' '}
              <span className="terminal-text-dim">Author:</span> {book.author} |{' '}
              <span className="terminal-text-dim">Year:</span> {book.year} |{' '}
              <span className={book.borrowedBy ? 'terminal-text-amber' : 'terminal-text'}>
                {getStatusDisplay(book)}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={onBack}
        className="terminal-text hover:terminal-text-amber focus:outline-none"
      >
        [Press any key to return to menu...]
      </button>
    </div>
  );
};

export default ViewBooks;
