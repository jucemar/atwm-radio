import React, { Component, Fragment } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";

import { getMusicas, alterarPosicao, receberAlteracao } from "../../actions";
import { ArrowUpward, ArrowDownward, MusicNote } from "@material-ui/icons";

import socket from "socket.io-client";

import { Container } from "./styles";
import logotipo from "../../assets/images/logotipo.svg";
import { ioUrl } from "../../services/api";
import {
  colors,
  Typography,
  LinearProgress,
  Paper,
  Grid,
  Box
} from "@material-ui/core";

class Votacao extends Component {
  state = {
    itemAtualizando: ""
  };
  componentDidMount() {
    this.iniciarIO();
    this.props.getMusicas();
  }

  hundleDiminuir = async item => {
    item.score = item.score - 1;
    this.setState({ itemAtualizando: item._id });
    this.props.alterarPosicao(item);
  };

  hundleAumentar = async item => {
    item.score = item.score + 1;
    this.setState({ itemAtualizando: item._id });
    this.props.alterarPosicao(item);
  };

  iniciarIO = () => {
    const io = socket(ioUrl);

    io.on("scoreMusica", data => {
      this.props.receberAlteracao(data);
    });
  };

  render() {
    console.log(this.props.musicas);
    const { atualizando, carregando, registros, error } = this.props.musicas;
    return (
      <Fragment>
        <header>
          <img src={logotipo} alt="" style={{ width: 150 }} />
          <h1>Rankinhg</h1>
        </header>

        {/*  {atualizando && <div>Aguarde...</div>}
          {carregando && <div>Carregando...</div>}
 */}
        <div style={{ maxWidth: 500 }}>
          <Grid container spacing={2}>
            {!carregando &&
              registros &&
              registros.length > 0 &&
              registros.map((item, i) => {
                return (
                  <Grid item xs={12}>
                    <Paper>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: colors.green[500],
                              margin: 10,
                              width: 130
                            }}
                          >
                            <Typography
                              style={{ padding: 10, textAlign: "center" }}
                              variant="h1"
                            >
                              {item.score}
                            </Typography>
                          </div>
                          <div
                            className="item"
                            style={{
                              padding: 10,
                              flex: 1
                            }}
                          >
                            <Typography variant="h6" gutterBottom>
                              <MusicNote />
                              {item.titulo}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                              Autor: {item._autor.nome}
                            </Typography>

                            <Typography variant="subtitle1" gutterBottom>
                              Album: {item.album}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: colors.green["50"],
                              justifyContent: "space-between"
                            }}
                          >
                            <IconButton
                              onClick={() => this.hundleAumentar(item)}
                            >
                              <ArrowUpward />
                            </IconButton>
                            <IconButton
                              onClick={() => this.hundleDiminuir(item)}
                            >
                              <ArrowDownward />
                            </IconButton>
                          </div>
                        </div>
                        {atualizando &&
                          this.state.itemAtualizando === item._id && (
                            <LinearProgress style={{ width: "100%" }} />
                          )}
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  musicas: state.musicasReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getMusicas, alterarPosicao, receberAlteracao },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Votacao);
