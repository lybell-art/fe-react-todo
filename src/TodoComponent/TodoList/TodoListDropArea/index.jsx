import { useState } from "react";
import style from "./style.module.scss";

export default function TodoListDropArea({id, moveData})
{
	const [isOver, setIsOver] = useState(false);
	function onDragOver(e)
	{
		e.preventDefault();
		setIsOver(true);
	}
	function onDrop(e)
	{
		e.preventDefault();
		const dragTarget = e.dataTransfer.getData("text");
		moveData(dragTarget, id);
		setIsOver(false);
	}
	function onDragLeave()
	{
		setIsOver(false);
	}

	return <div className={`${style.dropArea} ${isOver ? style.active : ""}`}
		onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave}
	></div>
}