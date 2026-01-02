import { BookOpen, Users, BookUp, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { libraryService } from '@/lib/library-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MenuOption } from '@/lib/library-types';

interface StatisticsViewProps {
  onViewChange: (view: MenuOption) => void;
}

const StatisticsView = ({ onViewChange }: StatisticsViewProps) => {
  const stats = libraryService.getStatistics();
  const recentBooks = libraryService.getAllBooks().slice(0, 5);
  const borrowedBooks = libraryService.getBorrowedBooks();
  
  const utilizationRate = stats.totalBooks > 0 
    ? Math.round((stats.borrowedBooks / stats.totalBooks) * 100) 
    : 0;

  const statCards = [
    { 
      label: 'Total Books', 
      value: stats.totalBooks, 
      icon: BookOpen, 
      color: 'bg-primary/10 text-primary',
      trend: '+12%'
    },
    { 
      label: 'Available Books', 
      value: stats.availableBooks, 
      icon: BookOpen, 
      color: 'bg-success/10 text-success',
      trend: null
    },
    { 
      label: 'Borrowed Books', 
      value: stats.borrowedBooks, 
      icon: BookUp, 
      color: 'bg-accent/10 text-accent',
      trend: null
    },
    { 
      label: 'Registered Members', 
      value: stats.registeredMembers, 
      icon: Users, 
      color: 'bg-warning/10 text-warning',
      trend: '+3'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {stat.trend && (
                    <span className="text-xs font-medium text-success flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overdue Alert */}
      {stats.overdueBooks > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Overdue Books Alert</p>
              <p className="text-sm text-muted-foreground">
                {stats.overdueBooks} book(s) are past their due date
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => onViewChange('return-book')}>
              View Details
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Library Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Library Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Books in circulation</span>
                <span className="font-semibold">{utilizationRate}%</span>
              </div>
              <Progress value={utilizationRate} className="h-3" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{stats.availableBooks}</p>
                  <p className="text-xs text-muted-foreground">On shelves</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{stats.borrowedBooks}</p>
                  <p className="text-xs text-muted-foreground">Checked out</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currently Borrowed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Currently Borrowed</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onViewChange('view-books')}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {borrowedBooks.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No books currently borrowed
              </p>
            ) : (
              <div className="space-y-3">
                {borrowedBooks.slice(0, 4).map((book) => {
                  const isOverdue = book.dueDate && new Date(book.dueDate) < new Date();
                  return (
                    <div 
                      key={book.isbn} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">{book.title}</p>
                        <p className="text-xs text-muted-foreground">by {book.author}</p>
                      </div>
                      <div className="text-right ml-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          isOverdue 
                            ? 'bg-destructive/10 text-destructive' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {isOverdue ? 'Overdue' : `Due: ${book.dueDate}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onViewChange('add-book')}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Add Book</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onViewChange('register-member')}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm">New Member</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onViewChange('borrow-book')}
            >
              <BookUp className="w-5 h-5" />
              <span className="text-sm">Borrow</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onViewChange('return-book')}
            >
              <BookUp className="w-5 h-5 rotate-180" />
              <span className="text-sm">Return</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsView;
