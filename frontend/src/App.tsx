import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './views/Home';
import Footer from './components/Footer';

interface AppProps {
  View: React.FC;
}

const  App : React.FC<AppProps> = ({View}) => {
  
  useEffect(() => {
    document.title = 'IPS IHM';
  }, []);

  return (
    <>
      <View/>
    </>
  )
}

export default App;
