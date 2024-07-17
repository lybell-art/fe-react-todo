import { useState, useRef } from "react";
import style from "./style.module.scss";

export default function TodoSearchBar({addData})
{
	const inputRef = useRef(null);
	const [recentSearchState, setRecentSearchState] = useState([]);
	const [recentSearchVisiblity, setRecentSearchVisiblity] = useState(false);
	function addSearchBar(keyword)
	{
		setRecentSearchState( (oldValue)=>{
			const newValue = {keyword, id:keyword + Date.now()}
			if(oldValue.length < 5) return [newValue, ...oldValue];
			return [newValue, ...oldValue.slice(0, 4)];
		} );
	}
	function onClick()
	{
		if(!inputRef.current) return;
		const inputData = inputRef.current.value;
		if(inputData === "") return;
		addSearchBar(inputData);
		addData(inputData);
	}

	return <div className={style.container}>
		<input className={style.input} type="text" placeholder="할일을 입력하세요." ref={inputRef}
			onFocus = {()=>setRecentSearchVisiblity(true)}
			onBlur={()=>setTimeout(()=>setRecentSearchVisiblity(false), 100)}
		/>
		<button className={style.submitButton} type="button" onClick={onClick}>등록</button>
		<ul className={`${style.recentList} ${recentSearchVisiblity ? "" : style.hidden}`}>
			{recentSearchState.length > 0 && recentSearchState.map( ({keyword, id})=>{
				return <li className={style.recentListItem} key={id} onClick={()=>{
					inputRef.current.value = keyword;
				}}>{keyword}</li>
			} )}
		</ul>
	</div>
}