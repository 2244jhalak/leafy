import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useUpdateBookMutation } from "@/redux/features/api/apiSlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import type { Book } from "@/type/BookType";

interface Props {
  book: Book;
}

const EditBookForm = ({ book }: Props) => {
  const [formData, setFormData] = useState<Book>({ ...book });
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "copies") {
      const intVal = parseInt(value);
      if (!isNaN(intVal) && intVal >= 0) {
        setFormData((prev) => ({ ...prev, copies: intVal }));
      } else if (value === "") {
        setFormData((prev) => ({ ...prev, copies: 0 }));
      }
    } else if (name === "available") {
      setFormData((prev) => ({ ...prev, available: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
  const res = await updateBook({ id: book._id, data: formData }).unwrap();
  console.log("Update response:", res);
  Swal.fire({ icon: "success", title: "Book updated successfully!", timer: 1500, showConfirmButton: false });
  navigate("/books");
} catch (error: any) {
  console.error("Update error:", error);
  Swal.fire({ icon: "error", title: "Update failed", text: error?.data?.message || "Please try again later." });
}

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8 space-y-6 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-center text-green-700">
        ✏️ Edit Book
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["title", "author", "genre", "isbn", "image"].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-medium capitalize text-gray-700">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Copies
          </label>
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min={0}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of copies"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Available
          </label>
          <select
            name="available"
            value={formData.available ? "true" : "false"}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white font-semibold py-2.5 rounded-lg"
        >
          💾 Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
