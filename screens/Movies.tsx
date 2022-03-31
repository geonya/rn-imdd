import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	ScrollView,
	View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery } from "react-query";
import { moviesApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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

const VSeperator = styled.View`
	height: 20px;
`;
const HSeperator = styled.View`
	width: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
		"nowPlaying",
		moviesApi.nowPlaying
	);
	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		"trending",
		moviesApi.trending
	);
	const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
		"upcoming",
		moviesApi.upcoming
	);
	const onRefresh = async () => {};
	const renderVMedia = ({ item }) => (
		<VMedia
			title={item.original_title}
			poster={item.poster_path}
			vote={item.vote_average}
		/>
	);
	const renderHMedia = ({ item }) => (
		<HMedia
			title={item.original_title}
			poster={item.poster_path}
			release={item.release_date}
			overview={item.overview}
		/>
	);
	const movieKeyExtractor = (item) => item.id + "";
	const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
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
						autoplay={true}
						autoplayTimeout={3}
						showsButtons={false}
						showsPagination={false}
						containerStyle={{
							width: "100%",
							height: SCREEN_HEIGHT / 4,
							marginBottom: 30,
						}}
					>
						{nowPlayingData.results.map((movie) => (
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
							horizontal
							data={trendingData.results} // array
							ItemSeparatorComponent={HSeperator}
							keyExtractor={movieKeyExtractor}
							contentContainerStyle={{ paddingHorizontal: 20 }}
							showsHorizontalScrollIndicator={false}
							renderItem={renderVMedia}
						/>
					</ListContainer>
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={movieKeyExtractor}
			ItemSeparatorComponent={VSeperator}
			showsVerticalScrollIndicator={false}
			renderItem={renderHMedia}
		/>
	);
};

export default Movies;
