import Header from '../static/header/Header';
import Footer from '../static/footer/Footer';
import '@axa-ch/input-text';
import '@axa-ch/button';
import '@axa-ch/modal';
import './App.css';
import { useState } from 'react';

function App() {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="app">
      <Header></Header>
      <div className="pipa-app">
        <div className='pipa-app__container'>
          <div className='pipa-app__container-search'>
            <div className='pipa-app__container-search__item'>
              <axa-input-text label="App-ID" placeholder="enter App-ID..."></axa-input-text>
            </div>
            <div className='pipa-app__container-search__item'>
              <axa-input-text label="Context" placeholder="enter Context..."></axa-input-text>
            </div>
            <div className='pipa-app__container-search__item'>
              <axa-input-text label="Text-ID" placeholder="enter Text-ID..."></axa-input-text>
            </div>
            <div className='pipa-app__container-search__item'>
              <axa-input-text label="Stage" placeholder="enter Stage..."></axa-input-text>
            </div>
            <div className='pipa-app__container-search__item' style={{marginTop:"34px"}}>
              <axa-button type="button" icon="search">search</axa-button>
            </div>
            <div className='pipa-app__container-search__item' style={{marginTop:"34px"}}>
              <axa-button variant="red" onClick={() => setModalOpen(!isModalOpen)}>add Translation</axa-button>
              <axa-modal open={isModalOpen}></axa-modal>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
