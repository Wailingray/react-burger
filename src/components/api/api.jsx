export const apiUrl = `https://norma.nomoreparties.space/api/ingredients`;

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getData = () => {
  return fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(getResponse);
}
