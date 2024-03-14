import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import imagemAlternativa from "../../assets/images/foto-alternativa.jpg";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardFilme({ filme }) {
  const { title, poster_path } = filme;

  const navigation = useNavigation();
  const salvar = async () => {
    //Alert.alert("Favoritos", "Salvando");

    try {
      /* 1) Verificar/carregar os favoritos armazenados no AsyncStorage. 
      Usamos o getItem do AsyncStorage para analisar se existe um armazenamento 
      com o nome indocado (@favoritosvitor). Existindo, ele é carregado para a 
      const filmesFavoritos. Se não existir, será criado posteriomente. */
      const filmesFavoritos = await AsyncStorage.getItem("@favoritosvitor");

      /* 2) Verificar/criar uma lista de filmes favoritos (dados).
      Se filmesFavoritos existir (ou seja, tem dados no storage), pegamos
      estes dados (strings) e convertemos em  objeto (JSON.parse). Caso contrário,
      listaDeFilmes será um array vazio. */
      const listaDeFilmes = filmesFavoritos ? JSON.parse(filmesFavoritos) : [];

      /* 3) Verificar se já tem algum filme na lista 
      Usamos a função some() para avaliar se o ID do filme dentro da listaDeFilmes é o mesmo de um filme exibido na tela do app (nos Cards). Se for, retorna TRUE indicando que o filme já foi salvo
      em algum momento. Caso contrário, retorna FALSE indicando que o
      filme ainda não foi salvo. */
      const jaTemFilme = listaDeFilmes.some((filmeNaLista) => {
        return filmeNaLista.id === filme.id;
      });

      /* 4) Se o filme não estiver na lista, então vamos coloca-lo */

      /* 4.1) Se já tem filme, avisaremos ao usuário*/
      if (jaTemFilme) {
        Alert.alert("Ops!", "Você já salvou este filme!");
        Vibration.vibrate();
        return;
      }
      /* 4.2) Senão, vamos colocar na lista */
      listaDeFilmes.push(filme);

      /* 5) Usamos o AsyncStorage para gravar no armazenamento offline 
      do dispositivo */
      await AsyncStorage.setItem(
        "@favoritosvitor",
        JSON.stringify(listaDeFilmes)
      );

      Alert.alert("Favoritos", `${title} foi salvo com sucesso!`);
    } catch (error) {
      console.log("Erro: " + error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o filme...");
    }
  };

  return (
    <View style={estilos.card}>
      <Image
        resizeMode="cover"
        style={estilos.imagem}
        source={
          poster_path
            ? { uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }
            : imagemAlternativa
        }
      />
      <View style={estilos.corpo}>
        <Text style={estilos.titulo}> {title} </Text>
        <View style={estilos.botoes}>
          <Pressable
            style={estilos.botao}
            onPress={() => navigation.navigate("Detalhes", { filme })}
          >
            <Text style={estilos.textoBotao}>
              <Ionicons name="book" size={12} /> Leia mais
            </Text>
          </Pressable>
          <Pressable style={estilos.botao} onPress={salvar}>
            <Text style={estilos.textoBotao}>
              <Ionicons name="add-circle" size={12} /> Salvar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    marginVertical: 4,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#5451a6",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagem: {
    height: 150,
    width: 100,
    flex: 1,
  },
  corpo: { flex: 2 },
  titulo: {
    backgroundColor: "#5451a6",
    color: "white",
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 16,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  botao: {
    borderColor: "#5451a6",
    borderWidth: 1,
    padding: 8,
  },
  textoBotao: {
    color: "#5451a6",
    fontSize: 12,
    textTransform: "uppercase",
  },
});
