const absoluteHost = "http://localhost:3000";

function add(value) {
	return fetch(absoluteHost, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title: value})
	}).then( e=>e.json() ).catch( ()=>({id: Math.floor(Math.random()*200000000)+""}) );
}
function move(target, destination) {
	return fetch(absoluteHost+`?method=reorder&target=${target}&destination=${destination}`, {
		method: "PUT"
	});
}
function remove(target) {
	return fetch(absoluteHost+`/${target}`, {
		method: "DELETE"
	});
}
function check(target, checkState) {
	return fetch(absoluteHost+`/${target}`, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({completed: checkState})
	});
}
function modify(target, title) {
	return fetch(absoluteHost+`/${target}`, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title})
	});
}

export { add, remove, check, modify, move };
