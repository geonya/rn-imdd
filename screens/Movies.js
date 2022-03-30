import React from "react";
import styled from "styled-components/native";

const Btn = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: red;
`;
const Title = styled.Text`
	color: ${(props) => (props.selected ? "blue" : "yellow")};
`;

const Movies = ({ navigation: { navigate } }) => (
	<Btn onPress={() => navigate("Stack", { screen: "Three" })}>
		<Title selected={true}>Movies</Title>
	</Btn>
);

export default Movies;
