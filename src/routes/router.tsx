
import AllBooks from "@/pages/AllBooks/AllBooks";
import EditBook from "@/pages/EditBook/EditBook";
import AllBooksHome from "@/pages/AllBooks/AllBooksHome/AllBooksHome";
import Home from "@/pages/Main/Home/Home";
import Main from "@/pages/Main/Main";
import {
  createBrowserRouter,
  
} from "react-router";
import BookDetails from "@/pages/Main/Home/BookDetails";
import Borrow from "@/pages/BorrowSummary/BorrowSummary";
import BorrowPage from "@/pages/BorrowSummary/BorrowPage";
import AddBook from "@/pages/AddBook/AddBook";
import NotFound from "@/pages/NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/books",
    element: <AllBooks />,
    children: [
      {
        path: "/books",
        element: <AllBooksHome />,
      },
    ],
  },
  {
    path: "/edit-book/:id", 
    element: <EditBook />,
  },
  {
    path: "/create-book", 
    element: <AddBook />,
  },
  {
    path: "/books/:id",
    element: <BookDetails />,
  },
  {
    path: "/borrow-summary",
    element: <Borrow />,
  },
  {
    path: "/borrow/:id",
    element: <BorrowPage />,
  },
  {
  path: "*",
  element: <NotFound /> 
  }

]);