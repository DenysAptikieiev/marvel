import {useHttp} from '../hooks/http.hook'

const useMarvelServices = () => {
  const {loading, request, error, clearError} = useHttp()

  const _apiBase = `https://gateway.marvel.com:443/v1/public`;
  const _apiKey = `apikey=b514560b8c10018c31183a7911388f1f`;
  const _baseOffset = 210;

  
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].wiki,
      comics: char.comics.items,
    };
  };
  
  return {loading, error, getAllCharacters, getCharacter, clearError}
};

export default useMarvelServices;