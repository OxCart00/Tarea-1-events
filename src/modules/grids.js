import { handleInterested, handleGoing } from '../events.js';

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
    interested.addEventListener('click', handleInterested);

    const going = document.createElement('button');
    going.textContent = 'Going';
    going.addEventListener('click', handleGoing);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(location);
    card.appendChild(price);
    card.appendChild(interested);
    card.appendChild(going);
    temp.appendChild(card);
  });
  grid.appendChild(temp);
}

function dateSet(dateStamp) {
  // Crear una instancia de Date utilizando el timestamp
  const date = new Date(dateStamp);

  // Días de la semana
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Meses
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Obtener los componentes de la fecha
  const weekDay = week[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';

  // Formatear la hora
  const setHour = hour > 12 ? hour - 12 : hour;
  const setMin = min.toString().padStart(2, '0');

  // Formatear la fecha y hora como una cadena legible para el usuario
  const setDate = `${weekDay}, ${month} ${day}, ${setHour}:${setMin} ${period}`;

  // Mostrar la fecha y hora al usuario
  return setDate;
}

function locationSet(locationInfo) {
  const location = `${locationInfo.address} • ${locationInfo.city}, ${locationInfo.state}`
  return location;
}

function priceSet(priceInfo) {
  if (priceInfo != 0) {
    if (Number.isInteger(priceInfo)) {
      const price = `$${priceInfo}.00`;
      return price;
    }else{
      const price = `$${priceInfo}`;
      return price
    }
  }else{
    return "Free";
  }
}