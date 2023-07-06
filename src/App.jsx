import "./App.css";
import debounce from "just-debounce-it";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { useCallback, useState } from "react";


function App() {
	const [sort, setSort] = useState(false);
	const { search, updateSearch, error } = useSearch();
	const { movies, getMovies, loading } = useMovies({ search, sort });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedGetMovies = useCallback(
		debounce(search => {
			getMovies({ search });
		}, 300),
		[getMovies]
	);

	const handleSubmit = event => {
		event.preventDefault();
		getMovies({ search });
	};

	const handleSort = () => {
		setSort(!sort);
	};

	const handleChange = event => {
		const newSearch = event.target.value;
		updateSearch(newSearch);
		debouncedGetMovies(newSearch);
	};

	return (
		<div className='page'>
			<header>
				<h1>Buscador de películas</h1>
				<form className='form' onSubmit={handleSubmit}>
					<input
						name='query'
						onChange={handleChange}
						value={search}
						placeholder='Avengers, matrix...'
					/>
					<input type='checkbox' onChange={handleSort} checked={sort} />
					<button>Buscar</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>

			<main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
		</div>
	);
}

export default App;
