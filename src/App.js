
import './App.css';
import Home from './components/Home/Home';
import Context, { initStore } from './context/Context';

function App() {

  const load = initStore();
  return (
    <div className="App">
      <header className="App-header">
        <Context load={load}>
          <Home />
        </Context>
      </header>
    </div>
  );
}

export default App;
