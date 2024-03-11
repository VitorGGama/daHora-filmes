import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { api, apiKey } from "../services/api-moviedb";
import { useEffect, useState } from "react";
import CardFilme from "../components/CardFilme";
import Separador from "./Separador";
import EmptyListComponent from "../components/ListaVazia";

/* Prop route
Prop especial e definida pelo React Navigation.
Através dela que é possível acessar valores passados
por meio de navegação entre telas. */
export default function Resultados({ route }) {
  /* State para gerenciar os resultados da busca na API */
  const [resultados, setResultados] = useState([]);

  /* State para gerenciar o loading (mostrar/esconder) */
  const [loading, setLoading] = useState(true);

  // Capturando o parâmetro filme vindo de BuscarFilmes
  const { filme } = route.params;

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await api.get(`/search/movie`, {
          params: {
            include_adult: false,
            language: "pt-BR",
            query: filme,
            api_key: apiKey,
          },
        });
        // console.log(resposta.data.results);
        /* Adicionando os resultados ao state*/
        setResultados(resposta.data.results);

        //Desativando o loading
        setLoading(false);
      } catch (error) {
        console.error("Deu ruim: " + error.message);
      }
    }
    buscarFilmes();
  }, []);

  return (
    <SafeContainer>
      {!loading && (
        <View style={estilos.subContainer}>
          <Text style={estilos.texto}>Você buscou por: {filme} </Text>

          {loading && <ActivityIndicator size="large" color="#5451a6" />}

          <View style={estilos.viewFilmes}></View>
          <FlatList
            data={resultados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <CardFilme filme={item} />;
            }}
            ListEmptyComponent={EmptyListComponent}
            ItemSeparatorComponent={Separador}
          />
        </View>
      )}
    </SafeContainer>
  );
}

const estilos = StyleSheet.create({
  viewFilmes: { marginVertical: 8 },
  subContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
  texto: {
    marginVertical: 8,
  },
});
