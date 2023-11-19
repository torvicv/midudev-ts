import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import repositories from "../data/repositories";
import RepositoryItem from "./RepositoryItem";
import MovieItem from './MovieItem';

const PopularList = () => {

    const getUrlPopular = process.env.EXPO_PUBLIC_API_URL + 'popular';
    const [popularList, setPopularList] = useState([]);

    useEffect(() => {
        fetch(getUrlPopular)
            .then((response) => response.json())
            .then((response) => {
                console.log(JSON.stringify(response));
                setPopularList(response);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <FlatList
            data={popularList}
            renderItem={({item: repo}) => (
                <MovieItem repo={repo} />
            )} />
    );
}

export default PopularList;