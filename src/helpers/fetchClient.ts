/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://codebender-catalog.onrender.com';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// function wait(delay: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
