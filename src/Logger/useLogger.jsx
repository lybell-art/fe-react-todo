import { useState, useCallback } from "react";
import style from "./style.module.scss";

function useLogger()
{
	const [logs, setLogs] = useState([]);
	const addLog = useCallback( (log)=>{
		setLogs( (prev)=>[...prev, log] );
	}, [] );

	return {
		addLog,
		Logger()
		{
			const [opened, setOpened] = useState(false);
			return <>
				<button className={style.button} onClick={()=>setOpened(open=>!open)}>열기</button>
				<ul className={`${style.container} ${opened ? "" : style.closed}`} >
					{logs.map( (log, i)=><li className={style.item} key={log + i}>{log}</li> )}
				</ul>
			</>;
		}
	}
}

export default useLogger;