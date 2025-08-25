import { useState } from "react";
import { useGetBooksQuery } from "@/redux/features/api/bookSlice";
import { Link } from "react-router";
import type { Book } from "@/type/BookType";
import { Loader2 } from "lucide-react";

const BookList = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

 const { data, isLoading, isError } = useGetBooksQuery(
  { page, limit },
  { refetchOnMountOrArgChange: true }
);


if (isLoading) return <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>;
if (isError) return <p className="text-center text-red-500">Failed to load books.</p>;


const books: Book[] = Array.isArray(data?.data?.data) ? data.data.data : [];


const totalPages: number = data?.data?.totalPages || 1;


  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {books.map((book: Book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-[420px] w-full px-20 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-1">{book.title}</h2>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
              <p className="text-sm text-gray-600">Genre: {book.genre}</p>
              <p className="text-sm text-gray-600 mb-2">
                Available: {book.available ? "Yes" : "No"}
              </p>

              <div className="flex justify-end">
                <Link
                  to={`/books/${book._id}`}
                  className="mt-auto bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
