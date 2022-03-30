import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	useColorScheme,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import { BlurView } from "expo-blur";
import { makeImagePath } from "../utils";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const Container = styled.ScrollView``;

const View = styled.View`
	flex: 1;
`;

const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const BgImg = styled.Image``;
const Poster = styled.Image`
	width: 100px;
	height: 160px;
	border-radius: 5px;
`;

const Title = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${(props) => props.theme.textColor};
`;

const Overview = styled.Text`
	margin-top: 10px;
	opacity: 0.8;
	color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.View`
	flex-direction: row;
	height: 100%;
	justify-content: center;
	align-items: center;
`;
const Column = styled.View`
	width: 40%;
	margin-left: 15px;
`;
const Votes = styled(Overview)`
	font-size: 12px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const isDark = useColorScheme() === "dark";
	const [loading, setLoading] = useState(true);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const getNowPlaying = async () => {
		const { results } = await (await fetch(nowPlayingUrl)).json();
		setNowPlayingMovies(results);
		setLoading(false);
	};
	useEffect(() => {
		getNowPlaying();
	}, []);

	return loading ? (
		<Loader>
			<ActivityIndicator size="large" />
		</Loader>
	) : (
		<Container>
			<Swiper
				horizontal
				loop
				autoplayTimeout={3.5} // autoplay
				showsButtons={false}
				showsPagination={false}
				containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
			>
				{nowPlayingMovies.map((movie) => (
					<View key={movie.id}>
						<BgImg
							source={{ uri: makeImagePath(movie.backdrop_path) }}
							style={StyleSheet.absoluteFill}
						/>
						<BlurView
							intensity={80}
							style={StyleSheet.absoluteFill}
							tint={isDark ? "dark" : "light"}
						>
							<Wrapper>
								<Poster
									source={{
										uri: makeImagePath(movie.poster_path),
									}}
								/>
								<Column>
									<Title>{movie.original_title}</Title>
									{movie.vote_average > 0 ? (
										<Votes>
											⭐️{movie.vote_average}/10
										</Votes>
									) : null}
									<Overview>
										{movie.overview?.slice(0, 90)}...
									</Overview>
								</Column>
							</Wrapper>
						</BlurView>
					</View>
				))}
			</Swiper>
		</Container>
	);
};

export default Movies;
