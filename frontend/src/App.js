import React from "react";
import Votacao from "./pages/Votacao";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Votacao />
    </Provider>
  );
}

export default App;
