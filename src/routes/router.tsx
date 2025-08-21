
import AllBooks from "@/pages/AllBooks/AllBooks";
import EditBook from "@/pages/EditBook/EditBook";
import AllBooksHome from "@/pages/AllBooks/AllBooksHome/AllBooksHome";
import Home from "@/pages/Main/Home/Home";
import Main from "@/pages/Main/Main";
import {
  createBrowserRouter,
  
} from "react-router";
import BookDetails from "@/pages/Main/Home/BookDetails";

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
    path: "/books/:id",
    element: <BookDetails />,
  }
]);