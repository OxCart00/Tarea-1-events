import { fetchData } from "./modules/fetch.js";
import { buildGrid } from "./modules/grids.js";

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
  });
  card.appendChild(link1);

  // Aquí puedes agregar la lógica adicional para el evento 'Interested'
  // ...
}

// Función para el evento 'Going'
export function handleGoing(event) {
  const goingBtn = event.target;
  const interestedBtn = goingBtn.previousSibling;
  const card = goingBtn.parentNode;

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
  });
  card.appendChild(link);

  // Aquí puedes agregar la lógica adicional para el evento 'Going'
  // ...
}