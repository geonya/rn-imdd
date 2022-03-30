import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=KR`;
const upComingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=KR`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&region=KR`;

const Container = styled.ScrollView``;

const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const [loading, setLoading] = useState(true);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [trendingMovies, setTrendingMovies] = useState([]);
	const getTrending = async () => {
		const { results } = await (await fetch(trendingUrl)).json();
		setTrendingMovies(results);
	};
	const getUpcoming = async () => {
		const { results } = await (await await fetch(upComingUrl)).json();
		setUpcomingMovies(results);
	};
	const getNowPlaying = async () => {
		const { results } = await (await fetch(nowPlayingUrl)).json();
		setNowPlayingMovies(results);
	};
	const getData = async () => {
		await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
		setLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	return loading ? (
		<Loader>
			<ActivityIndicator size="large" />
		</Loader>
	) : (
		<Container>
			<Swiper
				loop
				horizontal
				autoplayTimeout={3.5} // autoplay
				showsButtons={false}
				showsPagination={false}
				containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
			>
				{nowPlayingMovies.map((movie) => (
					<Slide
						key={movie.id}
						backdropPath={movie.backdrop_path}
						posterPath={movie.poster_path}
						originalTitle={movie.original_title}
						voteAverage={movie.vote_average}
						overview={movie.overview}
					/>
				))}
			</Swiper>
			<Swiper
				loop
				horizontal
				autoplayTimeout={3.5} // autoplay
				showsButtons={false}
				showsPagination={false}
				containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
			>
				{trendingMovies.map((movie) => (
					<Slide
						key={movie.id}
						backdropPath={movie.backdrop_path}
						posterPath={movie.poster_path}
						originalTitle={movie.original_title}
						voteAverage={movie.vote_average}
						overview={movie.overview}
					/>
				))}
			</Swiper>
			<Swiper
				loop
				horizontal
				autoplayTimeout={3.5} // autoplay
				showsButtons={false}
				showsPagination={false}
				containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
			>
				{upcomingMovies.map((movie) => (
					<Slide
						key={movie.id}
						backdropPath={movie.backdrop_path}
						posterPath={movie.poster_path}
						originalTitle={movie.original_title}
						voteAverage={movie.vote_average}
						overview={movie.overview}
					/>
				))}
			</Swiper>
		</Container>
	);
};

export default Movies;
