import { Link } from "react-router";
import { BookOpen, Facebook, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 text-gray-400 mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-green-500" />
            <span className="text-xl font-semibold text-green-500">
              Leafy
            </span>
          </div>
          <p className="text-sm">
            A modern library system to manage, borrow, and explore books with ease.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-md font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/books" className="hover:text-green-500 transition">All Books</Link></li>
            <li><Link to="/create-book" className="hover:text-green-500 transition">Add Book</Link></li>
            <li><Link to="/borrow-summary" className="hover:text-green-500 transition">Borrow Summary</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-md font-semibold text-white mb-3">Connect with us</h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-green-500 transition"><Facebook size={22} /></a>
            <a href="#" className="hover:text-green-500 transition"><Twitter size={22} /></a>
            <a href="#" className="hover:text-green-500 transition"><Github size={22} /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Leafy. All rights reserved.
      </div>
    </footer>
  );
}
