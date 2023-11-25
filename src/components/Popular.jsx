import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import MovieItem from './MovieItem';
import { AuthContext } from "../context/AuthProvider";
import axios from 'axios';

const PopularList = () => {

    const getUrlPopular = process.env.EXPO_PUBLIC_API_URL + 'popular';
    const [popularList, setPopularList] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(getUrlPopular, {
            headers: {
                'Authorization': `Bearer ${user}`,
                'accept': 'application/json'
            }
        })
            .then(response => {
                setPopularList(response.data);
            })
            
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