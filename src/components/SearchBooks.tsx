import { useState } from 'react';
import { Book } from '@/lib/library-types';
import { libraryService } from '@/lib/library-service';

interface SearchBooksProps {
  onBack: () => void;
}

const SearchBooks = ({ onBack }: SearchBooksProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[] | null>(null);

  const handleSearch = () => {
    if (query.trim()) {
      const found = libraryService.searchBooks(query.trim());
      setResults(found);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusDisplay = (book: Book): string => {
    if (book.borrowedBy) {
      return `Borrowed by: ${book.borrowedBy}`;
    }
    return 'Available';
  };

  return (
    <div className="fade-in">
      <div className="terminal-text-amber text-lg mb-4">
        === SEARCH BOOKS ===
      </div>
      
      {results === null ? (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <span className="terminal-text-dim mr-2">Enter search query (title/author/ISBN):</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input flex-1"
              autoFocus
            />
          </div>
          
          <button
            onClick={handleSearch}
            className="terminal-text hover:terminal-text-amber focus:outline-none mr-4"
          >
            [Search]
          </button>
          
          <button
            onClick={onBack}
            className="terminal-text-dim hover:terminal-text focus:outline-none"
          >
            [Cancel]
          </button>
        </div>
      ) : (
        <div>
          <div className="terminal-text-dim mb-2">
            Search results for: "{query}"
          </div>
          
          <div className="terminal-text mb-2">
            Found: {results.length} book(s)
          </div>
          
          <div className="terminal-text-dim mb-4">
            {'─'.repeat(80)}
          </div>
          
          {results.length === 0 ? (
            <div className="terminal-text-dim mb-4">No books found matching your query.</div>
          ) : (
            <div className="space-y-2 mb-6">
              {results.map((book, index) => (
                <div key={book.isbn} className="terminal-text">
                  <span className="terminal-text-cyan">{index + 1}.</span>{' '}
                  <span className="terminal-text-dim">ISBN:</span> {book.isbn} |{' '}
                  <span className="terminal-text-dim">Title:</span> {book.title} |{' '}
                  <span className="terminal-text-dim">Author:</span> {book.author} |{' '}
                  <span className={book.borrowedBy ? 'terminal-text-amber' : 'terminal-text'}>
                    {getStatusDisplay(book)}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={() => setResults(null)}
            className="terminal-text hover:terminal-text-amber focus:outline-none mr-4"
          >
            [New Search]
          </button>
          
          <button
            onClick={onBack}
            className="terminal-text-dim hover:terminal-text focus:outline-none"
          >
            [Back to Menu]
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
