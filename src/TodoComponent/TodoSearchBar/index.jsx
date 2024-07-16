import { useState, useRef } from "react";

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

	return <div
		onMouseEnter={()=>setRecentSearchVisiblity(true)} 
		onMouseLeave={()=>setRecentSearchVisiblity(false)}
	>
		<input type="text" placeholder="할일을 입력하세요." ref={inputRef}/>
		<button type="button" onClick={onClick}>등록</button>
		<ul>
			{recentSearchState.length > 0 && recentSearchState.map( ({keyword, id})=>{
				return <li key={id}>{keyword}</li>
			} )}
		</ul>
	</div>
}