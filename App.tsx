import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image
} from 'react-native'
import { useState } from 'react'

interface Pais {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
  };
}

interface Capital {
  name: {
    official: string;
  };
  flags: {
    png: string;
  };
}

export default function App() {
  const [busca, setBusca] = useState('')
  const [paises, setPaises] = useState<Pais[]>([])
  const [buscaCapital, setBuscaCapital] = useState('')
  const [capital, setCapital] = useState<Capital[]>([])

  const buscarPorNome = async () => {
    try {
      const resposta = await fetch(
        `https://restcountries.com/v3.1/name/${busca}`
      )

      if (!resposta.ok) {
      throw new Error()
    }

      const info: Pais[] = await resposta.json();
      const pais = info[0];
  
      setPaises([pais]);
      
    } catch (error) {
      alert(`${busca} nao encontrada`);
      console.log(error);
    }
  }

  const buscarPorCapital = async () => {
    try {
      const resposta = await fetch(
        `https://restcountries.com/v3.1/capital/${buscaCapital}`
      )

      if (!resposta.ok) {
      throw new Error()
    }
  
      const info: Capital[] = await resposta.json();
      const capital = info[0];
  
      setCapital([capital]);
      
    } catch (error) {
      alert(`${buscaCapital} nao encontrada`);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Digite o nome do pais...'
        value={busca}
        onChangeText={(novoTexto) => setBusca(novoTexto)}
      />
      <Pressable
        onPress={buscarPorNome}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Buscar por nome
        </Text>
      </Pressable>

      <FlatList
        style={styles.list}
        data={paises}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              Nome comum do pais: {item.name.common}
            </Text>

            <Text style={styles.listItemText}>
              Nome oficial do pais: {item.name.official}
            </Text>
          </View>
        )}
      />

      <View style={{ height: 20 }} />

      <TextInput
        style={styles.input}
        placeholder='Digite a capital...'
        value={buscaCapital}
        onChangeText={(novoTexto) => setBuscaCapital(novoTexto)}
      />

      <Pressable
        onPress={buscarPorCapital}
        style={styles.button}>
        <Text style={styles.buttonText}>
          Buscar por capital
        </Text>
      </Pressable>
      <FlatList
        style={styles.list}
        data={capital}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              Nome oficial do pais: {item.name.official}
            </Text>

            <Image
              source={{ uri: item.flags.png }}
              style={styles.bandeira}
            />
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    textAlign: 'center',
    borderRadius: 4
  },
  list: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    width: '80%',
    marginTop: 8,
    padding: 8
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'column',
    alignItems: 'center'
  },
  listItemText: {
    textAlign: 'center',
    width: '100%'
  },
  bandeira: {
    width: 120,
    height: 80,
    marginTop: 8
  }
});
