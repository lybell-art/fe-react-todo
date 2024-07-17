import { useState, useCallback } from "react";
import useDrag from "./useDrag.js";
import useHoldInputLock from "./useHoldInputLock.js";
import debounce from "@/common/debounce.js";
import style from "./style.module.scss";



export default function TodoListItem({data, deleteData, checkData, modifyData})
{
	// hold feature
	const {holdTarget, setLocked, readOnly, onPointerDown, onPointerUp, preventHoldClick} = useHoldInputLock();
	function onClick()
	{
		checkData(data.id, !data.completed);
	}

	// drag feature
	const {style: dragStyle, onDragStart: _onDragStart, onDragging, onDragEnd: _onDragEnd} = useDrag();
	function onDragStart(e)
	{
		e.dataTransfer.clearData();
		e.dataTransfer.setData("text/plain", data.id);
		setLocked(true);
		_onDragStart(e);
	}
	function onDragEnd(e)
	{
		setLocked(false);
		_onDragEnd(e);
	}

	// modify title feature
	const [title, setTitle] = useState(data.title);
	const syncData = useCallback( debounce( (data)=>{
		modifyData(data.id, data.title);
	}, 500 ), [] );
	function onChange(e)
	{
		setTitle(e.target.value);
		syncData(data);
	}

	return <li
		className={`${style.container} ${data.completed ? style.completed : ""}`}
		style={dragStyle}
		draggable="true"
		onPointerUp={onPointerUp}
		onPointerDown={onPointerDown}
		onClick={preventHoldClick.then(onClick)}
		onDragStart={onDragStart}
		onDrag={onDragging}
		onDragEnd={onDragEnd}
		onDragLeave={onDragEnd}
		ref={holdTarget}
	>
		<input className={style.title} type="text" value={title} onChange={onChange} readOnly={readOnly} />
		<button className={style.button} onClick={()=>deleteData(data.id)}>삭제</button>
	</li>
}