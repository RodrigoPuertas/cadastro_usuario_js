import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";  // Importando o styles corretamente
import { jsx } from 'react/jsx-runtime';

//add validação de code > 0
//add função de olhar senha

export default function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
  }

  //criar um regex para a senha 
  function validatePassword(password){
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    return regex.test(password)
  }

  function Clear() {
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function Save() {
    // Validação do id, email, senha e confirmação de senha antes de salvar
    if (id <= 0) {
      Alert.alert("Erro", "O código deve ser maior que 0.");
      return;
    } else if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    } else if (password != confirmPassword) {
      Alert.alert("Erro", "Senhas não estão iguais!");
      return;
    } else if (!validatePassword(password)) {
      Alert.alert("Erro", "Senha muito fraca!");
      return;
    }

    let objUsuario = {
      id : id,
      name : name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const stringJson = JSON.stringify(objUsuario);

    await AsyncStorage.setItem("@usuario", stringJson);
    Alert.alert("Salvo com sucesso!");
  }

  async function load() {
    const conteudoJson = await AsyncStorage.getItem("@usuario");
    if (conteudoJson != null){
      const objUsuario = JSON.parse(conteudoJson);
      setId(objUsuario.id);
      setName(objUsuario.name);
      setEmail(objUsuario.email);
      setPassword(objUsuario.password);
      setConfirmPassword(objUsuario.confirmPassword);
    } else {
      Alert.alert("Erro", "Não há dados cadastrados.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="code"
        onChangeText={(text) => setId(text)}
        value={id}
        keyboardType="numeric" // Definindo o teclado numérico
      />

      <TextInput
        style={styles.input}
        placeholder="name"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={Save}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={load}>
          <Text style = {styles.buttonText}>Load</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
