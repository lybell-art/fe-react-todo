import { useState } from "react";
import style from "./style.module.scss";

function LoggerContainer({ children }) {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<button
				className={style.button}
				onClick={() => setOpened((open) => !open)}
			>
				열기
			</button>
			<div className={`${style.container} ${opened ? "" : style.closed}`}>
				<div className={style.innerContainer}>
					{children}
				</div>
				<div className={style.backdrop} onClick={() => setOpened(false)}>
					hello
				</div>
			</div>
		</>
	);
}

export default LoggerContainer;
