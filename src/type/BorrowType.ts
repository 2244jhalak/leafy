export interface Borrow {
  _id: string;
  book: { title: string; isbn: string }; // populated book
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowSummary {
  book: { title: string; isbn: string };
  totalQuantity: number;
}

export interface BorrowRequest {
  book: string;
  quantity: number;
}