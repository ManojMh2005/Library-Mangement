// OOP-based Library Management System Types

export interface Book {
  isbn: string;
  title: string;
  author: string;
  year: number;
  borrowedBy: string | null;
  borrowDate: string | null;
  dueDate: string | null;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  borrowedBooks: string[];
}

export interface LibraryData {
  books: Book[];
  members: Member[];
}

export type MenuOption = 
  | 'menu'
  | 'add-book'
  | 'view-books'
  | 'search-books'
  | 'register-member'
  | 'borrow-book'
  | 'return-book'
  | 'statistics'
  | 'exit';
