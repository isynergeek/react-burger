const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
  return fetch(BASE_URL).then(response => {
      if (response.ok) {
          return response.json();
      }
      return new Error(`Ошибка запроса: ${BASE_URL}`);
  })
      .catch(error => error);
}
