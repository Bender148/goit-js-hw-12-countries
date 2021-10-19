import refs from './refs.js';
import countriesListTpl from '../templates/countries-list.hbs';
import oneCountryTpl from '../templates/one-country.hbs';
import debounce from 'lodash.debounce';
import showError from './error-notification.js';
import fetchCountries from './fetchCountries.js';


// Добавляем слушатель события на элемент ввода запроса.
refs.inputRef.addEventListener('input', debounce(onSearch, 500));

// Функция, которая "разыгрывает сценарий" при вводе запроса в инпут
function onSearch() {
  // Получаем сам запрос, введенный в инпут
  const searchQuery = getSearchQuery();

  // Если запрос пустая строка, ничего не делаем
  if (!searchQuery) {
    return;
  }

  // Отправляем запрос на Rest Countries API
  fetchCountries(searchQuery)
    .then(data => {
      refs.containerRef.innerHTML = '';
      if (data.length > 10) {
        return showError(
          'Too many mathces found. Please enter a more specific query.',
        );
      }
      else if (data.length > 1 && data.length <= 10) {
        renderCountriesList(data);
      }
      else {
        renderOneCountry(data);
      }
    }) // Здесь обрабатываются ошибки. Если ошибка 404, показыаем уведомление, что соответствия не были найдены
    .catch(error => {
      if (error === 404) {
        showError('No matches were found! Check your spelling.');
      } else {
        showError('Oops! Something went wrong. Try again.');
      }
    });
}

// Функция, которая получает запрос, введенный в инпут
function getSearchQuery() {
  return refs.inputRef.value;
}

// Функция, которая рендерит карточку для одной страны
function renderOneCountry(data) {
  const oneCountryMarkup = oneCountryTpl(data);
  refs.containerRef.insertAdjacentHTML('beforeend', oneCountryMarkup);
}

// Функция, которая рендерит список стран
function renderCountriesList(data) {
  const countriesListMarkup = countriesListTpl(data);
  refs.containerRef.insertAdjacentHTML('beforeend', countriesListMarkup);
}