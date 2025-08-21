import Banner from "./Banner"
import BookList from "./BookList"



const Home = () => {
  return (
    <>
    
    <Banner />
    <h2 className="text-4xl text-center py-10 font-semibold">All Books</h2>
    <BookList />
    
    </>
  )
}

export default Home