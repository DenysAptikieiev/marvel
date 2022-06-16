import { Component } from 'react';

import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import MarvelServices from "../../services/MarvelServices";

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) this.updateChar();
    }

    onCharLoaded = char => {
        this.setState({
            char,
            loading: false,
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) return;

        this.onCharLoading();

        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;
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
}

const View = ({ char }) => {
    const { description, homepage, comics, name, thumbnail, wiki } = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
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
                {comics.map((item, index) => (
                    <li key={index} className="char__comics-item">
                        {item.name}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CharInfo;