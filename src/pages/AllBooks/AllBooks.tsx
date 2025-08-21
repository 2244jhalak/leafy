import { Outlet } from "react-router"
import Navbar from "../Main/Home/Navbar"


const AllBooks = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default AllBooks