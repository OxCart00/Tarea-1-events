import { fetchData } from "./modules/fetch.js";
import { buildGrid } from "./modules/grids.js";
import LocalStorageManager from './modules/singleton__pattern.js';

const localStorageManager = new LocalStorageManager();

let localStorageProxy = new Proxy(localStorage, {
  set: function (target, key, value) {
    // Convierte el valor a una cadena antes de guardarlo en el almacenamiento local
    target.setItem(key, JSON.stringify(value));
    return true;
  },
  get: function (target, key) {
    // Obtén el valor del almacenamiento local y conviértelo a su tipo original
    const value = target.getItem(key);
    return value ? JSON.parse(value) : null;
  }
});

export async function storageInfo(API_URL, id) {
  const cachedDataString = localStorageProxy[id];

  if (cachedDataString) {
    buildGrid(localStorageProxy[id]);
  }else{
    const data = await fetchData(API_URL);
    localStorageProxy[id] = data;
    buildGrid(localStorageProxy[id]);
  }
};


// Función para el evento 'Interested'
export function handleInterested(event) {
  const interestedBtn = event.target;
  const card = interestedBtn.parentNode;
  const goingBtn = interestedBtn.previousSibling;

  const interestedList = localStorageManager.getItem('Interested')
  const key = document.querySelector('.active').id;
  const eventId = event.target.id;
  const events = localStorageManager.getItem(key);
  const selectedEvent = events.find(element => element.id === eventId);

  interestedBtn.remove();

  const message = document.createElement('p');
  message.textContent = 'You are interested in going.';
  card.appendChild(message);

  const link1 = document.createElement('a');
  link1.textContent = 'Changed your mind?';
  link1.href = '#';
  link1.addEventListener('click', function(e) {
    e.preventDefault();
    card.removeChild(message);
    card.removeChild(link1);
    card.appendChild(interestedBtn);
    card.appendChild(goingBtn);
    const temp = interestedList.filter(element => element.id !== eventId);
    localStorageManager.setItem('Interested',temp);
  });
  card.appendChild(link1);

  // Aquí puedes agregar la lógica adicional para el evento 'Interested'

  interestedList.push(selectedEvent);
  localStorageManager.setItem('Interested', interestedList);
  // ...
}

// Función para el evento 'Going'
export function handleGoing(event) {
  const goingBtn = event.target;
  const interestedBtn = goingBtn.previousSibling;
  const card = goingBtn.parentNode;

  const goingList = localStorageManager.getItem('Going')
  const key = document.querySelector('.active').id;
  const eventId = event.target.id;
  const events = localStorageManager.getItem(key);
  const selectedEvent = events.find(element => element.id === eventId);

  goingBtn.remove();
  interestedBtn.remove(); // Eliminar el botón 'Interested'

  const message = document.createElement('p');
  message.textContent = 'You are going to this event';
  card.appendChild(message);

  const link = document.createElement('a');
  link.textContent = 'Changed your mind?';
  link.href = '#';
  link.addEventListener('click', function(e) {
    e.preventDefault();
    card.removeChild(message);
    card.removeChild(link);
    card.appendChild(interestedBtn);
    card.appendChild(goingBtn);
    const temp = goingList.filter(element => element.id !== eventId);
    localStorageManager.setItem('Going',temp);
  });
  card.appendChild(link);

  // Aquí puedes agregar la lógica adicional para el evento 'Going'

  goingList.push(selectedEvent);
  localStorageManager.setItem('Going', goingList);

  // ...
}

// Función para el evento 'Going'
export function handleFavorite(event) {
  const favoriteBtn = event.target;
  const card = favoriteBtn.parentNode;

  const favoriteList = localStorageManager.getItem('Favorite')
  const key = document.querySelector('.active').id;
  const eventId = event.target.id;
  const events = localStorageManager.getItem(key);
  const selectedEvent = events.find(element => element.id === eventId);

  favoriteBtn.remove();

  const message = document.createElement('p');
  message.textContent = 'You love this event';
  card.appendChild(message);

  const link = document.createElement('a');
  link.textContent = 'Changed your mind?';
  link.href = '#';
  link.addEventListener('click', function(e) {
    e.preventDefault();
    card.removeChild(message);
    card.removeChild(link);
    card.appendChild(favoriteBtn);
    const temp = favoriteList.filter(element => element.id !== eventId);
    localStorageManager.setItem('Favorite',temp);
  });
  card.appendChild(link);

  // Aquí puedes agregar la lógica adicional para el evento 'Going'

  favoriteList.push(selectedEvent);
  localStorageManager.setItem('Favorite', favoriteList);

  // ...
}
