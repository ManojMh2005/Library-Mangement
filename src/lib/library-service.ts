import { Book, Member, LibraryData } from './library-types';

const STORAGE_KEY = 'library_management_data';

// Library Service Class - OOP Approach
export class LibraryService {
  private data: LibraryData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): LibraryData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initialize with sample data
    const initialData: LibraryData = {
      books: [
        {
          isbn: '9780134685991',
          title: 'Effective Java',
          author: 'Joshua Bloch',
          year: 2018,
          borrowedBy: null,
          borrowDate: null,
          dueDate: null
        },
        {
          isbn: '9781617294945',
          title: 'Spring in Action',
          author: 'Craig Walls',
          year: 2020,
          borrowedBy: 'MEM001',
          borrowDate: '2025-12-20',
          dueDate: '2026-01-03'
        },
        {
          isbn: '9781492052205',
          title: 'Fluent Python',
          author: 'Luciano Ramalho',
          year: 2021,
          borrowedBy: null,
          borrowDate: null,
          dueDate: null
        }
      ],
      members: [
        {
          id: 'MEM001',
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '555-0101',
          registrationDate: '2025-01-15',
          borrowedBooks: ['9781617294945']
        },
        {
          id: 'MEM002',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          phone: '555-0102',
          registrationDate: '2025-02-20',
          borrowedBooks: []
        },
        {
          id: 'MEM003',
          name: 'Bob Wilson',
          email: 'bob.wilson@email.com',
          phone: '555-0103',
          registrationDate: '2025-03-10',
          borrowedBooks: []
        },
        {
          id: 'MEM004',
          name: 'Alice Brown',
          email: 'alice.brown@email.com',
          phone: '555-0104',
          registrationDate: '2025-04-05',
          borrowedBooks: []
        },
        {
          id: 'MEM005',
          name: 'Charlie Davis',
          email: 'charlie.davis@email.com',
          phone: '555-0105',
          registrationDate: '2025-05-12',
          borrowedBooks: []
        }
      ]
    };
    
    this.saveData(initialData);
    return initialData;
  }

  private saveData(data?: LibraryData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data || this.data));
  }

  // Book Operations
  addBook(book: Omit<Book, 'borrowedBy' | 'borrowDate' | 'dueDate'>): { success: boolean; message: string } {
    const existingBook = this.data.books.find(b => b.isbn === book.isbn);
    if (existingBook) {
      return { success: false, message: `Book with ISBN ${book.isbn} already exists.` };
    }

    const newBook: Book = {
      ...book,
      borrowedBy: null,
      borrowDate: null,
      dueDate: null
    };

    this.data.books.push(newBook);
    this.saveData();
    return { success: true, message: `Book "${book.title}" added successfully.` };
  }

  getAllBooks(): Book[] {
    return [...this.data.books];
  }

  searchBooks(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.data.books.filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.isbn.includes(query)
    );
  }

  getBookByIsbn(isbn: string): Book | undefined {
    return this.data.books.find(b => b.isbn === isbn);
  }

  // Member Operations
  registerMember(member: Omit<Member, 'id' | 'registrationDate' | 'borrowedBooks'>): { success: boolean; message: string; memberId?: string } {
    const existingMember = this.data.members.find(m => m.email === member.email);
    if (existingMember) {
      return { success: false, message: `Member with email ${member.email} already exists.` };
    }

    const nextId = this.data.members.length + 1;
    const memberId = `MEM${nextId.toString().padStart(3, '0')}`;
    
    const newMember: Member = {
      ...member,
      id: memberId,
      registrationDate: new Date().toISOString().split('T')[0],
      borrowedBooks: []
    };

    this.data.members.push(newMember);
    this.saveData();
    return { success: true, message: `Member registered successfully.`, memberId };
  }

  getAllMembers(): Member[] {
    return [...this.data.members];
  }

  getMemberById(id: string): Member | undefined {
    return this.data.members.find(m => m.id === id);
  }

  // Borrowing Operations
  borrowBook(isbn: string, memberId: string): { success: boolean; message: string } {
    const book = this.data.books.find(b => b.isbn === isbn);
    if (!book) {
      return { success: false, message: `Book with ISBN ${isbn} not found.` };
    }

    if (book.borrowedBy) {
      return { success: false, message: `Book "${book.title}" is already borrowed by ${book.borrowedBy}.` };
    }

    const member = this.data.members.find(m => m.id === memberId);
    if (!member) {
      return { success: false, message: `Member with ID ${memberId} not found.` };
    }

    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks loan period

    book.borrowedBy = memberId;
    book.borrowDate = today.toISOString().split('T')[0];
    book.dueDate = dueDate.toISOString().split('T')[0];
    member.borrowedBooks.push(isbn);

    this.saveData();
    return { success: true, message: `Book "${book.title}" borrowed successfully by ${member.name}. Due: ${book.dueDate}` };
  }

  returnBook(isbn: string): { success: boolean; message: string } {
    const book = this.data.books.find(b => b.isbn === isbn);
    if (!book) {
      return { success: false, message: `Book with ISBN ${isbn} not found.` };
    }

    if (!book.borrowedBy) {
      return { success: false, message: `Book "${book.title}" is not currently borrowed.` };
    }

    const member = this.data.members.find(m => m.id === book.borrowedBy);
    if (member) {
      member.borrowedBooks = member.borrowedBooks.filter(b => b !== isbn);
    }

    const wasOverdue = book.dueDate && new Date(book.dueDate) < new Date();
    
    book.borrowedBy = null;
    book.borrowDate = null;
    book.dueDate = null;

    this.saveData();
    
    if (wasOverdue) {
      return { success: true, message: `Book "${book.title}" returned. Note: This book was overdue.` };
    }
    return { success: true, message: `Book "${book.title}" returned successfully.` };
  }

  // Statistics
  getStatistics(): {
    totalBooks: number;
    availableBooks: number;
    borrowedBooks: number;
    registeredMembers: number;
    overdueBooks: number;
  } {
    const today = new Date();
    const overdueBooks = this.data.books.filter(
      book => book.dueDate && new Date(book.dueDate) < today
    ).length;

    return {
      totalBooks: this.data.books.length,
      availableBooks: this.data.books.filter(b => !b.borrowedBy).length,
      borrowedBooks: this.data.books.filter(b => b.borrowedBy).length,
      registeredMembers: this.data.members.length,
      overdueBooks
    };
  }

  getAvailableBooks(): Book[] {
    return this.data.books.filter(b => !b.borrowedBy);
  }

  getBorrowedBooks(): Book[] {
    return this.data.books.filter(b => b.borrowedBy);
  }
}

// Singleton instance
export const libraryService = new LibraryService();
