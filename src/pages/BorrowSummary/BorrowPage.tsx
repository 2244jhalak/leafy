// src/pages/Borrow/BorrowPage.tsx
import { useGetBookByIdQuery, useGetBooksQuery } from "@/redux/features/api/bookSlice";
import { useBorrowBookMutation } from "@/redux/features/api/borrowSlice";
import { useParams, useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../Main/Home/Navbar";
import Swal from "sweetalert2";

const BorrowPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const [borrowBook] = useBorrowBookMutation();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const { refetch: refetchBooks } = useGetBooksQuery({ limit: 9999 });

  if (!showContent || isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      </>
    );
  }

  if (isError || !data?.data) {
    return (
      <>
        <Navbar />
        <p className="text-center text-red-600 font-medium mt-10">
          Failed to load book data.
        </p>
      </>
    );
  }

  const book = data.data;
  const isAvailable = book.available && book.copies > 0; // ✅ availability check

  const handleBorrow = async () => {
    if (quantity < 1 || quantity > book.copies) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `Quantity must be between 1 and ${book.copies}`,
      });
      return;
    }

    try {
      setLoading(true);
      await borrowBook({ book: book._id, quantity }).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Borrowed Successfully",
        text: `You borrowed ${quantity} copy/copies of "${book.title}"`,
        timer: 2000,
        showConfirmButton: false,
      });

      refetchBooks();
      navigate("/borrow-summary");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Borrow",
        text: err?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Card className="p-6 max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
        <p className="mb-2"><strong>Author:</strong> {book.author}</p>
        <p className="mb-2"><strong>Genre:</strong> {book.genre}</p>
        <p className="mb-2"><strong>ISBN:</strong> {book.isbn}</p>
        <p className="mb-4"><strong>Available Copies:</strong> {book.copies}</p>

        {!isAvailable ? (
          <div className="text-center text-red-600 font-medium">
            ❌ This book is not available for borrowing
            <div className="mt-4">
              <Button onClick={() => navigate("/books")}>
                Back to All Books
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
            />
            <Button onClick={handleBorrow} disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
              <span className="ml-2">Borrow</span>
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default BorrowPage;
