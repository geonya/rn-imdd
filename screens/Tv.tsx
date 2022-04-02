import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import { getNextPageParamUtil } from "../utils";

const Tv = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const {
		isLoading: todayLoading,
		data: todayData,
		hasNextPage: hasNextPageToday,
		fetchNextPage: fetchNextPageToday,
	} = useInfiniteQuery(["tv", "today"], tvApi.airingToday, {
		getNextPageParam: getNextPageParamUtil,
	});

	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		["tv", "trending"],
		tvApi.trending
	);
	const {
		isLoading: topLoading,
		data: topData,
		hasNextPage: hasNextPageTop,
		fetchNextPage: fetchNextPageTop,
	} = useInfiniteQuery(["tv", "top"], tvApi.topRated, {
		getNextPageParam: getNextPageParamUtil,
	});
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
				<HList
					title={"Airing Today"}
					data={todayData.pages.map((page) => page.results).flat()}
					hasNextPage={hasNextPageToday}
					fetchNextPage={fetchNextPageToday}
				/>
			) : null}
			{topData ? (
				<HList
					title={"Top Rated TV"}
					data={topData.pages.map((page) => page.results).flat()}
					hasNextPage={hasNextPageTop}
					fetchNextPage={fetchNextPageTop}
				/>
			) : null}
		</ScrollView>
	);
};

export default Tv;
