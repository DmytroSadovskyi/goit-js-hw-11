import './css/styles.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ImagesApiService from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' });
const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (!imagesApiService.query) {
    return Notify.info('Please write something');
  }
  loadMoreBtn.show();
  clearGallery();
  imagesApiService.resetPage();
  fetchImage();
  refs.searchForm.reset();
}

function fetchImage() {
  loadMoreBtn.hide();
  imagesApiService.fetchImages().then(({ data }) => {
    const currentPage = imagesApiService.page - 1;

    if (data.total === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderImages(data);
    onPageScroll();
    loadMoreBtn.show();
    lightBox.refresh();
    const { totalHits } = data;
    if (refs.gallery.children.length === totalHits) {
      loadMoreBtn.hide();
      Notify.failure(
        "We're sorry, but you've reached the end of search results"
      );
      return;
    }
    if (currentPage === 1) {
      Notify.success(`Hooray we found ${totalHits} images`);
    }
  });
}

function onLoadMore() {
  fetchImage();
}

function renderImages({ hits }) {
  const imagesMarkup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div></a>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onPageScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
