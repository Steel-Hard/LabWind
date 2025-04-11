import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing,Dashboard,Login } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<Landing/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Landing/>} />
      </Routes>
    </Router>
  );
}

export default App;
