import { useState, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ErrorBoundary from "./common/ErrorBoundary.jsx";
import fetchData from "./common/fetchData.js";
import TodoComponent from "./TodoComponent";

function App() {
  const resource = fetchData("/");
  return (
    <>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoComponent resource={resource} />
        </Suspense>
      </ErrorBoundary>
      <div>Logger ...</div>
    </>
  );
}

export default App;
