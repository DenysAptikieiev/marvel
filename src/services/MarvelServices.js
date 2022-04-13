class MarvelServices {
  _apiBase = `https://gateway.marvel.com:443/v1/public`;
  _apiKey = `apikey=b514560b8c10018c31183a7911388f1f`;
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    return res.json();
  };
  getAllCharacters = async () => {
    const apiBase = this._apiBase;
    const apiKey = this._apiKey;
    const res = await this.getResource(`${apiBase}/characters?limit=9&offset=210&${apiKey}`);
    return res.data.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const apiBase = this._apiBase;
    const apiKey = this._apiKey;
    const res = await this.getResource(`${apiBase}/characters/${id}?&${apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };
  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].wiki,
    };
  };
};

export default MarvelServices;