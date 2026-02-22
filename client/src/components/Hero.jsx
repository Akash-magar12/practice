import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-black text-gray-900 mb-6">
        Share your story with{" "}
        <span className="text-indigo-600">the world.</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        Create beautiful posts, upload images, and connect with creators
        everywhere.
      </p>
      <Link
        to="/signup"
        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl"
      >
        Get Started for Free
      </Link>
    </div>
  );
};
export default Hero;
