import { motion } from "framer-motion";
import { Link } from "react-router";
import Cover from "../../../assets/cover.jpg";
import Book from "../../../assets/marhaba.jpg";

const Banner = () => {
  return (
    <div className="relative w-full h-screen">
      <img src={Cover} alt="Cover" className="w-full h-full object-cover" />

      <div className="container mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-52 gap-10">
          
          {/* Text Area Animation */}
          <motion.div
            className=""
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Discover, Borrow <br /> & Enjoy Your Favorite Books
            </h1>
            <p className="mb-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Browse our curated collection of books, borrow easily, and dive into a world of stories.
            </p>
            <Link to="/books">
              <button className="bg-black dark:bg-white dark:text-black rounded-xl text-white px-6 py-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg">
                Explore More
              </button>
            </Link>
          </motion.div>

          {/* Book Image Animation */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="drop-shadow-2xl"
          >
            <img src={Book} alt="Book" className="w-[200px] md:w-[300px] rounded-lg" />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
