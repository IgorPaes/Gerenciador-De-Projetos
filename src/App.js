import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Container from './components/layouts/Container';

function App() {
  return (
    <Router>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/company'>Company</Link></li>
        <li><Link to='/newproject'>New Project</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={
          <Container>
            <Route index element={<Home/>} />
            <Route path="contact" element={<Contact/>} />
            <Route path="company" element={<Company/>} />
            <Route path="newproject" element={<NewProject/>} />
          </Container>
        }/>
      </Routes>

      <p>Footer</p>
    </Router>
  );
}

export default App;
