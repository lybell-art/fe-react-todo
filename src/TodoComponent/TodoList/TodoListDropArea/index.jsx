export default function TodoListDropArea({id, moveData})
{
	function onDragOver(e)
	{
		e.preventDefault();
	}
	function onDrop(e)
	{
		e.preventDefault();
		console.log(e.dataTransfer.getData("text"));
	}

	return <div onDragOver={onDragOver} onDrop={onDrop}>----(개발중임)----</div>
}