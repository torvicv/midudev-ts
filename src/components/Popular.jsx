import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import MovieItem from './MovieItem';
import { AuthContext } from "../context/AuthProvider";
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PopularList = () => {

    const getUrlPopular = EXPO_PUBLIC_API_URL + 'popular';
    const [popularList, setPopularList] = useState([]);
    const { user } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const getToken = () => {
        AsyncStorage.getItem('token').then(tok => setToken(tok));
    }

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching token:', error);
            }

            if (token == null || token == undefined || token == '') {
                console.log(1);
                getToken();
            }
        }

        if (!user) {
            fetchToken();
        } else {
            setToken(user);
        }
    }, [user]);
    console.log(user);
    /*if (user == undefined || user == null) {
        console.log(2, SecureStore.getItemAsync('token'));
        SecureStore.getItemAsync('token').then(tok => {
            setToken(tok);
        })
        .catch(error => {
            console.log(4, error);
        });;
        if (token == null || token == undefined || token == '') {
            console.log(1);
            getToken();
        }
    } else {
        console.log(3);
        setToken(user);
    }
    
    console.log(token);
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
            
    }, [token]); */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(getUrlPopular, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json'
                    }
                });
                setPopularList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (token) {
            fetchData();
        }
    }, [getUrlPopular, token]);


    return (
        <FlatList
            data={popularList}
            renderItem={({item: repo}) => (
                <MovieItem repo={repo} />
            )} />
    );
}

export default PopularList;