import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Switch } from "@/components/ui/switch"; 
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") return true;
      if (savedTheme === "light") return false;
      
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; 
  };

  const [isDark, setIsDark] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navItems = [
    { name: "All Books", to: "/books" },
    { name: "Add Book", to: "/create-book" },
    { name: "Borrow Summary", to: "/borrow-summary" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-row items-center">
          <Link to='/'><BookOpen className="text-green-600 dark:text-green-400" /></Link>
          <h1 className="text-2xl mb-1 font-semibold text-green-600 dark:text-green-400"><Link to='/'>Leafy</Link></h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium hover:text-green-600 ${
                location.pathname === item.to ? "text-green-600" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <Switch
            checked={isDark}
            onCheckedChange={() => setIsDark(!isDark)}
            className="ml-4"
            aria-label="Toggle Dark Mode"
          />
        </nav>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setIsDark(!isDark)} aria-label="Toggle Dark Mode">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium hover:text-green-600 ${
                location.pathname === item.to ? "text-green-600" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
