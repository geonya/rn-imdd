import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import VMedia from "./VMedia";

const ListContainer = styled.View`
	margin-bottom: 40px;
`;
const ListTitle = styled.Text`
	color: ${(props) => props.theme.textColor};
	font-size: 16px;
	font-weight: 600;
	margin-left: 10px;
	margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
	width: 20px;
`;

interface HListProps {
	title: string;
	data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
	<ListContainer>
		<ListTitle>{title}</ListTitle>
		<FlatList
			data={data}
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={HListSeperator}
			contentContainerStyle={{ paddingHorizontal: 30 }}
			keyExtractor={(item) => item.id + ""}
			renderItem={({ item }) => (
				<VMedia
					title={item.original_title ?? item.original_name}
					poster={item.poster_path || ""}
					vote={item.vote_average}
				/>
			)}
		/>
	</ListContainer>
);

export default HList;
