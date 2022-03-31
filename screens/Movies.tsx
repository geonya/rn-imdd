import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesApi } from "../api";

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
` as unknown as typeof FlatList;

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
	const queryClient = useQueryClient();
	const {
		isLoading: nowPlayingLoading,
		data: nowPlayingData,
		isRefetching: nowPlayingIsRefetching,
	} = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
	const {
		isLoading: trendingLoading,
		data: trendingData,
		isRefetching: trendingIsRefetching,
	} = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
	const {
		isLoading: upcomingLoading,
		data: upcomingData,
		isRefetching: upcomingIsRefetching,
	} = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
	const onRefresh = async () => {
		queryClient.refetchQueries(["movies"]);
	};
	const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
	const refreshing =
		nowPlayingIsRefetching || trendingIsRefetching || upcomingIsRefetching;

	return loading ? (
		<Loader>
			<ActivityIndicator size="large" />
		</Loader>
	) : upcomingData ? (
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
						{nowPlayingData?.results.map((movie) => (
							<Slide
								key={movie.id}
								backdropPath={movie.backdrop_path || ""}
								posterPath={movie.poster_path || ""}
								originalTitle={movie.original_title}
								voteAverage={movie.vote_average}
								overview={movie.overview}
							/>
						))}
					</Swiper>
					<ListContainer>
						<ListTitle>Trending Movies</ListTitle>
						{trendingData ? (
							<TrendingScroll
								horizontal
								data={trendingData.results} // array
								ItemSeparatorComponent={HSeperator}
								keyExtractor={(item) => item.id + ""}
								contentContainerStyle={{
									paddingHorizontal: 20,
								}}
								showsHorizontalScrollIndicator={false}
								renderItem={({ item }) => (
									<VMedia
										title={item.original_title}
										poster={item.poster_path || ""}
										vote={item.vote_average}
									/>
								)}
							/>
						) : null}
					</ListContainer>
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={(item) => item.id + ""}
			ItemSeparatorComponent={VSeperator}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<HMedia
					title={item.original_title}
					poster={item.poster_path || ""}
					release={item.release_date}
					overview={item.overview}
				/>
			)}
		/>
	) : null;
};

export default Movies;
