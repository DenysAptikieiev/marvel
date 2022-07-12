import React, { Component } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import MarvelServices from "../../services/MarvelServices";
import { Spinner } from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import cn from "classnames";

class CharList extends Component {
  state = {
    charters: [],
    loading: true,
    error: false,
    newItemsListLoading: false,
    offset: 9,
    charEnded: false,
  };

  componentDidMount() {
    this.requestCharters();
  }

  marvelServices = new MarvelServices();

  onChartersLoaded = (newCharlist) => {
    if (newCharlist.length < 9) this.setState({ charEnded: true });

    this.setState(({ offset, charters: prewCharList }) => ({
      charters: [...prewCharList, ...newCharlist],
      loading: false,
      error: false,
      newItemsListLoading: false,
      offset: offset + 9,
    }));
  };

  onCharterNewListLoading = () => {
    this.setState({
      newItemsListLoading: true,
    });
  };

  onError = () =>
    this.setState({
      loading: false,
      error: true,
    });

  requestCharters = (offset) => {
    this.onCharterNewListLoading();
    this.marvelServices
      .getAllCharacters(offset)
      .then(this.onChartersLoaded)
      .catch((error) => this.onError("Error", error));
  };

  render() {
    const { charters, loading, error, offset, newItemsListLoading, charEnded } =
      this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View charters={charters} onCharSelected={this.props.onCharSelected} />
    ) : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spiner}
        {content}
        <button
          className={cn("button button__main button__long", {
            button_hide: charEnded,
          })}
          disabled={newItemsListLoading}
          onClick={() => this.requestCharters(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ charters, onCharSelected }) => {
  return (
    <ul className="char__grid">
      {charters.map((item) => {
        const { thumbnail, name } = item;
        const noImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
       
        return (
          <li
            key={item.id}
            className="char__item"
            onClick={() => onCharSelected(item.id)}
          >
            <img 
            className={cn({'contain' : (thumbnail === noImage)})} 
            src={thumbnail} alt={name} 
            />
            <div className="char__name">{item.name || "No name"}</div>
          </li>
        );
      })}
    </ul>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
