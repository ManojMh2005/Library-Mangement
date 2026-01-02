import { useState } from 'react';
import { BookUp, Check, BookOpen, User } from 'lucide-react';
import { libraryService } from '@/lib/library-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BorrowBookView = () => {
  const [memberId, setMemberId] = useState('');
  const [isbn, setIsbn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableBooks = libraryService.getAvailableBooks();
  const members = libraryService.getAllMembers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!memberId || !isbn) {
      toast({
        title: "Missing Information",
        description: "Please select both a member and a book.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const result = libraryService.borrowBook(isbn, memberId);

    if (result.success) {
      toast({
        title: "Book Borrowed Successfully",
        description: result.message,
      });
      setMemberId('');
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
              <BookUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Borrow Book</CardTitle>
              <CardDescription>Issue a book to a member</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Select Member</Label>
              <Select value={memberId} onValueChange={setMemberId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a member..." />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {member.name} ({member.id})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Select Book</Label>
              <Select value={isbn} onValueChange={setIsbn}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book..." />
                </SelectTrigger>
                <SelectContent>
                  {availableBooks.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No books available
                    </SelectItem>
                  ) : (
                    availableBooks.map((book) => (
                      <SelectItem key={book.isbn} value={book.isbn}>
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          {book.title} by {book.author}
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting || availableBooks.length === 0}>
                <Check className="w-4 h-4 mr-2" />
                Confirm Borrow
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Available Books Quick View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Books ({availableBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {availableBooks.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No books available for borrowing
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {availableBooks.map((book) => (
                <div 
                  key={book.isbn}
                  className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setIsbn(book.isbn)}
                >
                  <p className="font-medium text-foreground">{book.title}</p>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{book.isbn}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowBookView;
