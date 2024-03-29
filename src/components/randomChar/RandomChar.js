import React, { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelServices from "../../services/MarvelServices";
import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const RandomChar = () => {

  const [char, setChar] = useState({});

  const {loading, error, getCharacter, clearError} = useMarvelServices();

  useEffect(() => {
    updateChar();
    //eslint-disable-next-line
  }, [])

  const onCharLoaded = char => {
    setChar(char);
  }

  const updateChar = () => {
    clearError()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
  }


  const errorMessage = error ? <ErrorMessage /> : null;
  const spiner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      <div className="randomchar__block">
        {errorMessage}
        {spiner}
        {content}
      </div>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  )
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char
  const notFound = thumbnail?.split('/').findIndex(item => item === "image_not_available.jpg");
  return (
    <>
      <img src={thumbnail} alt={name} className={notFound !== -1 ? "randomchar__not_found_img" : "randomchar__img"} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name || 'No name'}</p>
        <p className="randomchar__descr">
          {description || 'No description'}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main" target='_blank' rel="noopener noreferrer">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </>
  )
};

export default RandomChar;