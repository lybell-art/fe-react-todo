import { useState, useCallback } from "react";

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
			return <ul>
				{logs.map( (log, i)=><li key={log + i}>{log}</li> )}
			</ul>;
		}
	}
}

export default useLogger;