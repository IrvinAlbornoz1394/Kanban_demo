import { Header } from './components/layout/Header';
import { Home } from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';

function App() {
  return (
    <>
      <Header />

      <main style={{ padding: '16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
