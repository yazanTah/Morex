import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
          }&language=en-US&include_adult=true&include_video=true`,
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
    window.history.back(); // Use browser's back navigation
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
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white hover:text-blue-400 mb-8"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Movies
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-400 text-lg mb-6">{movie.tagline}</p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-gray-400 mb-1">Rating</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold rating">
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <span>•</span>
                  <img src="/public/star.svg" alt="star icon" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Runtime</h3>
                <p className="text-2xl font-semibold">{movie.runtime}min</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Content Rating</h3>
                <div
                  className={`text-lg font-semibold ${
                    movie.adult ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {movie.adult ? "Adults Only (18+)" : "General Audience"}
                </div>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Release Date</h3>
                <p className="text-2xl font-semibold">{movie.release_date}</p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Status</h3>
                <p className="text-2xl font-semibold">{movie.status}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-bold mb-4 text-3xl">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-1 rounded-full bg-[#211f3c] text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
