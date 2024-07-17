import { useState, useEffect, useCallback } from "react";
import debounce from "@/common/debounce.js";
import style from "./style.module.scss";

export default function TodoListItem({data, deleteData, checkData, modifyData})
{
	const [title, setTitle] = useState(data.title);
	const syncData = useCallback( debounce( (data)=>{
		modifyData(data.id, data.title);
	}, 500 ), [] );
	function onChange(e)
	{
		setTitle(e.target.value);
		syncData(data);
	}

	return <li className={`${style.container} ${data.completed ? style.completed : ""}`} draggable="true">
		<input className={style.title} type="text" value={title} onChange={onChange} readOnly={true} />
		<button className={style.button}>삭제</button>
	</li>
}