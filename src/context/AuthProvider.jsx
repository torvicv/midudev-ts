import React, { createContext, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const getUrlPopular = EXPO_PUBLIC_API_URL + "sanctum/token";

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                isLoading,
                login: (data) => {
                    console.log(data);
                    setIsLoading(true);
                    axios.post(getUrlPopular, 
                        data
                    ).then(response => {
                        setUser(response.data.token);
                        setError(null);
                        SecureStore.setItemAsync('token', response.data.token);
                        AsyncStorage.setItem('token', response.data.token);
                        setIsLoading(false);
                    }).catch(error => {
                        console.log(error.response);
                        const key = Object.keys(error.response.data.errors)[0];
                        setError(error.response.data.errors[key][0]);
                        setIsLoading(false);
                    });
                },
                logout: () => {
                    setUser(null);
                }
            }}
            >
                {children}
            </AuthContext.Provider>
    );
}