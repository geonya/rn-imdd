import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import {
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme,
	View,
} from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import { makeImagePath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image``;

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

interface SlideProps {
	backdropPath: string;
	posterPath: string;
	originalTitle: string;
	voteAverage: number;
	overview: string;
	totalData: Movie;
}

const Slide: React.FC<SlideProps> = ({
	backdropPath,
	posterPath,
	originalTitle,
	voteAverage,
	overview,
	totalData,
}) => {
	const isDark = useColorScheme() === "dark";
	const navigation = useNavigation();
	const goToDetail = () => {
		//@ts-ignore
		navigation.navigate("Stack", {
			screen: "Detail",
			params: {
				...totalData,
			},
		});
	};
	return (
		<TouchableWithoutFeedback onPress={goToDetail}>
			<View style={{ flex: 1, marginBottom: 10 }}>
				<BgImg
					source={{ uri: makeImagePath(backdropPath) }}
					style={StyleSheet.absoluteFill}
				/>
				<BlurView
					intensity={80}
					style={StyleSheet.absoluteFill}
					tint={isDark ? "dark" : "light"}
				>
					<Wrapper>
						<Poster path={posterPath} />
						<Column>
							<Title>{originalTitle}</Title>
							<Votes vote={voteAverage} />
							<Overview>{overview?.slice(0, 90)}...</Overview>
						</Column>
					</Wrapper>
				</BlurView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Slide;
