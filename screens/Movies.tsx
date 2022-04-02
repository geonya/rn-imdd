import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 16px;
	font-weight: 600;
	margin-left: 10px;
`;

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
`;

const VSeperator = styled.View`
	height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
		["movies", "nowPlaying"],
		moviesApi.nowPlaying
	);
	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		["movies", "trending"],
		moviesApi.trending
	);
	const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
		["movies", "upcoming"],
		moviesApi.upcoming
	);
	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(["movies"]);
		setRefreshing(false);
	};
	const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
	return loading ? (
		<Loader />
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
								totalData={movie}
							/>
						))}
					</Swiper>
					{trendingData ? (
						<HList title="Trending Movies" data={trendingData.results} />
					) : null}
					<ComingSoonTitle>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={(item) => item.id + ""}
			ItemSeparatorComponent={VSeperator}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<HMedia
					originalTitle={item.original_title}
					posterPath={item.poster_path || ""}
					releaseDate={item.release_date}
					overview={item.overview}
					totalData={item}
				/>
			)}
		/>
	) : null;
};

export default Movies;
