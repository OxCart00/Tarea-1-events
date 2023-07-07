const calendarModule = (function() {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function getMonthName(monthIndex) {
    return months[monthIndex];
  }

  function getNumberOfDays(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  const calendarContainer = document.createElement('div');
  calendarContainer.id = 'calendar-container';

  function displayCalendar(year, monthIndex) {
    const monthName = getMonthName(monthIndex);
    const numberOfDays = getNumberOfDays(year, monthIndex);

    calendarContainer.innerHTML = `Calendario ${monthName} ${year}:`;

    const prevButton = document.createElement('button');
    prevButton.id = 'prev-button';
    prevButton.textContent = 'Previous';

    const nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.textContent = 'Next';

    calendarContainer.appendChild(prevButton);
    calendarContainer.appendChild(nextButton);

    for (let day = 1; day <= numberOfDays; day++) {
      const card = document.createElement('div');

      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.classList.add('day');

      card.appendChild(dayElement);
      calendarContainer.appendChild(card);
    }

    prevButton.addEventListener('click', goToPreviousMonth);
    nextButton.addEventListener('click', goToNextMonth);
  }

  function goToPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    displayCalendar(currentYear, currentMonth);
  }

  function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    displayCalendar(currentYear, currentMonth);
  }

  // Insertar el elemento calendarContainer en el documento
  document.body.appendChild(calendarContainer);

  displayCalendar(currentYear, currentMonth);

  return {
    displayCalendar,
    getMonthName,
    getNumberOfDays
  };
})();

export default calendarModule;