export const get = url =>
	fetch(url, {
		method: 'GET',
		credentials: 'include',
	}).then(res => res.json());

export const post = (url, body) =>
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(body),
	}).then(res => res.json());
