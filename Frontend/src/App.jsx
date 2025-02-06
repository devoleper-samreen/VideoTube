import ListItems from './components/ListItems';
import Navbar from './components/Navbar'
import { Routes } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import PlayingVideo from './components/PlayingVideo';

function App() {
  return (
    <div>
      <Navbar />
      <ListItems />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/playing" element={<PlayingVideo />} />
      </Routes>
      </div>
  ); 
}

export default App;