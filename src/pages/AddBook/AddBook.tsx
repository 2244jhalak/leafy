
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { useAddBookMutation } from "@/redux/features/api/bookSlice";
import Swal from "sweetalert2";
import Navbar from "../Main/Home/Navbar";
import { useNavigate } from "react-router";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddBook = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    copies: 1,
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "copies" ? Number(value) || 1 : value,
    });
  };

  const handleImageUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const result = await res.json();
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, image: result.secure_url }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: result.error?.message || "Could not upload image",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Image Upload Error",
        text: "Something went wrong while uploading image",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      Swal.fire({
        icon: "warning",
        title: "No Image Uploaded",
        text: "Please upload a book cover image before submitting.",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        copies: Number(formData.copies),
        available: formData.copies > 0,
      };
      await addBook(payload).unwrap();
      Swal.fire({
        icon: "success",
        title: "Book Added",
        text: `${formData.title} has been added successfully`,
      });
      navigate("/books");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Book",
        text: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <Card className="p-6 max-w-md w-full shadow-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
            📚 Add New Book
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded text-black dark:text-white dark:bg-gray-700"
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="border p-2 rounded text-black dark:text-white dark:bg-gray-700"
            />
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="border p-2 rounded text-black dark:text-white dark:bg-gray-700"
            >
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
              <option value="FANTASY">FANTASY</option>
            </select>
            <input
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="border p-2 rounded text-black dark:text-white dark:bg-gray-700"
            />
            <input
              type="number"
              placeholder="Copies"
              name="copies"
              value={formData.copies}
              min={0}
              onChange={handleChange}
              className="border p-2 rounded text-black dark:text-white dark:bg-gray-700"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded text-black dark:text-white dark:bg-gray-700"
            />

            {/* Image Upload */}
            {!formData.image ? (
              <label className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                {uploading ? (
                  <Loader2 className="w-6 h-6 mx-auto animate-spin text-gray-500" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Click to upload cover image
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
                />
              </label>
            ) : (
              <div className="relative w-full h-48">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                "Add Book"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddBook;
