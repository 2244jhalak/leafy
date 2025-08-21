import { motion } from "framer-motion";
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
            <h1 className="text-3xl md:text-6xl font-bold mb-4">
              Get Your New<br />Book Collections
            </h1>
            <p className="mb-6 text-lg md:text-xl">
              Explore a wide variety of genres and authors. Perfect picks for your every mood.
            </p>
            <button className="bg-black rounded-xl text-white px-4 py-2 hover:bg-gray-800 transition">
              Explore More
            </button>
          </motion.div>

          {/* Book Image Animation */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src={Book} alt="Book" className="w-[200px] md:w-[300px]" />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
