import { useParams } from "react-router";
import { useGetBookByIdQuery } from "@/redux/features/api/apiSlice";
import Navbar from "./Navbar";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id as string);

  const book = data?.data; 

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !book) return <p className="text-center text-red-500">Error loading book.</p>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row gap-6 p-6">
    {/* Image */}
    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
      <img
        src={book.image}
        alt={book.title}
        className="w-64 md:w-full h-96 md:h-96 object-cover rounded-xl shadow-md transform hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="w-full md:w-2/3 flex flex-col justify-center space-y-3">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{book.title}</h1>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">{book.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Author:</span> {book.author}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Genre:</span> {book.genre}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">ISBN:</span> {book.isbn}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Copies:</span> {book.copies}
        </p>
        <p className="text-gray-600 sm:col-span-2">
          <span className="font-semibold text-gray-900">Available:</span>{" "}
          <span
            className={`${
              book.available ? "text-green-600" : "text-red-600"
            } font-bold`}
          >
            {book.available ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </div>
  </div>
</div>



      
    </div>
  );
};

export default BookDetails;
