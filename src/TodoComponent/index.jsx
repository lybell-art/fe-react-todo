import { useState, memo } from "react";
import * as reducer from "./reducer.js";
import * as fetchServer from "./fetchServer.js";
import TodoSearchBar from "./TodoSearchBar";
import TodoList from "./TodoList";

function TodoComponent({ resource, addLog }) {
	const [data, setData] = useState(resource([]));
	const findTitle = (key) => data.find(({ id }) => id === key)?.title;

	function addData(title) {
		fetchServer.add(title).then(
			({id})=>setData((oldData) => reducer.add(oldData, title, id))
		);
		addLog(`할일 추가 : ${title}`);
	}
	function moveData(key, afterTarget) {
		if (key === afterTarget) return;
		setData((oldData) => reducer.move(oldData, key, afterTarget));
		fetchServer.move(key, afterTarget);
		addLog(`할일 이동 : ${findTitle(key)}`);
	}
	function deleteData(key) {
		setData((oldData) => reducer.remove(oldData, key));
		fetchServer.remove(key);
		addLog(`할일 제거 : ${findTitle(key)}`);
	}
	function checkData(key, nextState) {
		setData((oldData) => reducer.check(oldData, key, nextState));
		fetchServer.check(key, nextState);
		addLog(`할일 체크 변경 : ${findTitle(key)} => ${nextState}`);
	}
	function modifyData(key, nextState) {
		setData((oldData) => reducer.modify(oldData, key, nextState));
		fetchServer.modify(key, nextState);
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

const MemorizedTodoComponent = memo(TodoComponent);

export default MemorizedTodoComponent;
