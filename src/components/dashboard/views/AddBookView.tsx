import { useState } from 'react';
import { BookPlus, Check } from 'lucide-react';
import { libraryService } from '@/lib/library-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface AddBookViewProps {
  onSuccess: () => void;
}

const AddBookView = ({ onSuccess }: AddBookViewProps) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    year: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const yearNum = parseInt(formData.year, 10);
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
      toast({
        title: "Invalid Year",
        description: "Please enter a valid publication year.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const result = libraryService.addBook({
      isbn: formData.isbn.trim(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      year: yearNum,
    });

    if (result.success) {
      toast({
        title: "Book Added Successfully",
        description: `"${formData.title}" has been added to the library.`,
      });
      setFormData({ isbn: '', title: '', author: '', year: '' });
      onSuccess();
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
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Add New Book</CardTitle>
            <CardDescription>Enter the book details below</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                placeholder="978-0-13-468599-1"
                value={formData.isbn}
                onChange={(e) => handleChange('isbn', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Publication Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input
              id="title"
              placeholder="Enter the book title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Enter the author's name"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              <Check className="w-4 h-4 mr-2" />
              Add Book
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setFormData({ isbn: '', title: '', author: '', year: '' })}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBookView;
