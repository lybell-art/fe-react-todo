import { useState, useRef, useEffect } from "react";
import useHold from "./useHold.js";

const HOLD_DURATION = 0.5 * 1000;

function isInsideElement(el, parent)
{
	let current = el;
	while(current !== null && current !== undefined)
	{
		if(parent === current) return true;
		current = current.parentElement;
	}
	return false;
}

function useHoldInputLock()
{
	const holdTarget = useRef(null);
	const [readOnly, setReadOnly] = useState(true);
	const {onPointerDown, onPointerUp, onClick: preventHoldClick, setLocked} = useHold(()=>{
		setReadOnly(false);
	}, HOLD_DURATION);

	useEffect( ()=>{
		function onClickOutside(e){
			if(readOnly === true) return;
			if( isInsideElement(e.target, holdTarget.current) ) return;
			setReadOnly(true);
		}
		document.addEventListener("click", onClickOutside);
		()=> {
			document.removeEventListener("click", onClickOutside);
		}
	}, [readOnly] );

	return {
		holdTarget,
		readOnly,
		onPointerDown,
		onPointerUp,
		preventHoldClick,
		setLocked
	};
}

export default useHoldInputLock;