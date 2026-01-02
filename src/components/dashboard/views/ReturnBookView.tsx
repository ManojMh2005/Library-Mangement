import { useState } from 'react';
import { BookDown, Check, AlertTriangle } from 'lucide-react';
import { libraryService } from '@/lib/library-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ReturnBookView = () => {
  const [isbn, setIsbn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const borrowedBooks = libraryService.getBorrowedBooks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isbn) {
      toast({
        title: "Missing Information",
        description: "Please select a book to return.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const result = libraryService.returnBook(isbn);

    if (result.success) {
      toast({
        title: "Book Returned Successfully",
        description: result.message,
      });
      setIsbn('');
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookDown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Return Book</CardTitle>
              <CardDescription>Process a book return</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Select Book to Return</Label>
              <Select value={isbn} onValueChange={setIsbn}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book..." />
                </SelectTrigger>
                <SelectContent>
                  {borrowedBooks.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No borrowed books
                    </SelectItem>
                  ) : (
                    borrowedBooks.map((book) => {
                      const isOverdue = book.dueDate && new Date(book.dueDate) < new Date();
                      return (
                        <SelectItem key={book.isbn} value={book.isbn}>
                          <span className="flex items-center gap-2">
                            {isOverdue && <AlertTriangle className="w-4 h-4 text-destructive" />}
                            {book.title} - {book.borrowedBy}
                          </span>
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting || borrowedBooks.length === 0}>
                <Check className="w-4 h-4 mr-2" />
                Confirm Return
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Borrowed Books Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Currently Borrowed ({borrowedBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {borrowedBooks.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No books are currently borrowed
            </p>
          ) : (
            <div className="space-y-3">
              {borrowedBooks.map((book) => {
                const isOverdue = book.dueDate && new Date(book.dueDate) < new Date();
                return (
                  <div 
                    key={book.isbn}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      isOverdue 
                        ? 'border-destructive/50 bg-destructive/5' 
                        : 'bg-card hover:bg-muted/50'
                    }`}
                    onClick={() => setIsbn(book.isbn)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{book.title}</p>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <span className="text-muted-foreground">Borrowed by:</span>
                          <span className="font-medium">{book.borrowedBy}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {isOverdue ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Due: {book.dueDate}</Badge>
                        )}
                        <p className="text-xs text-muted-foreground font-mono mt-2">{book.isbn}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnBookView;
