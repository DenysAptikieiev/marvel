import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import useMarvelServices from "../../services/MarvelServices";
import { Spinner } from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import cn from "classnames";

const CharList = (props) => {

  const [charters, setCharters] = useState([])
  const [newItemsListLoading, setNewItemsListLoading] = useState(false)
  const [offset, setOffset] = useState(9)
  const [charEnded, setCharEnded] = useState(false)

  useEffect(() => {
    requestCharters(offset, true);
    // eslint-disable-next-line
  }, [])

  const { loading, error, getAllCharacters } = useMarvelServices();

  const requestCharters = (offset, initial) => {
    initial ? onCharterNewListLoading(false) : onCharterNewListLoading(true);
    getAllCharacters(offset)
      .then(onChartersLoaded)
  };

  const onChartersLoaded = (newCharlist) => {
    if (newCharlist.length < 9) setCharEnded(true);

    setCharters(charters => [...charters, ...newCharlist])
    setNewItemsListLoading(false)
    setOffset(offset => offset + 9)
  };

  const onCharterNewListLoading = () => {
    setNewItemsListLoading(true)
  };


  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  function renderItems(arr) {
    const items = arr.map((item, index) => {
      let imgStyle = { 'objectFit': 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' }
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={el => itemRefs.current[index] = el}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id)
            focusOnItem(index)
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(index);
            }
          }}
        >
          <img
            style={imgStyle}
            src={item.thumbnail} alt={item.name}
          />
          <div className="char__name">{item.name || "No name"}</div>
        </li>
      );
    });
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(charters)

  const errorMessage = error ? <ErrorMessage /> : null;
  const spiner = loading && !newItemsListLoading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spiner}
      {items}
      <button
        className={cn("button button__main button__long", {
          button_hide: charEnded,
        })}
        disabled={newItemsListLoading}
        onClick={() => requestCharters(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
