import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import theme from "./theme";
import { Link, Route, Routes, redirect, useLocation, useRoutes } from "react-router-native";
import ReposList from "./RepositoryList";
import LogInPage from "./LogInPage";
import Popular from './Popular';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import TopRated from "./TopRated";
import Upcoming from "./Upcoming";
import { AuthContext } from "../context/AuthProvider";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.appBar.primary,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    text: {
        color: 'grey',
        paddingHorizontal: 10,
        padding: 5
        
    },
    active: {
        color: theme.appBar.textPrimary,
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 4,
    }
});

const AppBarTab = ({ children, to}) => {
    
    const {pathname} = useLocation();
    const active = pathname === to;

    const textStyles = [
        styles.text,
        active && styles.active
    ]

    return (
        <Link to={to}>
            <StyledText fontWeight='bold' style={textStyles}>
                {children}
            </StyledText>
        </Link>
    )
}

const AppBar = () => {

    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);
    const getToken = () => {
        AsyncStorage.setItem('token', '');
    }
    const logoutBar = () => {
        if (user == undefined || user == null) {
            SecureStore.getItemAsync('token').then(tok => {
                setToken(tok);
            });
            if (token == null || token == undefined || token == '') {
                console.log(1);
                getToken();
            } else {
                SecureStore.setItemAsync('token', '');
            }
        }
        
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <AppBarTab to='/'>Repositories</AppBarTab>
                <AppBarTab to='/signin'>Signin</AppBarTab>
                <Menu>
                    <MenuTrigger customStyles={{ triggerText: styles.text }} text="Movies" />
                    <MenuOptions>
                        <MenuOption>
                            <AppBarTab to='/popular'>Popular</AppBarTab>
                        </MenuOption>
                        <MenuOption>
                            <AppBarTab to='/top-rated'>Más vistas</AppBarTab>
                        </MenuOption>
                        <MenuOption>
                            <AppBarTab to='/upcoming'>Próximas</AppBarTab>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                <Button onPress={() => { logout(); logoutBar(); 
        navigate('/signin'); }} 
                    title="Logout" />
            </View>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <Routes>
                    <Route exact path='/' element={<ReposList />} />
                    <Route exact path='/signin' element={<LogInPage />} />
                    <Route exact path='/popular' element={<Popular />} />
                    <Route exact path='/top-rated' element={<TopRated />} />
                    <Route exact path='/upcoming' element={<Upcoming />} />
                </Routes>
            </View>

        </View>
    );
}

export default AppBar;