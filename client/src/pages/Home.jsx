import React from "react";
import Feed from "./Feed";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);
 
  return <div className="min-h-screen bg-gray-50">{isAuthenticated ? <Feed /> : <Hero />}</div>;
};

export default Home;
