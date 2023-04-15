import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToFireStore, updateBookToFireStore } from "./BookSlice";

const BookForm = ({ edit, setEdit }) => {
  const addingBookLoader = useSelector((state) => state.book.addingBookLoader);
  const updatingBookLoader = useSelector(
    (state) => state.book.updatingBookLoader
  );
  const dispatch = useDispatch();
  const [bookInput, setBookInput] = useState("");
  const bookInputRef = useRef(null);

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
    bookInputRef?.current?.blur();
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
    <div
      style={{
        borderWidth: 3,
        padding: 20,
        borderStyle: "solid",
        borderRadius: 20,
        borderColor: "black",
        marginBottom: 20,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>
            Book name:{" "}
            <input
              name="bookInput"
              value={bookInput}
              onChange={(e) => setBookInput(e.target.value)}
              ref={bookInputRef}
            />
          </label>
          {edit ? (
            <div
              style={{
                justifyContent: "space-between",
                marginTop: 10,
                //backgroundColor: "red",
                minWidth: 120,
                alignItems: "center",
                display: "flex",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 5,
                  maxWidth: 70,
                }}
                disabled={updatingBookLoader}
                type="update"
              >
                Update
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 5,
                  maxWidth: 70,
                }}
                onClick={() => {
                  setEdit(null);
                  setBookInput("");
                }}
                type="cancel"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              style={{
                backgroundColor: "white",
                borderWidth: 2,
                borderRadius: 5,
                padding: 5,
                maxWidth: 70,
                marginTop: 10,
              }}
              disabled={addingBookLoader}
              type="submit"
            >
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
