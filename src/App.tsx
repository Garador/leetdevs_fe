import React from 'react';
import './App.css';
import { LoaderComponent } from './components/hoc/loader';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignInRoute } from './routes/auth/sign-in';
import { SignUpRoute } from './routes/auth/sign-up';
import { useSelector } from 'react-redux'
import PostsRoute from './routes/posts';
import { CreatePost } from './routes/posts/create';

function App() {

  const contextUser = useSelector((state:any) => {
      return state.user.user;
  });

  return (
    <BrowserRouter>
      <LoaderComponent>
          <Routes>
            <Route path="/auth/sign-in" element={contextUser ? <Navigate to="/posts"/> : < SignInRoute />}/>
            <Route path="/auth/sign-up" element={contextUser ? <Navigate to="/posts"/> : < SignUpRoute />}/>
            <Route path="/posts" element={!contextUser ? <Navigate to="/auth/sign-in"/> : <PostsRoute/>} />
            <Route path="/posts/create" element={!contextUser ? <Navigate to="/auth/sign-in"/> : <CreatePost/>}/>
          </Routes>
      </LoaderComponent>
    </BrowserRouter>
  );
}

export default App;
