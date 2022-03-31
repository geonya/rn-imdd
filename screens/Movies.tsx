import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=KR`;
const upComingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=KR`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&region=KR`;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView``;
const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 16px;
	font-weight: 600;
	margin-left: 10px;
`;
const Movie = styled.View`
	margin-right: 20px;
	align-items: center;
`;
const TrendingScroll = styled.ScrollView`
	margin-top: 20px;
`;
const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-weight: 600;
	margin-top: 8px;
	margin-bottom: 5px;
`;
const Votes = styled.Text`
	opacity: 0.8;
	color: ${(props) => props.theme.textColor};
`;
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
				containerStyle={{
					width: "100%",
					height: SCREEN_HEIGHT / 4,
					marginBottom: 30,
				}}
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
			<ListTitle>Trending Movies</ListTitle>
			<TrendingScroll
				contentContainerStyle={{ paddingLeft: 30 }}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{trendingMovies.map((movie) => (
					<Movie key={movie.id}>
						<Poster path={movie.poster_path} />
						<Title>
							{movie.original_title.slice(0, 12)}
							{movie.original_title.length > 13 ? "..." : null}
						</Title>
						<Votes>⭐️ {movie.vote_average}/10</Votes>
					</Movie>
				))}
			</TrendingScroll>
		</Container>
	);
};

export default Movies;
