class MarvelServices {
  _apiBase = `https://gateway.marvel.com:443/v1/public`;
  _apiKey = `apikey=b514560b8c10018c31183a7911388f1f`;
  _baseOffset = 210;

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    return res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?&${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
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
};

export default MarvelServices;