import axios from 'axios';
import Planet from '../interfaces/Planet';

async function fetchPlanets(query: string): Promise<Planet[]> {
  let apiUrl: string = 'https://swapi.dev/api/planets/';
  if (query) {
    apiUrl = `https://swapi.dev/api/planets/?search=${query}`;
  }
  // Отправка запроса к API SWAPI
  const response = await axios.get(apiUrl);
  // Получение данных из ответа
  const planets: Planet[] = response.data.results;
  return planets;
}

export default fetchPlanets;
