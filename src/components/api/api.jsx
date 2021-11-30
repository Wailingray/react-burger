export const apiConfig = {
  apiUrl : `https://norma.nomoreparties.space/api`,
  headers: {
    'Content-Type': 'application/json'
  }
}
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getData = () => {
  return fetch(`${apiConfig.apiUrl}/ingredients`, {
    headers: apiConfig.headers
  }).then(getResponse);
}

export const submitOrder = (ArrayOfIds) => {
  return fetch(`${apiConfig.apiUrl}/orders`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      ingredients: ArrayOfIds
    })
  }).then(getResponse);
}
