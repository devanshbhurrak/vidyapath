import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "")
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-center px-4">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
            Learn. Grow. Achieve.
          </span>{" "}
          with VidyaPath
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-400 mb-10">
          Discover top-rated courses, track your learning, and unlock new
          opportunities.
        </p>

        {/* Search */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto mb-8"
        >
          <Input
            aria-label="Search Courses"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-r-full hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Search
          </Button>
        </form>

        {/* CTA */}
        <Link
          to="/search?query"
          className="inline-block bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 font-medium shadow-lg transition"
        >
          🌟 Explore All Courses
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
