export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  image: string;
}

export interface BookApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Book[];
    totalPages?: number;
    currentPage?: number;
    totalBooks?: number;
  };
}

export interface SingleBookApiResponse {
  success: boolean;
  message: string;
  data: Book;
}
