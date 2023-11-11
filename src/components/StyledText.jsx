import { Text, StyleSheet } from "react-native";
import theme from './theme.js';

const styles = StyleSheet.create({
    text: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    colorSecondary: {
        color: theme.colors.textSecundary
    },
    bold: {
        fontWeight: theme.fontWeights.bold
    },
    subheading: {
        fontSize: theme.fontSizes.subheading
    },
    marginBig: {
        margin: theme.margins.big
    },
    marginSmall: {
        margin: theme.margins.small
    }
});

export default function StyledText ({margin, fontWeight, color, fontSize, children, style, ...restOfProps}) {

    const textStyles = [
        styles.text,
        fontWeight === 'bold' && styles.bold,
        color === 'primary' && styles.colorPrimary,
        color === 'secondary' && styles.colorSecondary,
        fontSize === 'subheading' && styles.subheading,
        fontWeight === 'bold' && styles.bold,
        margin === 'small' && styles.marginSmall,
        margin === 'big' && styles.marginBig,
        style
    ]

    return (
        <Text style={textStyles} {...restOfProps}>
            {children}
        </Text>
    )
};