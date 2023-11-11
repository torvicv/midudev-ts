import React from "react";
import { View, StyleSheet, Text } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import theme from "./theme";
import { Link, Route, Routes, useLocation } from "react-router-native";
import ReposList from "./RepositoryList";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.appBar.primary,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    text: {
        color: 'grey',
        paddingHorizontal: 10,
        padding: 5
        
    },
    active: {
        color: theme.appBar.textPrimary,
        backgroundColor: 'grey',
        padding: 5
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


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <AppBarTab to='/'>Repositories</AppBarTab>
                <AppBarTab to='/signin'>Signin</AppBarTab>
            </View>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route exact path='/' element={<ReposList />} />
                    <Route exact path='/signin' element={<Text>Working in it</Text>} />
                </Routes>
            </View>

        </View>
    );
}

export default AppBar;