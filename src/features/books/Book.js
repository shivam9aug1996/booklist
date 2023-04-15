import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import ErrorBoundary from "../ErrorBoundary.js";
import { ErrorPage } from "../ErrorPage.js";
// import BookForm from "./BookForm";
// import BookList from "./BookList";
const BookList = lazy(() => import("./BookList.js"));
const BookForm = lazy(() => import("./BookForm.js"));
const Book = () => {
  const [edit, setEdit] = useState(null);
  const loader = () => {
    return <p>loading..</p>;
  };

  return (
    <>
      <Suspense fallback={loader()}>
        <BookForm edit={edit} setEdit={setEdit} />
      </Suspense>
      <Suspense fallback={loader()}>
        <BookList edit={edit} setEdit={setEdit} />
      </Suspense>
    </>
  );
};

export default Book;
