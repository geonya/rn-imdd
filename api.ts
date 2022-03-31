const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const BASE_URL = "https://api.themoviedb.org/3";

export const trending = () =>
	fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
		res.json()
	);

export const upcoming = () =>
	fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
		res.json()
	);

export const newPlaying = () =>
	fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
		res.json()
	);
