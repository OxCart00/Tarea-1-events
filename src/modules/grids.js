import { handleInterested, handleGoing, handleFavorite } from '../events.js';
import { dateSet, locationSet, priceSet } from './card__info__format.js';


export function buildGrid(data) {
  const grid = document.getElementById('grid');
  grid.textContent = ``;
  let temp = new DocumentFragment;

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.image;

    const title = document.createElement('h3');
    title.textContent = item.title;

    const date = document.createElement('p');
    date.textContent = dateSet(item.date);
    date.className = 'date';

    const location = document.createElement('p');
    location.textContent = locationSet(item.location);
    location.className = 'location';

    const price = document.createElement('p');
    price.textContent = priceSet(item.price);
    price.className = 'price';

    const interested = document.createElement('button');
    interested.textContent = 'Interested';
    interested.id = item.id;
    interested.addEventListener('click', handleInterested);

    const going = document.createElement('button');
    going.textContent = 'Going';
    going.id = item.id;
    going.addEventListener('click', handleGoing);

    const favorite = document.createElement('button');
    favorite.textContent = 'Favorite';
    favorite.id = item.id;
    favorite.addEventListener('click', handleFavorite);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(location);
    card.appendChild(price);
    card.appendChild(interested);
    card.appendChild(going);
    card.appendChild(favorite);
    temp.appendChild(card);
  });
  grid.appendChild(temp);
}

export function buildViewGrid(data) {
  const grid = document.getElementById('grid');
  grid.textContent = ``;
  let temp = new DocumentFragment;

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.image;

    const title = document.createElement('h3');
    title.textContent = item.title;

    const date = document.createElement('p');
    date.textContent = dateSet(item.date);
    date.className = 'date';

    const location = document.createElement('p');
    location.textContent = locationSet(item.location);
    location.className = 'location';

    const price = document.createElement('p');
    price.textContent = priceSet(item.price);
    price.className = 'price';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(location);
    card.appendChild(price);
    temp.appendChild(card);
  });
  grid.appendChild(temp);
}

