// const calendarModule = (function() {
//   const months = [
//     "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
//     "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
//   ];

//   function getMonthName(monthIndex) {
//     return months[monthIndex];
//   }

//   function getNumberOfDays(year, monthIndex) {
//     return new Date(year, monthIndex + 1, 0).getDate();
//   }

//   let currentYear = new Date().getFullYear();
//   let currentMonth = new Date().getMonth();

//   const calendarContainer = document.createElement('div');
//   calendarContainer.id = 'calendar-container';

//   function displayCalendar(year, monthIndex) {
//     const monthName = getMonthName(monthIndex);
//     const numberOfDays = getNumberOfDays(year, monthIndex);

//     calendarContainer.innerHTML = `Calendario ${monthName} ${year}:`;

//     const prevButton = document.createElement('button');
//     prevButton.id = 'prev-button';
//     prevButton.textContent = 'Previous';

//     const nextButton = document.createElement('button');
//     nextButton.id = 'next-button';
//     nextButton.textContent = 'Next';

//     calendarContainer.appendChild(prevButton);
//     calendarContainer.appendChild(nextButton);

//     for (let day = 1; day <= numberOfDays; day++) {
//       const card = document.createElement('div');

//       const dayElement = document.createElement('div');
//       dayElement.textContent = day;
//       dayElement.classList.add('day');

//       card.appendChild(dayElement);
//       calendarContainer.appendChild(card);
//     }

//     prevButton.addEventListener('click', goToPreviousMonth);
//     nextButton.addEventListener('click', goToNextMonth);
//   }

//   function goToPreviousMonth() {
//     currentMonth--;
//     if (currentMonth < 0) {
//       currentMonth = 11;
//       currentYear--;
//     }
//     displayCalendar(currentYear, currentMonth);
//   }

//   function goToNextMonth() {
//     currentMonth++;
//     if (currentMonth > 11) {
//       currentMonth = 0;
//       currentYear++;
//     }
//     displayCalendar(currentYear, currentMonth);
//   }

//   Insertar el elemento calendarContainer en el documento
//   document.body.appendChild(calendarContainer);

//   displayCalendar(currentYear, currentMonth);

//   return {
//     displayCalendar,
//     getMonthName,
//     getNumberOfDays
//   };
// })();

// export default calendarModule;

import LocalStorageManager from './singleton__pattern.js';

const localStorageManager = new LocalStorageManager();
let calendarEvents = [];


let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let monthTitle = document.querySelector('.current-month-title');

export function initializeCalendar() {
  const gridContainer = document.querySelector("#grid");
  gridContainer.style.display = "none";
  calendarEvents = [];
  calendarEvents.push(...localStorageManager.getItem('Favorite'), ...localStorageManager.getItem('Going'), ...localStorageManager.getItem('Interested'));
  console.log(calendarEvents);
  const calendarContainer = document.querySelector(".calendar");
  calendarContainer.style.display = "block";

  const grid = document.getElementById('grid');
  grid.textContent = ``;

  // Vaciar el contenido del contenedor de días
  const daysContainer = document.getElementById("calendar-days");
  daysContainer.innerHTML = "";

  // Obtener el año y mes actual
  currentYear = currentDate.getFullYear();
  currentMonth = currentDate.getMonth();

  monthTitle.textContent = getCurrentMonthName();

  // Obtener el primer día del mes y el número de días en el mes actual
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  // Crear los elementos de día para cada día del mes
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    // Resaltar el día actual
    if (currentDate.getDate() === i && currentDate.getMonth() === currentMonth) {
      dayElement.classList.add("current-day");
    }

    // Buscar eventos para este día
    const eventsForDay = findEventsForDay(i, calendarEvents);
    if (eventsForDay.length > 0) {
      eventsForDay.forEach(event => {
        const eventElement = document.createElement("p");
        eventElement.classList.add("event");
        eventElement.textContent = event.title;
        dayElement.appendChild(eventElement);
      });
    }

    daysContainer.appendChild(dayElement);
  }
}

export function showPreviousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  monthTitle.textContent = getCurrentMonthName();
  updateCalendar();
}

export function showNextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  monthTitle.textContent = getCurrentMonthName();
  updateCalendar();
}

function updateCalendar() {
  // Vaciar el contenido del contenedor de días
  const daysContainer = document.getElementById("calendar-days");
  daysContainer.innerHTML = "";
  
  calendarEvents = [];
  calendarEvents.push(...localStorageManager.getItem('Favorite'), ...localStorageManager.getItem('Going'), ...localStorageManager.getItem('Interested'));


  // Obtener el primer día del mes y el número de días en el mes actual
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  // Crear los elementos de día para cada día del mes
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    // Resaltar el día actual
    if (currentDate.getDate() === i && currentDate.getMonth() === currentMonth) {
      dayElement.classList.add("current-day");
    }

    // Buscar eventos para este día
    const eventsForDay = findEventsForDay(i, calendarEvents);
    if (eventsForDay.length > 0) {
      eventsForDay.forEach(event => {
        const eventElement = document.createElement("p");
        eventElement.classList.add("event");
        eventElement.textContent = event.title;
        dayElement.appendChild(eventElement);
      });
    }

    daysContainer.appendChild(dayElement);
  }
}

function getCurrentMonthName() {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return months[currentMonth];
}

function findEventsForDay(day, eventList) {
  const eventsForDay = eventList.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day && eventDate.getMonth() === currentMonth;
  });
  return eventsForDay;
}