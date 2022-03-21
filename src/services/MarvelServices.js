class MarvelServices {
  _apiBase = `https://gateway.marvel.com:443/v1/public`;
  _apiKey = `apikey=b514560b8c10018c31183a7911388f1f`;
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    return res.json();
  }
  getAllCharacters = async () => {
    const apiBase = this._apiBase;
    const apiKey = this._apiKey;
    return await this.getResource(`${apiBase}/characters?limit=9&offset=210&${apiKey}`);
  }
  getCharacter = async (id) => {
    const apiBase = this._apiBase;
    const apiKey = this._apiKey;
    return await this.getResource(`${apiBase}/characters/${id}?&${apiKey}`);
  }
};

export default MarvelServices;