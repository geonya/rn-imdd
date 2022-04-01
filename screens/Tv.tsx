import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv = () => {
	const { isLoading: todayLoading, data: todayData } = useQuery(
		["tv", "today"],
		tvApi.airingToday
	);

	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		["tv", "trending"],
		tvApi.trending
	);
	const { isLoading: topLoading, data: topData } = useQuery(
		["tv", "top"],
		tvApi.topRated
	);
	const loading = todayLoading || trendingLoading || topLoading;
	if (loading) {
		return <Loader />;
	}
	return (
		<ScrollView>
			<FlatList
				data={trendingData.results}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<VMedia
						title={item.original_name}
						poster={item.poster_path || ""}
						vote={item.vote_average}
					/>
				)}
			/>
			<FlatList
				data={todayData.results}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<VMedia
						title={item.original_name}
						poster={item.poster_path || ""}
						vote={item.vote_average}
					/>
				)}
			/>
			<FlatList
				data={topData.results}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<VMedia
						title={item.original_name}
						poster={item.poster_path || ""}
						vote={item.vote_average}
					/>
				)}
			/>
		</ScrollView>
	);
};

export default Tv;
