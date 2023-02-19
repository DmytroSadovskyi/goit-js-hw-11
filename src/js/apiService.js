import axios from 'axios';

const API_KEY = '33729128-9c007b81ac695147ac964a843';
const BASE_URL = 'https://pixabay.com/api/';
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    const url = `${BASE_URL}?key=${API_KEY}q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    return fetch(url)
      .then(response => response.json())
      .then(({ photos }) => {
        this.incrementPage();
        return photos;
      });
  }

  incrementPage() {
    this.page += 1;
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
