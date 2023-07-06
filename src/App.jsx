import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function App() {
  const { movies } = useMovies();

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searching");
  };

  const handleChange = (event) => {};

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
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
