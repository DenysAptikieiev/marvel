import React, { Component } from 'react';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import cn from 'classnames';


class CharList extends Component {

    state = {
        charters: [],
        loading: true,
        error: false,
        newItemsListLoading: false,
        offset: 9,
        charEnded: false,
    }

    componentDidMount() {
        this.requestCharters()
    }


    marvelServices = new MarvelServices();

    onChartersLoaded = (newCharlist) => {
        if(newCharlist.length < 9) this.setState({charEnded: true});

        this.setState(({ offset, charters: prewCharList }) => ({
            charters: [...prewCharList, ...newCharlist],
            loading: false,
            error: false,
            newItemsListLoading: false,
            offset: offset + 9,
        }))
    }

    onCharterNewListLoading = () => {
        this.setState({
            newItemsListLoading: true
        })
    }

    onError = () => this.setState({
        loading: false,
        error: true,
    })

    requestCharters = (offset) => {
        this.onCharterNewListLoading();
        this.marvelServices.getAllCharacters(offset)
            .then(this.onChartersLoaded)
            .catch(error => this.onError("Error", error));
    }

    render() {
        const { charters, loading, error, offset, newItemsListLoading, charEnded } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spiner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View charters={charters} onCharSelected={this.props.onCharSelected} /> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spiner}
                {content}
                <button
                    className={cn("button button__main button__long", {'button_hide' : charEnded})}
                    disabled={newItemsListLoading}
                    onClick={() => this.requestCharters(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
};

const View = ({ charters, onCharSelected }) => {
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