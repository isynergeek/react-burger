export const getIngredients = () => {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  return fetch(url).then(response => {
      if (response.ok) {
          return response.json();
      }
      return new Error(`Ошибка запроса: ${url}`);
  })
      .catch(error => error);
}
