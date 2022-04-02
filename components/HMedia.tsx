import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";

const Container = styled.View`
	padding: 0px 30px;
	flex-direction: row;
`;

const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-weight: 600;
	margin-top: 8px;
	margin-bottom: 5px;
`;

const HColumn = styled.View`
	margin-left: 15px;
	width: 80%;
`;

const Overview = styled.Text`
	color: ${(props) => props.theme.textColor};
	width: 80%;
`;

const Release = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 12px;
	margin-bottom: 5px;
`;

interface HMediaProps {
	originalTitle: string;
	posterPath: string;
	releaseDate: string;
	overview: string;
	totalData: Movie | TV;
}

const HMedia: React.FC<HMediaProps> = ({
	originalTitle,
	posterPath,
	releaseDate,
	overview,
	totalData,
}) => {
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
		<TouchableOpacity onPress={goToDetail}>
			<Container>
				<Poster path={posterPath} />
				<HColumn>
					<Title>{originalTitle}</Title>
					<Release>
						{new Date(releaseDate).toLocaleDateString("ko", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</Release>
					<Overview>
						{overview !== "" && overview.length > 150
							? `${overview.slice(0, 150)}...`
							: overview}
					</Overview>
				</HColumn>
			</Container>
		</TouchableOpacity>
	);
};

export default HMedia;
