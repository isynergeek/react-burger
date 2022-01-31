const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export const getIngredients = () => {
    return fetch(BASE_URL).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Ошибка запроса: ${BASE_URL}`);
    })
}

export const makeOrder = (ingredients: (string | undefined)[]) => {
    return fetch(ORDER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ingredients})
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Ошибка запроса: ${ORDER_URL}`);
    })
}

