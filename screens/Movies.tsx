import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
	flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const getNowPlaying = () => {
		fetch(nowPlayingUrl);
	};
	return (
		<Container>
			<Swiper
				loop
				timeout={3.5} // autoplay
				controlsEnabled={false}
				containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
			>
				<View style={{ backgroundColor: "red" }}></View>
				<View style={{ backgroundColor: "blue" }}></View>
				<View style={{ backgroundColor: "red" }}></View>
				<View style={{ backgroundColor: "blue" }}></View>
			</Swiper>
		</Container>
	);
};

export default Movies;
