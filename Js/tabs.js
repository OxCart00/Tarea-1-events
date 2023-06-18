export function createTabs() {
  let categories = [
    { name: 'Music', href: '#music' },
    { name: 'Sports', href: '#sports' },
    { name: 'Business', href: '#business' },
    { name: 'Food', href: '#food' },
    { name: 'Art', href: '#art' }
  ];

  let ulElement = document.createElement('ul');
  ulElement.classList.add('tabs');

  categories.forEach(function(category) {
    let liElement = document.createElement('li');
    let aElement = document.createElement('a');
    aElement.setAttribute('href', category.href);
    aElement.appendChild(document.createTextNode(category.name));

    let buttonElement = document.createElement('button');
    buttonElement.setAttribute('type', 'button');
    buttonElement.appendChild(aElement);

    liElement.appendChild(buttonElement);
    ulElement.appendChild(liElement);
  });

  let tabsContainer = document.getElementById('tabsContainer');
  tabsContainer.appendChild(ulElement);
}