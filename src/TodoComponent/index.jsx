import { useState, memo } from "react";
import {
	addValue,
	moveValue,
	deleteValue,
	checkValue,
	modifyValue,
} from "./reducer.js";
import TodoSearchBar from "./TodoSearchBar";
import TodoList from "./TodoList";

function TodoComponent({ resource, addLog }) {
	const [data, setData] = useState(resource());
	const findTitle = key=>data.find(({id})=>id === key)?.title;

	function addData(title) {
		setData((oldData) => addValue(oldData, title));
		addLog(`할일 추가 : ${title}`);
	}
	function moveData(key, afterTarget) {
		if (key === afterTarget) return;
		setData((oldData) => moveValue(oldData, key, afterTarget));
		addLog(`할일 이동 : ${findTitle(key)}`);
	}
	function deleteData(key) {
		setData((oldData) => deleteValue(oldData, key));
		addLog(`할일 제거 : ${findTitle(key)}`);
	}
	function checkData(key, nextState) {
		setData((oldData) => checkValue(oldData, key, nextState));
		addLog(`할일 체크 변경 : ${findTitle(key)} => ${nextState}`);
	}
	function modifyData(key, nextState) {
		setData((oldData) => modifyValue(oldData, key, nextState));
		addLog(`할일 타이틀 변경 : ${findTitle(key)} => ${nextState}`);
	}

	return (
		<div>
			<TodoSearchBar addData={addData} />
			<TodoList
				data={data}
				deleteData={deleteData}
				moveData={moveData}
				checkData={checkData}
				modifyData={modifyData}
			/>
		</div>
	);
}

export default memo(TodoComponent);
