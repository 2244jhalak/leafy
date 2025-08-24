import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 overflow-hidden">
      
      {/* Big 404 Text */}
      <h1 className="text-8xl md:text-9xl font-extrabold text-green-600 animate-bounce z-10">
        404
      </h1>

      {/* Fun message */}
      <p className="mt-4 text-lg md:text-2xl font-semibold text-center z-10">
        Oops! Looks like this page went on an adventure 🚀
      </p>

      {/* Optional illustration */}
      <div className="my-6 z-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="Lost astronaut"
          className="w-36 h-36 md:w-52 md:h-52 animate-pulse"
        />
      </div>

      {/* Back to Home button */}
      <Link to="/">
        <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow-lg transition duration-300 transform hover:scale-105 z-10">
          Go Back Home
        </button>
      </Link>

      {/* Floating stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-green-300 rounded-full opacity-30 animate-ping"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
