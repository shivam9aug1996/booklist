import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToFireStore, updateBookToFireStore } from "./BookSlice";

const BookForm = ({ edit, setEdit }) => {
  const addingBookLoader = useSelector((state) => state.book.addingBookLoader);
  const updatingBookLoader = useSelector(
    (state) => state.book.updatingBookLoader
  );
  const dispatch = useDispatch();
  const [bookInput, setBookInput] = useState("");

  useEffect(() => {
    if (edit) setBookInput(edit?.book?.name);
  }, [edit]);
  useEffect(() => {
    if (!updatingBookLoader) {
      setEdit(null);
    }
  }, [updatingBookLoader]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookInput) {
      let book = {
        name: bookInput,
        created: Date.now(),
      };
      if (edit) {
        dispatch(updateBookToFireStore({ id: edit?.id, book }));
      } else {
        dispatch(addBookToFireStore(book));
      }

      setBookInput("");
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Book name:{" "}
          <input
            name="bookInput"
            value={bookInput}
            onChange={(e) => setBookInput(e.target.value)}
          />
        </label>
        {edit ? (
          <>
            <button disabled={updatingBookLoader} type="update">
              Update
            </button>
            <button
              onClick={() => {
                setEdit(null);
                setBookInput("");
              }}
              type="cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button disabled={addingBookLoader} type="submit">
            Add
          </button>
        )}
      </form>
    </>
  );
};

export default BookForm;
