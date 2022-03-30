import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
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

const Title = styled.Text``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
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
				loop
				autoplayTimeout={3.5} // autoplay
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
							intensity={10}
							style={StyleSheet.absoluteFill}
						>
							<Title>{movie.original_title}</Title>
						</BlurView>
					</View>
				))}
			</Swiper>
		</Container>
	);
};

export default Movies;
