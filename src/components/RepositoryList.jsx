import React from "react";
import { FlatList } from "react-native";
import repositories from "../data/repositories";
import RepositoryItem from "./RepositoryItem";

const ReposList = () => {
    return (
        <FlatList
            data={repositories}
            renderItem={({item: repo}) => (
                <RepositoryItem repo={repo} />
            )} />
    );
}

export default ReposList;