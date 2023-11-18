import StyledText from "./StyledText";
import { View } from "react-native";


const parseThousands = value => {
    return value >= 1000
        ? `${Math.round(value / 100) / 10}k`
        : String(value);
}

const RepositoryStats = props => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center'}}>
                <StyledText color='white' align='center' fontWeight='bold'>Stars</StyledText>
                <StyledText color='white' align='center'>{parseThousands(props.stargazersCount)}</StyledText>
            </View>
            <View style={{ alignItems: 'center'}}>
                <StyledText color='white' align='center' fontWeight='bold'>Forks</StyledText>
                <StyledText color='white' align='center'>{parseThousands(props.forksCount)}</StyledText>
            </View>
            <View style={{ alignItems: 'center'}}>
                <StyledText color='white' align='center' fontWeight='bold'>Review</StyledText>
                <StyledText color='white'>{props.reviewCount}</StyledText>
            </View>
            <View style={{ alignItems: 'center'}}>
                <StyledText color='white' align='center' fontWeight='bold'>Rating</StyledText>
                <StyledText color='white' align='center'>{props.ratingAverage}</StyledText>
            </View>
        </View>
    );
}

export default RepositoryStats;