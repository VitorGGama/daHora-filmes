import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import SafeContainer from "../components/SafeContainer";

export default function Favoritos({ navigation }) {
  const [listaFavoritos, setListaFavoritos] = useState([]);

  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const dados = await AsyncStorage.getItem("@favoritosvitor");
        if (dados) {
          setListaFavoritos(JSON.parse(dados));
        }
      } catch (error) {
        console.error("Erro ao carregar os dados: " + error);
        Alert.alert("Erro", "Erro ao carregar os dados");
      }
    };
    carregarFavoritos();
  }, []);

  const excluirUmFilme = async (index) => {
    Alert.alert(
      "Excluir item",
      "Tem certeza que deseja excluir este filme dos favoritos?",
      [
        {
          text: "Desistir",
          style: "cancel",
        },
        {
          text: "Sim, excluir",
          style: "destructive",
          onPress: async () => {
            // Remove o item do estado
            const novosFavoritos = listaFavoritos.filter(
              (exclui, i) => i !== index
            );
            setListaFavoritos(novosFavoritos);

            // Atualiza o AsyncStorage
            await AsyncStorage.setItem(
              "@favoritosvitor",
              JSON.stringify(novosFavoritos)
            );
          },
        },
      ]
    );
  };

  const excluirTodosFavoritos = async () => {
    Alert.alert(
      "Excluir TODOS?",
      "Tem certeza que deseja excluir todos os favoritos",
      [
        {
          text: "Desistir",
          style: "cancel", //verificar
        },
        {
          text: "Sim, manda ver",
          style: "destructive",
          onPress: async () => {
            //Removemos nosso storage de favoritos
            await AsyncStorage.removeItem("@favoritosvitor");

            //Atualizamos o storage para que sejam removidos da tela
            setListaFavoritos([]);
          },
        },
      ]
    );
  };

  return (
    <SafeContainer>
      <View style={estilos.subContainer}>
        <View style={estilos.viewFAvoritos}>
          <Text style={estilos.texto}>Quantidade:{listaFavoritos.length} </Text>
          {listaFavoritos.length > 0 && (
            <Pressable
              onPress={excluirTodosFavoritos}
              style={estilos.botaoExcluirFavoritos}
            >
              <Text style={estilos.textoBotao}>
                <Ionicons name="trash-outline" size={16} />
                Excluir favoritos
              </Text>
            </Pressable>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {listaFavoritos.map((filme, index) => (
            <View key={filme.id} style={estilos.item}>
              <Pressable
                onPress={() => {
                  navigation.navigate("Detalhes", { filme });
                }}
                style={estilos.botaoFilme}
              >
                <Text style={estilos.titulo}>{filme.title}</Text>
              </Pressable>

              <Pressable
                onPress={() => excluirUmFilme(index)}
                style={estilos.botaoExcluir}
              >
                <Text>
                  <Ionicons color="white" name="trash" size={16} />
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeContainer>
  );
}

const estilos = StyleSheet.create({
  subContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
  texto: {
    marginVertical: 8,
  },
  viewFAvoritos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  textoBotao: { color: "red" },
  botaoExcluirFavoritos: {
    borderWidth: 1,
    borderColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  item: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eee8fc",
    marginBottom: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  botaoFilme: { flex: 1 },
  titulo: { fontSize: 14 },
  botaoExcluir: {
    backgroundColor: "darkred",
    padding: 4,
    borderRadius: 4,
  },
});
