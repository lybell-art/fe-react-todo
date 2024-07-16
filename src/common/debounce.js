export default function debounce(func, delay)
{
	let argsCache = [];
	let timeout = null;
	return function(...args)
	{
		argsCache = args;
		clearTimeout(timeout);
		timeout = setTimeout( ()=>{
			func(...argsCache);
			timeout = null;
		}, delay);
	}
}