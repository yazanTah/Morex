import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import MovieDetails from "./components/MovieDetails";
import Pagination from "./components/Pagination";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMovies = async (query = "", page = 1) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&page=${page}&include_adult=false`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&include_adult=false`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovieList(data.results || []);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    fetchMovies(searchTerm, 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMovies(debounceSearchTerm, newPage);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm, currentPage);
  }, [currentPage, debounceSearchTerm]);

  return (
    <Router>
      <main className="min-h-screen bg-slate-900 overflow-x-hidden pattern">
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/"
            element={
              <div className="wrapper">
                <header>
                  <img src="./hero.png" alt="Hero Banner" />
                  <h1>
                    Find <span className="text-gradient">Movies</span>{" "}
                    You&apos;ll Enjoy Without the Hassle
                  </h1>
                  <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSubmit={handleSearch}
                  />
                </header>

                <section className="all-movies">
                  <h2 className="mt-[40px]">Popular Movies</h2>
                  {isLoading ? (
                    <Spinner />
                  ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                  ) : (
                    <>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {movieList.map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </ul>
                      {movieList.length > 0 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      )}
                    </>
                  )}
                </section>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
