import logo from './logo.svg';

import HomePage from './page/HomePage.jsx';
import LoginPage from './page/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Questions from './page/QuestionsPage';
import './page/SignUpPage';
import SignUpPage from './page/SignUpPage';
import TestPage from './page/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Test2 from './page/Test2';
import Dashboard from './page/Dashboard';
import ForgotPassword from './page/ForgotPassword';
import PostPage from './page/PostPage';
import FindPage from './page/FindQuestion';
function App() {
  return (
    <Container
      className='d-flex justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/Post' element={<PostPage />} />
            <Route path='/Login' element={<Test2 />} />
            <Route path='/SignUp' element={<TestPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />

            <Route path='/Test' element={<TestPage />} />
            <Route path='/Test2' element={<Test2 />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Find' element={<FindPage />} />
            <Route path='/Questions' element={<Questions />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
