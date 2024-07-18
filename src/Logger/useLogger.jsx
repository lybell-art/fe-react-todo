import { useState, useCallback } from "react";
import style from "./style.module.scss";

function useLogger() {
	const [logs, setLogs] = useState([]);
	const addLog = useCallback((log) => {
		setLogs((prev) => [...prev, log]);
	}, []);

	return {
		addLog,
		Logger() {
			return (
				<>
					<ul>
						{logs.map((log, i) => (
							<li className={style.item} key={log + i}>
								{log}
							</li>
						))}
					</ul>
				</>
			);
		},
	};
}

export default useLogger;
