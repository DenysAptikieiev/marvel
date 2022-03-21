import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelServices from "./services/MarvelServices";
import './style/style.scss';
const marvelServices = new MarvelServices()

marvelServices.getAllCharacters()
  .then(data => data.data.results.forEach(item => {
    console.log(item.name)
  }));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

