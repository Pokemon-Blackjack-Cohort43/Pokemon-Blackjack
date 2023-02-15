import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import GameContainer from './components/GameContainer';
import Instructions from './components/Instructions';

function App() {
  return (
    <>
      <Header/>
      <Instructions />
      <GameContainer />
      <Footer/>
    </>
  );
}

export default App;
