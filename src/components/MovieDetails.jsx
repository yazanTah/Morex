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
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US&include_adult=true`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
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
    <div className={styles.modal}>
      <div className={styles.contentn}>
        <div className={styles.head}>
          <button
            onClick={handleBack}
            className="text-white hover:text-blue-400 mb-8"
          >
            ← Back to Movies
          </button>
          <div className={styles.squidGame2Parent}>
            <b className={styles.generes}>{movie.title}</b>
            <div className={styles.parent}>
              <div className={styles.div}>
                {new Date(movie.release_date).getFullYear()}
              </div>
              <div className={styles.frameChild} />
              <div className={styles.div}>{movie.adult ? "18+" : "PG-13"}</div>
              <div className={styles.frameChild} />
              <div className={styles.div}>{movie.runtime}m</div>
            </div>
          </div>
          {/* Rating section */}
          <div className={styles.buttonParent}>
            <div className={styles.button1}>
              <div className={styles.ratingParent}>
                <div className={styles.rating1}>
                  <img
                    className={styles.starIcon12}
                    alt="star"
                    src="/star.svg"
                  />
                </div>
                <div className={styles.div}>
                  <span className={styles.span1}>
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className={styles.k1}>/10 ({movie.vote_count})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie poster and info section */}
        <div className={styles.img}>
          <img
            className={styles.imageIcon12}
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.info}>
            {/* Genres */}
            <div className={styles.info1}>
              <div className={styles.generesWrapper}>
                <div className={styles.generes}>Genres</div>
              </div>
              <div className={styles.buttonGroup}>
                {movie.genres.map((genre) => (
                  <div key={genre.id} className={styles.button4}>
                    <div className={styles.trailer}>{genre.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className={styles.info2}>
              <div className={styles.generesWrapper}>
                <div className={styles.generes}>Overview</div>
              </div>
              <div className={styles.hundredsOfCashStrapped}>
                {movie.overview}
              </div>
            </div>

            {/* Additional movie details */}
            <div className={styles.head}>
              <div className={styles.generesWrapper}>
                <div className={styles.generes}>Release date</div>
              </div>
              <div className={styles.released}>{movie.release_date}</div>
            </div>

            <div className={styles.head}>
              <div className={styles.generesWrapper}>
                <div className={styles.generes}>Status</div>
              </div>
              <div className={styles.released}>{movie.status}</div>
            </div>

            {/* Budget and Revenue */}
            {movie.budget > 0 && (
              <div className={styles.head}>
                <div className={styles.generesWrapper}>
                  <div className={styles.generes}>Budget</div>
                </div>
                <div className={styles.released}>
                  ${movie.budget.toLocaleString()}
                </div>
              </div>
            )}

            {movie.revenue > 0 && (
              <div className={styles.head}>
                <div className={styles.generesWrapper}>
                  <div className={styles.generes}>Revenue</div>
                </div>
                <div className={styles.released}>
                  ${movie.revenue.toLocaleString()}
                </div>
              </div>
            )}

            {/* Homepage link if available */}
            {movie.homepage && (
              <div className={styles.button7}>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.visitHomepage}
                >
                  Visit Homepage
                  <img
                    className={styles.arrowRightTinyIcon1}
                    alt="arrow"
                    src="/public/visit-homepage-arrow.svg"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
