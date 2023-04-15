import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import db from "../../Firebase/Config";

export const addBookToFireStore = createAsyncThunk(
  "book/addBookToFireStore",
  async (book, { rejectWithValue }) => {
    try {
      const addBookRef = await addDoc(collection(db, "books"), book);
      const newBook = { id: addBookRef?.id, book };
      return newBook;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getBookFromFireStore = createAsyncThunk(
  "book/getBookFromFireStore",
  async (item1 = { item: null, action: null }) => {
    try {
      let { item, action } = item1;
      console.log(item, action);
      // const getBookRef = await getDocs(collection(db, "books"));
      // console.log(action);
      const getBookRef = await getDocs(
        // action == "next"
        //   ? query(
        //       collection(db, "books"),
        //       orderBy("created", "desc"),
        //       limit(4),
        //       startAfter(item?.book?.created)
        //     )
        //   : action == "previous"
        //   ? query(
        //       collection(db, "books"),
        //       orderBy("created", "desc"),
        //       limitToLast(4),
        //       endBefore(item?.book?.created)
        //     )
        //   :
        query(collection(db, "books"), orderBy("created", "desc"))
      );
      // const source = getBookRef.metadata.fromCache ? "local cache" : "server";
      // console.log(getBookRef.metadata.fromCache);
      let data = getBookRef.docs.map((item, index) => {
        return { id: item.id, book: item.data() };
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBookFromFireStore = createAsyncThunk(
  "book/deleteBookFromFireStore",
  async (id) => {
    try {
      const getBookRef = await getDocs(collection(db, "books"));
      getBookRef.docs.map(async (item, index) => {
        if (item?.id === id) {
          await deleteDoc(doc(db, "books", id));
        }
      });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBookToFireStore = createAsyncThunk(
  "book/updateBookFromFireStore",
  async (data) => {
    try {
      const getBookRef = await getDocs(collection(db, "books"));
      getBookRef.docs.map(async (item, index) => {
        if (item?.id === data?.id) {
          await updateDoc(doc(db, "books", data?.id), data.book);
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    bookList: [],
    fetchingBookLoader: false,
    addingBookLoader: false,
    deletingBookLoader: false,
    updatingBookLoader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBookToFireStore.fulfilled, (state, action) => {
      state.bookList.unshift(action.payload);
      state.addingBookLoader = false;
    });
    builder.addCase(addBookToFireStore.pending, (state, action) => {
      state.addingBookLoader = true;
    });
    builder.addCase(addBookToFireStore.rejected, (state, action) => {
      state.addingBookLoader = false;
    });
    builder.addCase(getBookFromFireStore.fulfilled, (state, action) => {
      state.bookList = action.payload;
      state.fetchingBookLoader = false;
    });
    builder.addCase(getBookFromFireStore.pending, (state, action) => {
      state.fetchingBookLoader = true;
    });
    builder.addCase(deleteBookFromFireStore.fulfilled, (state, action) => {
      state.bookList = state.bookList.filter((item, index) => {
        return item?.id !== action.payload;
      });
      state.deletingBookLoader = false;
    });
    builder.addCase(deleteBookFromFireStore.pending, (state, action) => {
      state.deletingBookLoader = true;
    });
    builder.addCase(updateBookToFireStore.fulfilled, (state, action) => {
      let data = state.bookList.map((item, index) => {
        if (item?.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      state.bookList = data;
      state.updatingBookLoader = false;
    });
    builder.addCase(updateBookToFireStore.pending, (state, action) => {
      state.updatingBookLoader = true;
    });
  },
});

export default bookSlice.reducer;
