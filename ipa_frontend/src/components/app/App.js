import Header from '../static/header/Header';
import Footer from '../static/footer/Footer';
import '@axa-ch/input-text';
import '@axa-ch/button';
import '@axa-ch/modal';
import '@axa-ch/heading';
import '@axa-ch/table';
import './App.scss';
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
            </div>
          </div>
          <div className='pipa-app__container-table'>
            <axa-table innerscroll="500">
            <table class="any-for-test">
              <thead>
                <tr>
                  <th>App-ID</th>
                  <th>Context</th>
                  <th>Stage</th>
                  <th>German</th>
                  <th>French</th>
                  <th>Italian</th>
                  <th>English</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Body 1</td>
                  <td class="o-table--light">Longer Body 2</td>
                  <td class="o-table--bold">Super Long Body 3</td>
                </tr>
                <tr>
                  <td>Body A1 AA</td>
                  <td class="o-table--light">Longer Body A2</td>
                  <td class="o-table--bold">Super Long Body A3</td>
                </tr>
                <tr>
                  <td>Body B1</td>
                  <td class="o-table--light">Longer Body B2</td>
                  <td class="o-table--bold">Super Long Body B3</td>
                </tr>
              </tbody>
            </table>
            </axa-table>
          </div>
          <axa-modal open={isModalOpen}>
            <div className='pipa-app__container-modal'>
              <axa-heading rank="4">Add Translation</axa-heading>
              <axa-input-text label="App-ID" placeholder="enter App-ID..."></axa-input-text>
              <axa-input-text label="Context" placeholder="enter Context..."></axa-input-text>
              <axa-input-text label="Text-ID" placeholder="enter Text-ID..."></axa-input-text>
              <axa-input-text label="Stage" placeholder="enter Stage..."></axa-input-text>
              <div className='pipa-app__container-modal__buttons'>
                <axa-button variant="red" onClick={() => setModalOpen(!isModalOpen)}>cancel</axa-button>
                <axa-button>submit</axa-button>
              </div>
            </div>
          </axa-modal>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
