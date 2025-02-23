// import ListItems from './components/ListItems';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import PlayingVideo from './components/PlayingVideo';
import './App.css';
import Signup from './components/Signup';

function App() {
  return (
    <div>

      {/* <ListItems /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/playing" element={<PlayingVideo />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;