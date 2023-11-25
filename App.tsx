import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider } from './src/context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <StatusBar barStyle='light-content' />
        <NativeRouter>
          <MenuProvider>
            <Main />
          </MenuProvider>
        </NativeRouter>
      </NativeBaseProvider>
    </AuthProvider>
  );
}

