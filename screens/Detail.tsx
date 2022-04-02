import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
	Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
	navigation: { setOptions },
	route: {
		params: { original_title, poster_path, overview, original_name },
	},
}) => {
	useEffect(() => {
		setOptions({
			title: original_title || original_name,
		});
	}, []);
	return (
		<Container>
			<Text>title</Text>
		</Container>
	);
};

export default Detail;
