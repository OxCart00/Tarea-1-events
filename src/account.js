import { createTabs, changeColor } from '../src/modules/tabs.js';
import { yourEvents } from '../src/settings.js';
import { buildViewGrid } from './modules/grids.js';
import LocalStorageManager from './modules/singleton__pattern.js';
import { initializeCalendar, showPreviousMonth, showNextMonth } from './modules/calendar.js';

document.getElementById('overlay').onclick = function () {
  const overlay = document.getElementById("overlay");
  const card = document.querySelector(".hidden__card");
  overlay.style.display = "none";
  card.style.display = "none";
}

const localStorageManager = new LocalStorageManager();

createTabs(yourEvents);
changeColor(0);
buildViewGrid(localStorageManager.getItem('Favorite'));

const tabButtons = document.querySelectorAll('.tabButton');

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', async function (event) {
    changeColor(index);
    if (element.id !== 'Calendar') {
      buildViewGrid(localStorageManager.getItem(event.target.id));
    }
  });
});

const calendarButton = document.getElementById('Calendar');
calendarButton.addEventListener('click', initializeCalendar);

document.getElementById("prev-month-btn").addEventListener("click", showPreviousMonth);
document.getElementById("next-month-btn").addEventListener("click", showNextMonth);



// document.addEventListener('DOMContentLoaded', () => {
//   const prevButton = document.querySelector('#prev-button');
//   const nextButton = document.querySelector('#next-button');
//   const tabButton = document.querySelector('.tabButton#Calendar');
//   const calendarContainer = document.getElementById('calendar-container');
//   const buttons = document.querySelectorAll('.tabButton');

//   let currentYear = new Date().getFullYear();
//   let currentMonth = new Date().getMonth();

//   function updateCalendar() {
//     calendarModule.displayCalendar(currentYear, currentMonth);
//   }

//   function openCalendar() {
//     calendarContainer.style.display = 'block';
//     updateCalendar();
//   }

//   function closeCalendar() {
//     calendarContainer.style.display = 'none';
//   }

//   function goToPreviousMonth() {
//     currentMonth--;
//     if (currentMonth < 0) {
//       currentMonth = 11;
//       currentYear--;
//     }
//     updateCalendar();
//   }

//   function goToNextMonth() {
//     currentMonth++;
//     if (currentMonth > 11) {
//       currentMonth = 0;
//       currentYear++;
//     }
//     updateCalendar();
//   }

//   if (prevButton) {
//     prevButton.addEventListener('click', goToPreviousMonth);
//   }

//   if (nextButton) {
//     nextButton.addEventListener('click', goToNextMonth);
//   }

//   if (tabButton) {
//     tabButton.addEventListener('click', openCalendar);
//   }

//   buttons.forEach(button => {
//     if (button.id !== 'Calendar') {
//       button.addEventListener('click', closeCalendar);
//     }
//   });

//   updateCalendar();
// });



