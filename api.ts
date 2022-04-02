import { QueryFunction } from "react-query";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TV {
	id: number;
	backdrop_path: string | null;
	vote_average: number;
	overview: string;
	first_air_date: number;
	origin_country: string;
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
	poster_path: string | null;
	popularity: number;
}

interface BaseResponse {
	page: number;
	total_pages: number;
	total_results: number;
}

export interface MovieResponse extends BaseResponse {
	results: Movie[];
}
export interface TVResponse extends BaseResponse {
	results: TV[];
}

interface Fetchers<T> {
	[key: string]: QueryFunction<T>;
}

export const moviesApi: Fetchers<MovieResponse> = {
	trending: () =>
		fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	upcoming: () =>
		fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	nowPlaying: () =>
		fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	search: ({ queryKey }) => {
		const [_, query] = queryKey;
		return fetch(
			`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
		).then((res) => res.json());
	},
};

export const tvApi: Fetchers<TVResponse> = {
	trending: () =>
		fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	airingToday: () =>
		fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	topRated: () =>
		fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	search: ({ queryKey }) => {
		const [_, query] = queryKey;
		return fetch(
			`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
		).then((res) => res.json());
	},
};
