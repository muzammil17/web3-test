import React from "react";
import "./App.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import Content from "./components/content";
import Context from "./components/context";

function App() {
  return (
    <Context>
      <Content />
    </Context>
  );
}

export default App;
