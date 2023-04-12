import React, { type FC } from "react";

import { Header } from "../Header/Header";
import { SmartHostForm } from "../SmartHostForm/SmartHostForm";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <SmartHostForm />
    </div>
  );
};

export default App;
