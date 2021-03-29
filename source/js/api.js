const Urls = {
  GET: 'https://22.javascript.pages.academy/kekstagram/data',
  POST: 'https://22.javascript.pages.academy/kekstagram',
}

const request = (onSuccess, onError, method, data) => {
  return fetch(
    Urls[method],
    {
      method: method,
      body: data,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data)
    }).catch(() => {
      onError()
    });
}

export { request };
