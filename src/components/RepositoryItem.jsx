import { Image, StyleSheet, View } from "react-native";
import StyledText from "./StyledText";
import RepositoryStats from "./RepositoryStats";
import theme from "./theme";
import { Divider } from "native-base";

const RepositoryItemHeader = ({ownerAvatarUrl, fullName, description, language}) => (
    <View style={styles.header}>
      <View style={styles.viewImage}>
        <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
      </View>
      <View style={styles.viewHeader}>
        <StyledText color='white' margin='small' fontWeight='bold' fontSize='subheading'>Fullname: {fullName}</StyledText>
        <StyledText color='white' margin='small'>Description: {description}</StyledText>
        <StyledText color='white' margin='small' style={styles.language}>Language: {language}</StyledText>
      </View>
    </View>
);

const RepositoryItem = ({repo}) => {
  return (
    <View style={styles.container} key={repo.id}>
      <RepositoryItemHeader {...repo} />
      <Divider bg='blue.400' orientation="horizontal" thickness='1' my='2' />
      <RepositoryStats {...repo} />
      <Divider bg='blue.400' orientation="horizontal" thickness='20' borderRadius='8' my='2' />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        borderColor: 'black',
        backgroundColor: 'black',
        margin: 20,
        shadowColor: 'white',
        shadowOffset: {width: -4, height: 4},
        shadowOpacity: 1,
        elevation: 20
    },
    language: {
        padding: 4,
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        borderRadius: 4, 
        alignSelf: 'flex-start'
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
        alignItems: 'start',
        justifyContent: 'space-between'
    },
    viewImage: {
        justifyContent: 'center'
    }
})

export default RepositoryItem;
