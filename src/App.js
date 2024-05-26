import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Container from './components/layouts/Container';
import NavBar from './components/layouts/NavBar'
import Footer from './components/layouts/Footer'
import Projects from './components/pages/Projects';

function App() {
  return (
    <Router>
      <NavBar/>
      
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
