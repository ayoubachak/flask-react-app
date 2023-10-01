import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './views/Home';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header/>
      <Home/>
      <Footer/>
    </>
  );
}

export default App;
