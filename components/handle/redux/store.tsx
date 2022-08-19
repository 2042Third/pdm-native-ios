
import ChatInputViewReducer from './reducers/chat/chatViewReducer';
import {configureStore} from '@reduxjs/toolkit';
import UserinfoStatusReducer from "./reducers/user/userinfoReducer";
import NotesHeadsReducer from "./reducers/notes/notesHeadsReducer";
import UserinfoEnterReducer from './reducers/user/userinfoEnter';
export const store = configureStore({
  reducer: {
    chat: ChatInputViewReducer,
    userinfo: UserinfoStatusReducer,
    userEnter: UserinfoEnterReducer,
    noteHeads: NotesHeadsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
