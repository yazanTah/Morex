import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.TMDB_API_KEY
          }&language=en-US&include_adult=true`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="loader"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-white">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#463f8b] bg-gradient-to-b from-[#210f3f] to-[#18032c]">
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="text-gray-300 hover:text-purple-600 mb-8 flex items-center gap-2 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Movies
        </button>

        {/* Main Content */}
        <div
          className="bg-[#1E293B]/50 rounded-xl p-8 backdrop-blur-sm shadow-2xl 
                      border border-[#334155]/50 hover:border-[#475569]/50 transition-all
                      relative overflow-hidden"
        >
          {/* Glow Effects */}
          <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
          <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-full translate-y-1/2"></div>

          {/* Movie Title & Meta */}
          <div className="relative z-10 mb-8">
            <h1
              className="text-4xl font-bold text-white mb-4 
                         bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
            >
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>{movie.runtime}min</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Poster & Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="md:col-span-1">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              />
            </div>

            <div className="md:col-span-2 space-y-6">
              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-[#4b2f92] rounded-full text-sm text-gray-300 hover:bg-[#8073dec0] transition-colors"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Overview
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Status", value: movie.status },
                  {
                    label: "Release Date",
                    value: new Date(movie.release_date).toLocaleDateString(),
                  },
                  {
                    label: "Budget",
                    value:
                      movie.budget > 0
                        ? `$${movie.budget.toLocaleString()}`
                        : "N/A",
                  },
                  {
                    label: "Revenue",
                    value:
                      movie.revenue > 0
                        ? `$${movie.revenue.toLocaleString()}`
                        : "N/A",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <p className="text-gray-200 font-medium">{value}</p>
                  </div>
                ))}
              </div>

              {/* Homepage Link */}
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 
                         bg-gradient-to-r from-[#7d6ab1] to-[#AB8BFF] 
                         hover:from-purple-600 hover:to-gray  -700
                         rounded-lg text-white transition-all duration-300 shadow-lg
                         hover:shadow-purple-500/25"
                >
                  Visit Homepage
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
