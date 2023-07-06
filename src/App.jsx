import { useState } from "react";
import "./App.css";
import responseMovies from "./mocks/with-results.json";
import { Movies } from "./components/Movies";

function App() {
  const movies = responseMovies.Search;
  const [query, setQuery] = useState([]);

  const mappedMovies = movies.map((movie) => ({
    id: movie.imdbID,
    year: movie.Year,
    title: movie.Title,
    poster: movie.Poster,
  }));


  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searching");
  };

  return (
    <div className="page">
      <header>
        <form onSubmit={handleSearch}>
          <input name="query" />
          <button>Search</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
