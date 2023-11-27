import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalService = (user) => {
    const [tokenApi, setTokenApi] = useState(null);

    const getToken = () => {
        AsyncStorage.getItem('token').then(tok => setTokenApi(tok));
    }
    let token = '';

    console.log(user);
    if (user == undefined || user == null) {
        console.log(2, SecureStore.getItemAsync('token'));
        SecureStore.getItemAsync('token').then(tok => {
            setTokenApi(tok);
        });
        if (tokenApi == null || tokenApi == undefined || tokenApi == '') {
            console.log(1);
            getToken();
        }
    } else {
        console.log(3);
        setTokenApi(user);
    }
    if (tokenApi)
    token = tokenApi
        return token;
}
