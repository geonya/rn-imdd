import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const Container = styled.View`
	padding: 0px 30px;
	flex-direction: row;
	margin-bottom: 30px;
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
	title: string;
	poster: string;
	release: string;
	overview: string;
}

const HMedia: React.FC<HMediaProps> = ({
	title,
	poster,
	release,
	overview,
}) => {
	return (
		<Container>
			<Poster path={poster} />
			<HColumn>
				<Title>{title}</Title>
				<Release>
					{new Date(release).toLocaleDateString("ko", {
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
	);
};

export default HMedia;
