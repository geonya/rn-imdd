import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Container = styled.View`
	margin-right: 20px;
	align-items: center;
`;
const Title = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-weight: 600;
	margin-top: 8px;
	margin-bottom: 5px;
`;
interface VMediaProps {
	title: string;
	poster: string;
	vote: number;
}
const VMedia: React.FC<VMediaProps> = ({ title, poster, vote }) => {
	return (
		<Container>
			<Poster path={poster} />
			<Title>
				{title.slice(0, 12)}
				{title.length > 13 ? "..." : null}
			</Title>
			<Votes vote={vote} />
		</Container>
	);
};

export default VMedia;
