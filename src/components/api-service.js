import axios from 'axios';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '33729128-9c007b81ac695147ac964a843';
    const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    try {
      const response = await axios.get(url);
      this.page += 1;
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
