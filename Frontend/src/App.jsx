import ListItems from './components/ListItems';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import {useAuth} from './context/AuthProvider';

function App() {
  const {loading, data}=useAuth();
  console.log(loading);
  console.log(data);
  return (
    <div>
      <Navbar />
      <ListItems />
      <Sidebar />
      </div>
  );
}

export default App;