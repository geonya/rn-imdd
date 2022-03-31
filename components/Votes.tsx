import React from "react";
import styled from "styled-components/native";

const Vote = styled.Text`
	opacity: 0.8;
	color: ${(props) => props.theme.textColor};
`;

interface VotesProps {
	vote: number;
}
const Votes: React.FC<VotesProps> = ({ vote }) => {
	return <Vote>{vote > 0 ? `⭐️ ${vote}/10` : "Coming Soon"}</Vote>;
};

export default Votes;
