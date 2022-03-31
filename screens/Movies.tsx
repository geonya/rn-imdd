import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	RefreshControl,
	ScrollView,
	View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
const upComingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView``;
const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
const ListContainer = styled.View`
	margin-bottom: 40px;
`;
const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 16px;
	font-weight: 600;
	margin-left: 10px;
`;

const TrendingScroll = styled.FlatList`
	margin-top: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const [refreshing, setRefreshing] = useState(false);
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
	const onRefresh = async () => {
		setRefreshing(true);
		await getData();
		setRefreshing(false);
	};
	return loading ? (
		<Loader>
			<ActivityIndicator size="large" />
		</Loader>
	) : (
		<FlatList
			onRefresh={onRefresh}
			refreshing={refreshing}
			ListHeaderComponent={
				<>
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
					<ListContainer>
						<ListTitle>Trending Movies</ListTitle>
						<TrendingScroll
							data={trendingMovies} // array
							horizontal
							ItemSeparatorComponent={() => (
								<View style={{ width: 20 }} />
							)}
							keyExtractor={(item) => item.id + ""}
							contentContainerStyle={{ paddingHorizontal: 20 }}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => (
								<VMedia
									title={item.original_title}
									poster={item.poster_path}
									vote={item.vote_average}
								/>
							)}
						/>
					</ListContainer>
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingMovies}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<HMedia
					title={item.original_title}
					poster={item.poster_path}
					release={item.release_date}
					overview={item.overview}
				/>
			)}
		/>
	);
};

export default Movies;
