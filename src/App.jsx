import { useMemo, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./common/ErrorBoundary.jsx";
import fetchData from "./common/fetchData.js";
import TodoComponent from "./TodoComponent";
import LoggerContainer from "./Logger/LoggerContainer.jsx";
import useLogger from "./Logger/useLogger.jsx";

function App() {
	const resource = useMemo(() => fetchData("/"), []);
	const { addLog, Logger } = useLogger();

	return (
		<>
			<ErrorBoundary fallback={<div>Error</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<TodoComponent resource={resource} addLog={addLog} />
				</Suspense>
			</ErrorBoundary>
			<LoggerContainer>
				<Logger />
			</LoggerContainer>
		</>
	);
}

export default App;
