import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as React from "react";
import { Divider } from "native-base";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required()
}).required();

export default function LogInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.textInput}
            placeholder="First name"
            placeholderTextColor='white'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={styles.error}>This field is required.</Text>}
      <Divider thickness='2' orientation="horizontal" style={{ marginVertical: 4 }} />
      <Controller
        control={control}
        rules={{
            required: true,
            maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={styles.textInput}
            placeholder="Last name"
            placeholderTextColor='white'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            />
            )}
        name="lastName"
      />
      <Text style={styles.error}>{errors.lastName && errors.lastName.message}</Text>
      <Divider thickness='2' orientation="horizontal" style={{ marginVertical: 4 }} />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );


}
const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'blue',
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        color: 'white',
        padding: 8,
        borderRadius: 8,
    },
    error: {
        color: 'red',
        fontSize: 10,
        marginBottom: 10,
    }
  })
