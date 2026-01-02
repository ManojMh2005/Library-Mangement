import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Book } from '@/lib/library-types';
import { libraryService } from '@/lib/library-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SearchBooksView = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      const found = libraryService.searchBooks(query.trim());
      setResults(found);
      setHasSearched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Search Books</CardTitle>
              <CardDescription>Search by title, author, or ISBN</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">
              Search Results
              <span className="ml-2 text-muted-foreground font-normal">
                ({results?.length || 0} found)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results && results.length > 0 ? (
              <div className="space-y-3">
                {results.map((book) => (
                  <div 
                    key={book.isbn}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded bg-muted flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">
                          ISBN: {book.isbn} · {book.year}
                        </p>
                      </div>
                    </div>
                    {book.borrowedBy ? (
                      <Badge variant="secondary" className="bg-warning/10 text-warning border-0">
                        Borrowed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-success/10 text-success border-0">
                        Available
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No books found matching "{query}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBooksView;
