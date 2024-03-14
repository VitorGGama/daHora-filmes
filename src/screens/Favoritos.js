// src/screens/Sobre.js
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SafeContainer from "../components/SafeContainer";

export default function Favoritos() {
  return (
    <SafeContainer>
      <View style={estilos.subContainer}>
        <View style={estilos.viewFAvoritos}>
          <Text style={estilos.texto}>Favoritos </Text>
        </View>
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
});
