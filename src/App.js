import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Language from "./features/language/Language";
import ErrorBoundary from "./features/ErrorBoundary";
import { ErrorPage } from "./features/ErrorPage";
// import Book from "./features/books/Book";
const Book = lazy(() => import("./features/books/Book.js"));
function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={() => <p>loading..</p>}>
          <Book />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
