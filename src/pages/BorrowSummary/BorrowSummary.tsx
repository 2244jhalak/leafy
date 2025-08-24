import { useGetBorrowSummaryQuery } from "@/redux/features/api/borrowSlice";
import type { BorrowSummary } from "@/type/BorrowType";
import Navbar from "../Main/Home/Navbar";
import { Loader2 } from "lucide-react";

const Borrow = () => {
  const { data: summary, isLoading, isError, error } = useGetBorrowSummaryQuery();

  const books = summary ?? [];

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Borrowed Books Summary</h2>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-red-500">
            Error: {(error as any)?.data?.message || "Something went wrong"}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {books.length === 0 ? (
              <p>No books have been borrowed yet.</p>
            ) : (
              <ul className="space-y-2">
                {books.map((item: BorrowSummary, index: number) => (
                  <li
                    key={index}
                    className="border p-3 rounded shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-lg">{item.book.title}</p>
                      <p className="text-sm text-gray-600">ISBN: {item.book.isbn}</p>
                    </div>
                    <div className="text-green-600 font-medium">
                      Total: {item.totalQuantity}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Borrow;

