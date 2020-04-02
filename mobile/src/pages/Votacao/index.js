import React, { Component } from 'react';
import { api, ioUrl } from '../../services/api';
import Logotipo from '../../assets/logotipo.png';
import socket from 'socket.io-client';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles';

class Votacao extends Component {
  state = {
    lista: [],
  };

  async componentDidMount() {
    const res = await api.get('/musica');
    let registros = this.ordenar(res.data);

    this.setState({ lista: registros });

    this.iniciarIo();
  }

  iniciarIo = () => {
    const io = socket(ioUrl);
    io.on('scoreMusica', (data) => {
      let colRegistros = [
        ...this.state.lista.filter((item) => {
          return item._id !== data._id;
        }),
        data,
      ];
      let registros = this.ordenar(colRegistros);
      this.setState({ lista: registros });
    });
  };

  hundleDiminuir = async (item) => {
    item.score = item.score - 1;
    try {
      const res = await api.put('/musica/score/' + item._id, item);
      console.log('ACAO-DIMINUIR', res.data);

      let colRegistros = await [
        ...this.state.lista.filter((registro) => {
          return registro._id !== item._id;
        }),
        res.data,
      ];

      let registros = await this.ordenar(colRegistros);

      await this.setState({ lista: registros });
    } catch (error) {
      console.log('ACAO-DIMINUIR-ERRO', error);
    }
  };

  ordenar = (colRegistros) => {
    return colRegistros.sort((item1, item2) => {
      return item2.score - item1.score;
    });
  };

  hundleAumentar = async (item) => {
    item.score = item.score + 1;
    try {
      const res = await api.put('/musica/score/' + item._id, item);
      console.log('ACAO-AUMENTAR', res.data);
      let colRegistros = await [
        ...this.state.lista.filter((registro) => {
          return registro._id !== item._id;
        }),
        res.data,
      ];
      let registros = this.ordenar(colRegistros);
      this.setState({ lista: registros });
    } catch (error) {
      console.log('ACAO-AUMENTAR-ERRO', error);
    }
  };

  renderItem = (item, index) => {
    return (
      <View style={styles.linha}>
        <Text style={styles.score}>{item.score}</Text>
        <View style={styles.dadosMusica}>
          <Text style={styles.musicaTitulo}>título: {item.titulo}</Text>
          <Text style={styles.musicaTitulo}>Autor: {item._autor.nome}</Text>
          <Text style={styles.musicaAlbum}>Album: {item.album}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnArrow}
            onPress={() => this.hundleAumentar(item)}
          >
            <Icon name="arrow-up" size={32} color="darkgreen" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnArrow}
            onPress={() => this.hundleDiminuir(item)}
          >
            <Icon name="arrow-down" size={32} color="darkred" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    console.log('LSITA', this.state.lista);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topo}>
          <Image source={Logotipo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.titulo}>Ranking de votações</Text>
        </View>
        <View style={styles.corpo}>
          <FlatList
            data={this.state.lista}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Votacao;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.branco },
  topo: {
    padding: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  corpo: { backgroundColor: colors.topo, flex: 1, paddingTop: 10 },
  logo: { height: 48, width: 48 },
  titulo: { fontSize: 25 },
  linha: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.branco,
    elevation: 5,
  },
  score: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 200,
    backgroundColor: colors.fundo,
    height: 105,
    width: 105,
  },
  btnArrow: {
    backgroundColor: colors.fundo,
    padding: 10,
  },

  dadosMusica: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
