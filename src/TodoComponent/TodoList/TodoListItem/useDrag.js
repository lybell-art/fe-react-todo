import { useState, useEffect, useRef } from "react";

function useDrag() {
	const startPosition = useRef({ x: 0, y: 0 });
	const isDragging = useRef(false);
	const [style, setStyle] = useState({ transform: "translate(0px, 0px)" });

	function onDragStart(e) {
		startPosition.current.x = e.pageX;
		startPosition.current.y = e.pageY;
		isDragging.current = true;
		setStyle({ transform: "translate(0px, 0px)" });
	}
	function onDragging(e) {
		if (!isDragging.current) return;
		const offsetX = e.pageX - startPosition.current.x;
		const offsetY = e.pageY - startPosition.current.y;
		setStyle({
			transform: `translate(${offsetX}px, ${offsetY}px)`,
			pointerEvents: "none",
		});
	}
	function onDragEnd(e) {
		if (
			e.relatedTarget !== null &&
			e.relatedTarget !== document.documentElement
		)
			return;
		startPosition.current.x = 0;
		startPosition.current.y = 0;
		isDragging.current = false;
		setStyle({ transform: "translate(0px, 0px)" });
	}
	useEffect(() => {
		document.addEventListener("dragleave", onDragEnd);
		() => document.removeEventListener("dragleave", onDragEnd);
	}, []);

	return {
		style,
		onDragStart,
		onDragging,
		onDragEnd,
	};
}

export default useDrag;
