import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Divider } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/AuthProvider";
import { EXPO_PUBLIC_API_URL } from '@env';

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function LogInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getUrlPopular = EXPO_PUBLIC_API_URL + "sanctum/token";

  const [token, setToken] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    login(data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 20 }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="white"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.error}>This field is required.</Text>
      )}
      <Divider
        thickness="2"
        orientation="horizontal"
        style={{ marginVertical: 4 }}
      />
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="white"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      <Text style={styles.error}>
        {errors.password && errors.password.message}
      </Text>
      <Divider
        thickness="2"
        orientation="horizontal"
        style={{ marginVertical: 4 }}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "blue",
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    color: "white",
    padding: 8,
    borderRadius: 8,
  },
  error: {
    color: "red",
    fontSize: 10,
    marginBottom: 10,
  },
});
