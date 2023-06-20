import { fetchData } from "../Js/fetch.js";
import { buildGrid } from "../Js/grids.js";

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
    console.log(localStorageProxy[id]);
    buildGrid(localStorageProxy[id]);
  }else{
    const data = await fetchData(API_URL);
    localStorageProxy[id] = data;
    buildGrid(localStorageProxy[id]);
  }
};

