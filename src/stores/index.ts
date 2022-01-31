import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../reducers/User";
import PostReducer from "../reducers/Post";

export default configureStore({
  reducer: {
      user: UserReducer,
      post: PostReducer
  },
})
