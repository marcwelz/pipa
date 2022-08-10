import Header from '../static/header/Header';
import Footer from '../static/footer/Footer';
import AXAModalReact from '../static/patternslib/AXAModalReact';
import '@axa-ch/input-text';
import '@axa-ch/button';
import '@axa-ch/heading';
import '@axa-ch/table';
import './App.scss';
import { useEffect, useState } from 'react';

function App() {
  const BASE_URL = "http://localhost:8080/translation"

  const [isModalCreateOpen, setModalCreateOpen] = useState(false)
  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false)
  const [translations, setTranslations] = useState([])
  const [newTranslationValue, setNewTranslationValues] = useState({});
  const [toUpdateTranslationValue, setToUpdateTranslationValue] = useState({});

  useEffect(() => {
    loadAllTranslations()
  }, [])

  function loadAllTranslations() {
    const requestOptions = {
      method: 'GET',
      headers: ({ 
          'Content-Type': 'application/json'
      })
    };

    fetch(BASE_URL, requestOptions)
    .then(response => response.json())
    .then(
        data => setTranslations(data)
    )
  }

  const handleCreateNewTranslation = (event) => {
    setNewTranslationValues(newTranslationValue => {
      return {...newTranslationValue, [event.target.name]: event.target.value};
    });
  }

  function handleSubmitCreateNewTranslation() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTranslationValue)

    };

    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(
        data => {
          console.log(data)
        }
      ).finally(() => {
        setModalCreateOpen(false)
        loadAllTranslations()
      })
  }

  function handleUpdateTranslationButton(e) {
    const tmpTranslationEntry = translations.find(tr => tr.id == e.target.id)
    setToUpdateTranslationValue(tmpTranslationEntry)
    setModalUpdateOpen(true)
  }

  function handleUpdateTranslationInput(event) {
    console.log("handleUpdateTranslationInput")
    setToUpdateTranslationValue(toUpdateTranslationValue => {
      return {...toUpdateTranslationValue, [event.target.name]: event.target.value};
    });
  }

  function handleSubmitUpdateTranslation() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toUpdateTranslationValue)
    };

    fetch(BASE_URL + "/" + toUpdateTranslationValue.id, requestOptions)
      .then(response => response.json())
      .then(
        data => {
          let tmpTranslations = translations.filter(tr => tr.id != toUpdateTranslationValue.id)
          tmpTranslations.push(data)
          setTranslations(tmpTranslations)
        }
      ).finally(() => {
        setModalUpdateOpen(false)
        setToUpdateTranslationValue({})
      })
  }

  function deleteTranslation(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: ({ 
          'Content-Type': 'application/json'
      })
    };

    fetch(BASE_URL + "/" + id, requestOptions)
    .finally(() => loadAllTranslations())
  }

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
              <axa-button variant="red" icon="add" onClick={() => setModalCreateOpen(!isModalCreateOpen)}>add Translation</axa-button>
            </div>
          </div>
          <div className='pipa-app__container-table'>
            <axa-table maxheight="1200" innerscroll="500">
            <table class="any-for-test">
              <thead>
                <tr>
                  <th>Text-ID</th>
                  <th>App-ID</th>
                  <th>Context</th>
                  <th>Stage</th>
                  <th>German</th>
                  <th>English</th>
                  <th>French</th>
                  <th>Italian</th>
                  <th>last Modified</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {translations.map(tr =>
                  <tr>
                    <td>{tr.textId.length > 14 ? split_at_index(tr.textId, (tr.textId.length / 2)): tr.textId}</td>
                    <td>{tr.appId}</td>
                    <td>{tr.content}</td>
                    <td>{tr.stage}</td>
                    <td>{tr.german}</td>
                    <td>{tr.english}</td>
                    <td>{tr.french}</td>
                    <td>{tr.italian}</td>
                    <td>{tr.lastModified}</td>
                    <td><axa-button id={tr.id} variant="default" onClick={e => handleUpdateTranslationButton(e)}>update</axa-button></td>
                    <td><axa-button variant="red" onClick={() => deleteTranslation(tr.id)}>delete</axa-button></td>
                  </tr>
                )}
              </tbody>
            </table>
            </axa-table>
          </div>
          <AXAModalReact open={isModalCreateOpen} small onClose={() => setModalCreateOpen(false)}>
            <div className='pipa-app__container-modal'>
              <axa-heading rank="4">Add Translation</axa-heading>
              <axa-input-text label="Text-ID" name="textId" placeholder="enter Text-ID..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="App-ID" name="appId" placeholder="enter App-ID..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="Context" name="content" placeholder="enter Context..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="Stage" name="stage" placeholder="enter Stage..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="German" name="german" placeholder="enter german text..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="English" name="english" placeholder="enter englisch text..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="French" name="french" placeholder="enter french text..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <axa-input-text label="Italian" name="italian" placeholder="enter italian text..." onKeyUp={e => handleCreateNewTranslation(e)}></axa-input-text>
              <div className='pipa-app__container-modal__buttons'>
                <axa-button variant="red" onClick={() => setModalCreateOpen(!isModalCreateOpen)}>cancel</axa-button>
                <axa-button onClick={() => handleSubmitCreateNewTranslation()}>submit</axa-button>
              </div>
            </div>
          </AXAModalReact>
          <AXAModalReact open={isModalUpdateOpen} small onClose={() => {
            setModalUpdateOpen(false)
            setToUpdateTranslationValue({})
            }}>
            <div className='pipa-app__container-modal'>
              <axa-heading rank="4">Update Translation</axa-heading>
              <axa-input-text 
                label="Text-ID" 
                name="textId" 
                placeholder="enter Text-ID..." 
                value={toUpdateTranslationValue.textId} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="App-ID" 
                name="appId" 
                placeholder="enter App-ID..." 
                value={toUpdateTranslationValue.appId} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="Context" 
                name="content" 
                placeholder="enter Context..." 
                value={toUpdateTranslationValue.content} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="Stage" 
                name="stage" 
                placeholder="enter Stage..." 
                value={toUpdateTranslationValue.stage} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="German" 
                name="german" 
                placeholder="enter german text..." 
                value={toUpdateTranslationValue.german} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="English" 
                name="english" 
                placeholder="enter englisch text..." 
                value={toUpdateTranslationValue.english} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="French" 
                name="french" 
                placeholder="enter french text..." 
                value={toUpdateTranslationValue.french} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <axa-input-text 
                label="Italian" 
                name="italian" 
                placeholder="enter italian text..." 
                value={toUpdateTranslationValue.italian} 
                onKeyUp={e => handleUpdateTranslationInput(e)}></axa-input-text>
              <div className='pipa-app__container-modal__buttons'>
                <axa-button variant="red" onClick={() => {
                  setModalUpdateOpen(false)
                  setToUpdateTranslationValue({})
                }}>cancel</axa-button>
                <axa-button onClick={() => handleSubmitUpdateTranslation()}>submit</axa-button>
              </div>
            </div>
          </AXAModalReact>
          <axa-button onClick={() => loadAllTranslations()}>refresh</axa-button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );

  function split_at_index(value, index) {
    return value.substring(0, index) + " " + value.substring(index);
  }
}

export default App;
