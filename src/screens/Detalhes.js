import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SafeContainer from "../components/SafeContainer";
import imagemAlternativa from "../../assets/images/foto-alternativa.jpg";
import moment from "moment";

export default function Detalhes({ route }) {
  const { filme } = route.params;
  const { poster_path } = filme;

  return (
    <SafeContainer>
      <View style={estilos.subContainer}>
        <ImageBackground
          style={estilos.imagemFundo}
          source={
            poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }
              : imagemAlternativa
          }
        >
          <Text style={estilos.titulo}> {filme.title}</Text>
        </ImageBackground>
        <View style={estilos.conteudo}>
          <ScrollView>
            <Text style={[estilos.texto, estilos.avaliacao]}>
              Avaliação: {filme.vote_average} | Lançamento:{" "}
              {moment(filme.release_date).format("DD/MM/YYYY")}
            </Text>

            <Text style={[estilos.texto, estilos.descricao]}>
              {filme.overview}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeContainer>
  );
}

const estilos = StyleSheet.create({
  subContainer: {
    flex: 1,
    width: "100%",
  },
  imagemFundo: {
    height: 200,
    justifyContent: "center",
  },
  titulo: {
    backgroundColor: "rgba(0,0,0,0.75)",
    color: "white",
    fontFamily: "NotoSans",
    textAlign: "center",
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  conteudo: {
    padding: 16,
    flex: 1, // Apenas para garantir a ocupação do espaço em caso de texto  muito grande
  },
  texto: {
    paddingVertical: 4,
    fontSize: 16,
  },
  avaliacao: { color: "blue" },
  lancamento: { color: "darkblue" },
  descricao: { color: "gray" },
});
