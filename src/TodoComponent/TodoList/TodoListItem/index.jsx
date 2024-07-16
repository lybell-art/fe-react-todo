import { useState, useEffect, useCallback } from "react";
import debounce from "@/common/debounce.js";

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

	return <li>
		<input type="text" value={title} onChange={onChange} />
		<button>삭제</button>
	</li>
}