import { Fragment } from "react";
import TodoListItem from "./TodoListItem";
import TodoListDropArea from "./TodoListDropArea";
import style from "./style.module.scss";

export default function TodoList({data, deleteData, moveData, checkData, modifyData})
{
	return <ul className={style.list}>
		<TodoListDropArea id={null} moveData={moveData} />
		{data.map( (item)=>{
			return <Fragment key={item.id}>
				<TodoListItem data={item} 
					deleteData={deleteData}
					checkData={checkData}
					modifyData={modifyData}
				/>
				<TodoListDropArea id={item.id} moveData={moveData} />
			</Fragment>
		} )}
	</ul>
}