import { Image, StyleSheet, View, Text, Platform } from "react-native";
import StyledText from "./StyledText";
import theme from "./theme";
import { Divider } from "native-base";

const RepositoryItemHeader = ({poster_path, title, overview, language}) => (
    <View style={styles.header}>
      <View style={styles.imageContainer} >
        <Image width={100} height={100}  
          style={styles.image}
          source={{
              uri: 'https://image.tmdb.org/t/p/original'+poster_path
          }} />
      </View>
      <View style={styles.viewHeader}>
        <StyledText color='white' margin='small' fontWeight='bold' fontSize='subheading'>Fullname: {title}</StyledText>
        <StyledText color='white' margin='small'>Description: {overview}</StyledText>
      </View>
    </View>
);

const MovieItem = ({repo}) => {
  return (
    <View style={styles.container} key={repo.id}>
      <RepositoryItemHeader {...repo} />
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
        shadowRadius: 12,
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.6,
        elevation: 20,
        borderRadius: 4,
    },
    language: {
        padding: 4,
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        borderRadius: 4, 
        alignSelf: 'flex-start'
    },
    image: {
        width: Platform.OS === 'web' ? 200 : 100,
        height: Platform.OS === 'web' ? 200 : 100
    }, 
    header: {
        paddingBottom: 2,
        alignItems: 'center',
        flexDirection: Platform.OS === 'web' ? 'row' : 'column'
    },
    viewHeader: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'start',
        justifyContent: 'space-between',
        width: '100%',
    },
    viewImage: {
        justifyContent: 'center'
    }
})

export default MovieItem;
