import React from 'react';
import logo from './logo.svg';
import './App.css';
import RouterManager from "./router/RouterManager";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="application-body container-fluid">
        <RouterManager/>
    </div>

  );
}

export default App;
