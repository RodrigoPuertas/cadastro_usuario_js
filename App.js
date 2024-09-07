import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";  // Importando o styles corretamente

export default function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]); // Lista de usuários

  useEffect(() => {
    loadUsers(); // Carrega os usuários ao inicializar o aplicativo
  }, []);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,}$/;
    return regex.test(password);
  }

  function Clear() {
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function Save() {
    if (id <= 0) {
      Alert.alert("Erro", "O código deve ser maior que 0.");
      return;
    } else if (!name) {
      Alert.alert("Erro", "O nome é obrigatório.");
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

    let newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
    };

    let updatedUsers = [...users, newUser]; // Adiciona o novo usuário à lista
    setUsers(updatedUsers);

    const stringJson = JSON.stringify(updatedUsers);
    await AsyncStorage.setItem("@users", stringJson); // Salva a lista de usuários

    Alert.alert("Usuário salvo com sucesso!");
    Clear(); // Limpa os campos após o salvamento
  }

  async function loadUsers() {
    const conteudoJson = await AsyncStorage.getItem("@users");
    if (conteudoJson != null) {
      const loadedUsers = JSON.parse(conteudoJson);
      setUsers(loadedUsers);
    } else {
      Alert.alert("Não foi encontrado nenhum usuários cadastrados.");
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

        <TouchableOpacity style={styles.button} onPress={loadUsers}>
          <Text style={styles.buttonText}>Load Users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Usuários Cadastrados:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>ID: {item.id}</Text>
            <Text style={styles.userText}>Nome: {item.name}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
