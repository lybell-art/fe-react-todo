import { useMemo, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./common/ErrorBoundary.jsx";
import fetchData from "./common/fetchData.js";
import TodoComponent from "./TodoComponent";
import useLogger from "./Logger/useLogger.jsx";

function App() {
	const resource = useMemo( ()=>fetchData("/"), []);
	const {addLog, Logger} = useLogger();

	return (
		<>
			<ErrorBoundary fallback={<div>Error</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<TodoComponent resource={resource} addLog={addLog} />
				</Suspense>
			</ErrorBoundary>
			<Logger />
		</>
	);
}

export default App;
