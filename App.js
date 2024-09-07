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
  const [editingUserId, setEditingUserId] = useState(null); // ID do usuário que está sendo editado

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
    setEditingUserId(null); // Limpa o ID do usuário em edição
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
    } else if (password !== confirmPassword) {
      Alert.alert("Erro", "Senhas não estão iguais!");
      return;
    } else if (!validatePassword(password)) {
      Alert.alert("Erro", "Senha muito fraca!");
      return;
    }

    let updatedUsers = [...users];
    const existingUserIndex = users.findIndex(user => user.id === id);

    if (existingUserIndex !== -1 && editingUserId !== id) {
      Alert.alert("Erro", "O código já está cadastrado!");
      return;
    }

    if (editingUserId !== null) {
      // Edita o usuário existente
      updatedUsers = users.map(user =>
        user.id === editingUserId
          ? { id: id, name, email, password }
          : user
      );
      setEditingUserId(null); // Finaliza a edição
    } else {
      // Adiciona um novo usuário
      updatedUsers.push({ id, name, email, password });
    }

    await AsyncStorage.setItem("@users", JSON.stringify(updatedUsers)); // Salva a lista de usuários
    setUsers(updatedUsers);
    Alert.alert("Usuário salvo com sucesso!");
    Clear(); // Limpa os campos após o salvamento
  }

  async function deleteUser(userId) {
    let updatedUsersList = users.filter(user => user.id !== userId);
    await AsyncStorage.setItem("@users", JSON.stringify(updatedUsersList));
    setUsers(updatedUsersList);
  }
  
  async function loadUsers() {
    const conteudoJson = await AsyncStorage.getItem("@users");
    if (conteudoJson !== null) {
      const loadedUsers = JSON.parse(conteudoJson);
      console.log(loadedUsers); // Adiciona isto para verificar a estrutura dos dados
      setUsers(loadedUsers);
    } else {
      Alert.alert("Não foi encontrado nenhum usuário cadastrado.");
    }
  }

  function editUser(user) {
    setId(user.id.toString());
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setConfirmPassword(user.password);
    setEditingUserId(user.id);
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
          <Text style={styles.buttonText}>{editingUserId ? "Update" : "Save"}</Text>
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
        keyExtractor={(item) => (item.id ? item.id.toString() : "default_key")}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>ID: {item.id}</Text>
            <Text style={styles.userText}>Nome: {item.name}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => editUser(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => deleteUser(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
