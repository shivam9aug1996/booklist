import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookFromFireStore,
  getBookFromFireStore,
  updateBookToFireStore,
} from "./BookSlice";

const BookList = ({ edit, setEdit }) => {
  const bookList = useSelector((state) => state.book.bookList);
  const addingBookLoader = useSelector((state) => state.book.addingBookLoader);
  const fetchingBookLoader = useSelector(
    (state) => state.book.fetchingBookLoader
  );

  const deletingBookLoader = useSelector(
    (state) => state.book.deletingBookLoader
  );
  const updatingBookLoader = useSelector(
    (state) => state.book.updatingBookLoader
  );

  console.log(bookList);
  const dispatch = useDispatch();
  const [deletedId, setDeletedId] = useState("");
  const [bookPage, setBookPage] = useState(1);

  useEffect(() => {
    dispatch(getBookFromFireStore());
  }, []);

  useEffect(() => {
    if (!deletingBookLoader) {
      setDeletedId("");
    }
  }, [deletingBookLoader]);

  const handleDelete = (id) => {
    dispatch(deleteBookFromFireStore(id));
  };

  const showNext = (item) => {
    if (bookList.length === 0) {
      alert("Thats all we have for now !");
    } else {
      dispatch(getBookFromFireStore(item));
      setBookPage((bookPage) => bookPage + 1);
    }
  };

  const showPrevious = (item) => {
    if (bookList.length === 0) {
      alert("Thats all we have for now !");
    } else {
      dispatch(getBookFromFireStore(item));
      setBookPage((bookPage) => bookPage - 1);
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
        height: 250,
        overflow: "scroll",
        flexWrap: "wrap",
        minWidth: 200,
      }}
    >
      {addingBookLoader ? <p>loading...</p> : null}
      {fetchingBookLoader ? (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          loading...
        </p>
      ) : (
        <>
          {bookList.map((item, index) => {
            return (
              <div
                key={item?.id}
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ marginRight: 10, fontWeight: "bold" }}>
                  {index + 1}
                </p>
                <p style={{ marginRight: 10 }}>{item?.book?.name}</p>
                <div
                  style={{
                    display: "flex",
                    minWidth: 100,
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      borderWidth: 2,
                      borderRadius: 5,
                      padding: 5,
                    }}
                    disabled={deletingBookLoader && deletedId == item?.id}
                    onClick={() => {
                      handleDelete(item?.id);
                      setDeletedId(item?.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      backgroundColor: "white",
                      borderWidth: 2,
                      borderRadius: 5,
                      padding: 5,
                    }}
                    onClick={() => {
                      setEdit(item);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
          {/* <button
            disabled={bookPage == 1}
            onClick={() =>
              showPrevious({ item: bookList[0], action: "previous" })
            }
          >
            Previous
          </button>
          <button
            disabled={bookList?.length < 4}
            onClick={() =>
              showNext({
                item: bookList[bookList.length - 1],
                action: "next",
              })
            }
          >
            Next
          </button>
          {bookPage} */}
        </>
      )}
    </div>
  );
};

export default BookList;
