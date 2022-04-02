import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Share, Platform } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import { BLACK_COLOR } from "../colors";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { SCREEN_HEIGHT } from "../styled";
import { makeImagePath } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import * as webBrowser from "expo-web-browser";

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
	height: ${SCREEN_HEIGHT / 4}px;
	justify-content: flex-end;
	padding: 0 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
	flex-direction: row;
	width: 80%;
`;
const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 25px;
	align-self: flex-end;
	margin-left: 15px;
	font-weight: 500;
`;
const Overview = styled.Text`
	color: ${(props) => props.theme.textColor};
	margin: 20px 0;
`;
const Data = styled.View`
	padding: 0px 20px;
`;
const VideoBtn = styled.TouchableOpacity`
	flex-direction: row;
`;
const BtnText = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-weight: 600;
	margin-bottom: 10px;
	line-height: 24px;
	margin-left: 10px;
`;

type RootStackParamList = {
	Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
	navigation: { setOptions },
	route: { params },
}) => {
	const isMovie = "original_title" in params;

	const { isLoading, data } = useQuery(
		[isMovie ? "movies" : "tv", params.id],
		//@ts-ignore
		isMovie ? moviesApi.detail : tvApi.detail
	);
	const shareMedia = async () => {
		const isAndroid = Platform.OS === "android";
		const homepage = isMovie
			? `https://imdb.com/title/${data.imdb_id}`
			: data.homepage;
		if (isAndroid) {
			await Share.share({
				message: `${params.overview}\n Check it out: ${homepage}`,
				title:
					"original_title" in params
						? params.original_title
						: params.original_name,
			});
		} else {
			await Share.share({
				url: homepage,
				title:
					"original_title" in params
						? params.original_title
						: params.original_name,
			});
		}
	};
	const ShareBtn = () => (
		<TouchableOpacity onPress={shareMedia}>
			<Ionicons name="share-outline" color="white" size={24} />
		</TouchableOpacity>
	);

	useEffect(() => {
		setOptions({
			title: "original_title" in params ? "Movie" : "TV Show",
		});
	}, []);
	useEffect(() => {
		if (data) {
			setOptions({
				headerRight: () => <ShareBtn />,
			});
		}
	}, [data]);
	const openYTLink = async (videoId: string) => {
		const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
		// await Linking.openURL(baseUrl);
		await webBrowser.openBrowserAsync(baseUrl);
		``;
	};
	return (
		<Container>
			<Header>
				<Background
					style={StyleSheet.absoluteFill}
					source={{ uri: makeImagePath(params.backdrop_path || "") }}
				/>
				<LinearGradient
					colors={["transparent", BLACK_COLOR]}
					style={StyleSheet.absoluteFill}
				/>
				<Column>
					<Poster path={params.poster_path || ""} />
					<Title>
						{"original_title" in params
							? params.original_title
							: params.original_name}
					</Title>
				</Column>
			</Header>
			<Data>
				<Overview>{params.overview}</Overview>
				{isLoading ? <Loader /> : null}
				{data?.videos?.results?.map((video) => (
					<VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
						<Ionicons name="logo-youtube" color="white" size={24} />
						<BtnText>{video.name}</BtnText>
					</VideoBtn>
				))}
			</Data>
		</Container>
	);
};

export default Detail;
