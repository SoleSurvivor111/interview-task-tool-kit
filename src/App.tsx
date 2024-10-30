import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepositoryPage from './pages/RepositoryPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/repository/:owner/:name" element={<RepositoryPage />} />
    </Routes>
  </Router>
);

export default App;
