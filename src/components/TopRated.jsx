import React, { useEffect, useState, useContext } from "react";
import { FlatList } from "react-native";
import MovieItem from './MovieItem';
import { AuthContext } from "../context/AuthProvider";
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopRated = () => {

    const getUrlPopular = EXPO_PUBLIC_API_URL + 'top-movies';
    const [popularList, setPopularList] = useState([]);
    const { user } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const getToken = () => {
        AsyncStorage.getItem('token').then(tok => setToken(tok));
    }

    console.log(user);
    if (user == undefined || user == null) {
        console.log(2, SecureStore.getItemAsync('token'));
        SecureStore.getItemAsync('token').then(tok => {
            setToken(tok);
        });
        if (token == null || token == undefined || token == '') {
            console.log(1);
            getToken();
        }
    } else {
        console.log(3);
        setToken(user);
    }

    useEffect(() => {
        axios.get(getUrlPopular, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            }
        })
            .then(response => {
                setPopularList(response.data);
            })
            
    }, [token]);

    return (
        <FlatList
            data={popularList}
            renderItem={({item: repo}) => (
                <MovieItem repo={repo} />
            )} />
    );
}

export default TopRated;