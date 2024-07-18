import { useState, useEffect, useRef } from "react";

const voidImage = new Image();
voidImage.src =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC";

function useDrag() {
	const startPosition = useRef({ x: 0, y: 0 });
	const isDragging = useRef(false);
	const [style, setStyle] = useState({ transform: "translate(0px, 0px)" });

	function onDragStart(e) {
		startPosition.current.x = e.pageX;
		startPosition.current.y = e.pageY;
		isDragging.current = true;
		e.dataTransfer.setDragImage(voidImage, 0, 0);
	}
	function onDragging(e) {
		if (!isDragging.current) return;
		const offsetX = e.pageX - startPosition.current.x;
		const offsetY = e.pageY - startPosition.current.y;
		setStyle({
			transform: `translate(${offsetX}px, ${offsetY}px)`,
			pointerEvents: "none",
			zIndex: 100,
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
