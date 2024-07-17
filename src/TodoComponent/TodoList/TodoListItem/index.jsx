import { useState, useCallback } from "react";
import useDrag from "./useDrag.js";
import debounce from "@/common/debounce.js";
import style from "./style.module.scss";

export default function TodoListItem({data, deleteData, checkData, modifyData})
{
	const {style: dragStyle, onDragStart: _onDragStart, onDragging, onDragEnd} = useDrag();
	const [title, setTitle] = useState(data.title);
	const syncData = useCallback( debounce( (data)=>{
		modifyData(data.id, data.title);
	}, 500 ), [] );
	function onChange(e)
	{
		setTitle(e.target.value);
		syncData(data);
	}
	function onDragStart(e)
	{
		e.dataTransfer.clearData();
		e.dataTransfer.setData("text/plain", data.id);
		_onDragStart(e);
	}

	return <li
		className={`${style.container} ${data.completed ? style.completed : ""}`}
		style={dragStyle}
		draggable="true"
		onDragStart={onDragStart}
		onDrag={onDragging}
		onDragEnd={onDragEnd}
		onDragLeave={onDragEnd}
	>
		<input className={style.title} type="text" value={title} onChange={onChange} readOnly={true} />
		<button className={style.button}>삭제</button>
	</li>
}