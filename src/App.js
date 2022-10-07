import logo from './logo.svg';
import { Post } from './components/Post';
import { PostList } from './components/PostLists';
import { PostProvider } from './contexts/PostContext';
import PostVideoPage from './page/PostVideoPage';

import HomePage from './page/HomePage.jsx';

//import LoginPage from './page/LoginPage';
import { FeedPage } from './components/feedPage';
import PrivateRoute from './components/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
//<Route path='/' element={<HomePage />} />
import { Container } from 'react-bootstrap';

//import SignUpPage from './page/SignUpPage';
import TestPage from './page/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Test2 from './page/Test2';
import Dashboard from './page/Dashboard';
import ForgotPassword from './page/ForgotPassword';
import PostPage from './page/PostPage';

import Plan from './page/PlanPage';

import { Video } from './components/Video';
import { VideoPostList } from './components/VideoPostList';
import C1 from './components/C1';
function App() {
  return (
    <Container
      className=' justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<HomePage />} />
              <Route exact path='/feed' element={<FeedPage />} />
            </Route>
            <Route path='/ss' element={<PostList />} />
            <Route path='/tt' element={<VideoPostList />} />
            <Route path='/Chat' element={<C1 />} />

            <Route path='/PostVideo' element={<PostVideoPage />} />
            <Route
              path='/ss/posts/:id'
              element={
                <PostProvider>
                  <Post />
                </PostProvider>
              }
            />
            <Route
              path='/tt/posts/:id'
              element={
                <PostProvider>
                  <Video />
                </PostProvider>
              }
            />
            <Route path='/Plan' element={<Plan />} />

            <Route path='/Post' element={<PostPage />} />
            <Route path='/Login' element={<Test2 />} />
            <Route path='/SignUp' element={<TestPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/Test' element={<TestPage />} />
            <Route path='/Test2' element={<Test2 />} />
            <Route path='/Dashboard' element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
