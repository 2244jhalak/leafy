import { useParams } from "react-router";
import { useGetBookByIdQuery } from "@/redux/features/api/apiSlice";
import EditBookForm from "../EditBook/EditBookForm"; 
import Navbar from "../Main/Home/Navbar";
import { Loader2 } from "lucide-react";

const EditBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);

  const bookToEdit = data?.data;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        {isLoading ? (
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        ) : isError ? (
          <p className="text-red-500">Failed to load book</p>
        ) : !bookToEdit ? (
          <p>Book not found</p>
        ) : (
          <EditBookForm book={bookToEdit} />
        )}
      </div>
    </>
  );
};

export default EditBook;
