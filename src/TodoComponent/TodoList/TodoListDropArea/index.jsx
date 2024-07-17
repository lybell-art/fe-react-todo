export default function TodoListDropArea({id, moveData})
{
	function onDragOver(e)
	{
		e.preventDefault();
	}
	function onDrop(e)
	{
		e.preventDefault();
		const dragTarget = e.dataTransfer.getData("text");
		//console.log(e.dataTransfer.getData("text"));
		moveData(dragTarget, id);
	}

	return <div onDragOver={onDragOver} onDrop={onDrop}>----(개발중임)----</div>
}