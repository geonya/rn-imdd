import React, { useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView`
	margin-top: 10px;
	display: flex;
`;

const SearchBar = styled.TextInput`
	background-color: white;
	border: 1px solid ${(props) => props.theme.accentColor};
	padding: 10px 15px;
	border-radius: 15px;
	width: 90%;
	margin: 10px auto;
	margin-bottom: 50px;
`;

const Search = () => {
	const [query, setQuery] = useState("");
	const {
		isLoading: movieLoading,
		data: moviesData,
		refetch: searchMovies,
	} = useQuery<MovieResponse>(["searchMovies", query], moviesApi.search, {
		enabled: false,
	});
	const {
		isLoading: tvLoading,
		data: tvData,
		refetch: searchTv,
	} = useQuery(["searchTv", query], tvApi.search, { enabled: false });

	const onChangeText = (text: string) => setQuery(text);
	const onSubmit = () => {
		if (query === "") {
			return;
		}
		searchMovies();
		searchTv();
	};
	return (
		<Container>
			<SearchBar
				placeholder="Search for Movie or TV Show"
				placeholderTextColor="grey"
				returnKeyType="search"
				onChangeText={onChangeText}
				onSubmitEditing={onSubmit}
			/>
			{movieLoading || tvLoading ? <Loader /> : null}
			{moviesData ? (
				<HList title="Movies Results" data={moviesData.results} />
			) : null}
			{tvData ? <HList title="TV Results" data={tvData.results} /> : null}
		</Container>
	);
};

export default Search;
