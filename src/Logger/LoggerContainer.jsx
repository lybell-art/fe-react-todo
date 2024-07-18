import { useState } from "react";
import style from "./style.module.scss";
import logIcon from "./logIcon.svg";

function LoggerContainer({ children }) {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<button
				className={style.button}
				onClick={() => setOpened((open) => !open)}
			>
				<img src={logIcon} className={style.icon} alt="열기" />
			</button>
			<div className={`${style.container} ${opened ? "" : style.closed}`}>
				<div className={style.innerContainer}>{children}</div>
				<div className={style.backdrop} onClick={() => setOpened(false)}>
				</div>
			</div>
		</>
	);
}

export default LoggerContainer;
