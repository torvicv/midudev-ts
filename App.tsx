import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle='light-content' />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </NativeBaseProvider>
  );
}

