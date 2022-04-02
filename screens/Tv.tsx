import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
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

	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(["tv"]);
		setRefreshing(false);
	};
	if (loading) {
		return <Loader />;
	}
	return (
		<ScrollView
			contentContainerStyle={{ paddingVertical: 30 }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{trendingData ? (
				<HList title={"Trending TV"} data={trendingData.results} />
			) : null}
			{todayData ? (
				<HList title={"Airing Today"} data={todayData.results} />
			) : null}
			{topData ? <HList title={"Top Rated TV"} data={topData.results} /> : null}
		</ScrollView>
	);
};

export default Tv;
