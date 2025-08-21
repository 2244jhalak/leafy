import { useGetBooksQuery } from "@/redux/features/api/apiSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, CheckCircle2, XCircle, Pencil, Trash2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AllBooksHome = () => {
  const { data, isLoading, isError } = useGetBooksQuery({ limit: 9999 });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 font-medium">
        Failed to load data.
      </p>
    );
  }

  // এখানে মূল বইয়ের array বের করা হলো
  const books = data?.data?.data || [];

  return (
    <Card className="p-4 mt-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => {
            const isAvailable = book.available && book.copies > 0;

            return (
              <TableRow key={book._id}>
                <TableCell>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>

                <TableCell>
                  {isAvailable ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                </TableCell>

                <TableCell className="flex gap-2 justify-center">
                  {/* ✏️ Edit */}
                  <Link to={`/edit-book/${book._id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* 📚 Borrow */}
                  {isAvailable ? (
                    <Link to={`/borrow/${book._id}`}>
                      <Button variant="outline" size="icon" title="Borrow book">
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="icon" disabled title="Not available for borrow">
                      <BookOpen className="w-4 h-4" />
                    </Button>
                  )}

                  {/* 🗑️ Delete */}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      // handle delete logic here
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AllBooksHome;
