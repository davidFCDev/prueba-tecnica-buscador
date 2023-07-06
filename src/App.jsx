import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { movies, getMovies, error } = useMovies();
  const { search, updateSearch } = useSearch();

  const debouncedGetMovies = useCallback(
		debounce(search => {
			getMovies({ search });
		}, 300),
		[getMovies]
	);

  const handleSearch = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = event => {
		const newSearch = event.target.value;
		updateSearch(newSearch);
		debouncedGetMovies(newSearch);
	};

  return (
    <div className="page">
      <header>
        <form onSubmit={handleSearch}>
          <input
            onChange={handleChange}
            placeholder="Avengers, matrix..."
            name="query"
          />
          <button>Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
