const Search = ({ searchTerm, setSearchTerm, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <div>
          <img src="search.svg" alt="search" />
          <input
            type="text"
            placeholder="Search Through Thousands of Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
