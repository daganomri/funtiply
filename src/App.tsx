import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppBar from "./components/AppBar";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import TestPage from "./pages/TestPage";

const Home = () => {
  return (
    <Router>
      <AppBar />
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/practice' element={<PracticePage />} />
          <Route path='/test' element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
