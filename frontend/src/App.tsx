import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Dashboard, Login,SignUp,Tabelas, Graph } from "./pages";
import { ThemeProvider } from "./contexts/themeContext";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tabelas" element={<Tabelas/>}/>
          <Route path="/graficos" element={<Graph/>}/>
          <Route path="/cadastro" element={<SignUp/>} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
