import { useState } from "react";

const StreamOptions = ({ seasons, onSeasonChange, onEpisodeChange }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    setSelectedEpisode(1); // Reset episode when season changes
    onSeasonChange(season);
  };

  const handleEpisodeChange = (episode) => {
    setSelectedEpisode(episode);
    onEpisodeChange(episode);
  };

  return (
    <div className="flex flex-col gap-4 my-6">
      {/* Season Selection */}
      <div className="flex flex-wrap gap-2">
        <span className="text-gray-400">Season:</span>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: seasons }, (_, i) => i + 1).map((season) => (
            <button
              key={season}
              onClick={() => handleSeasonChange(season)}
              className={`px-3 py-1 rounded-full ${
                selectedSeason === season
                  ? "bg-blue-600"
                  : "bg-[#211f3c] hover:bg-[#2a2849]"
              }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      {/* Episode Selection */}
      <div className="flex flex-wrap gap-2">
        <span className="text-gray-400">Episode:</span>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((episode) => (
            <button
              key={episode}
              onClick={() => handleEpisodeChange(episode)}
              className={`px-3 py-1 rounded-full ${
                selectedEpisode === episode
                  ? "bg-blue-600"
                  : "bg-[#211f3c] hover:bg-[#2a2849]"
              }`}
            >
              {episode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamOptions;
