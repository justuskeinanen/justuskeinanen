import React from "react";
import "./App.css";
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";
import Buy from "./Components/Buy";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Buy />
      <Footer />
    </div>
  );
}

export default App;
