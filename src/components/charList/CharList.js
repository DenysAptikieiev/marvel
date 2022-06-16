import React, { Component } from 'react';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


class CharList extends Component {

    state = {
        charters: [],
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.requestCharters()
    }

    marvelServices = new MarvelServices();

    onChartersLoaded = charters => {
        this.setState({
            charters: charters,
            loading: false,
            error: false,
        })
    }

    onError = () => this.setState({
        loading: false,
        error: true,
    })

    requestCharters = () => {
        this.marvelServices.getAllCharacters()
            .then(this.onChartersLoaded)
            .catch(error => this.onError("Error", error))
    }

    render() {
        const { charters, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View charters={charters} onCharSelected={this.props.onCharSelected} /> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spiner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
};

const View = ({charters, onCharSelected}) => {
    return (
        <ul className="char__grid">
            {charters.map(item => (
                <li
                    key={item.id}
                    className="char__item"
                    onClick={() => onCharSelected(item.id)}
                >
                    <img src={item?.thumbnail} alt={item?.name} />
                    <div className="char__name">{item.name || "No name"}</div>
                </li>
            ))
            }
        </ul>
    )
}

export default CharList;