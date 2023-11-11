import { Image, StyleSheet, View } from "react-native";
import StyledText from "./StyledText";
import RepositoryStats from "./RepositoryStats";
import theme from "./theme";

const RepositoryItemHeader = ({ownerAvatarUrl, fullName, description, language}) => (
    <View style={styles.header}>
      <View style={styles.viewImage}>
        <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
      </View>
      <View style={styles.viewHeader}>
        <StyledText margin='small' fontWeight='bold' fontSize='subheading'>Fullname: {fullName}</StyledText>
        <StyledText margin='small'>Description: {description}</StyledText>
        <StyledText margin='small' style={styles.language}>Language: {language}</StyledText>
      </View>
    </View>
);

const RepositoryItem = ({repo}) => {
  return (
    <View style={styles.container} key={repo.id}>
      <RepositoryItemHeader {...repo} />
      <RepositoryStats {...repo} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5
    },
    language: {
        padding: 4,
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        borderRadius: 4
    },
    image: {
        width: 75,
        height: 75
    }, 
    header: {
        flexDirection: 'row',
        paddingBottom: 2,
        justifyContent: 'center'
    },
    viewHeader: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center'
    },
    viewImage: {
        justifyContent: 'center'
    }
})

export default RepositoryItem;
