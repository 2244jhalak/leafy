import { Outlet } from "react-router"
import Navbar from "./Home/Navbar"
import Footer from "./Home/Footer"


const Main = () => {
  return (
    <div>
      
      <Navbar />
      <Outlet />
      
      <Footer />
    </div>
  )
}

export default Main