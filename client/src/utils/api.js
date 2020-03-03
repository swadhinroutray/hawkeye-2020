export const get = (url) => fetch(url).then(res => res.json());

export const post = (url, body) =>
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}).then(res => res.json());
