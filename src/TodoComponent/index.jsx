import { useState } from "react";
import {
	addValue,
	moveValue,
	deleteValue,
	checkValue,
	modifyValue,
} from "./reducer.js";
import TodoSearchBar from "./TodoSearchBar";
import TodoList from "./TodoList";

export default function TodoComponent({ resource }) {
	const [data, setData] = useState(resource());

	function addData(key) {
		setData((oldData) => addValue(oldData, key));
	}
	function moveData(key, afterTarget) {
		if (key === afterTarget) return;
		setData((oldData) => moveValue(oldData, key, afterTarget));
	}
	function deleteData(key) {
		setData((oldData) => deleteValue(oldData, key));
	}
	function checkData(key, nextState) {
		setData((oldData) => checkValue(oldData, key, nextState));
	}
	function modifyData(key, nextState) {
		setData((oldData) => modifyValue(oldData, key, nextState));
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
