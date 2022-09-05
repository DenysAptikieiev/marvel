import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import useMarvelServices from "../../services/MarvelServices";

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelServices();

    useEffect(() => {
        updateChar();
    //eslint-disable-next-line
    }, [charId])


    const onCharLoaded = char => {
        setChar(char)
    }
    const onCharLoading = () => {
    }


    const updateChar = () => {
        clearError();
        if (!charId) return;

        onCharLoading();

        getCharacter(charId)
            .then(onCharLoaded)

    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spiner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { description, homepage, comics, name, thumbnail, wiki } = char;

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
    imgStyle = { 'objectFit': 'contain' }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {comics.map((item, index) => (
                    <li key={index} className="char__comics-item">
                        {item.name}
                    </li>
                ))}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;