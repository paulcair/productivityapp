import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Productivity App</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-2xl font-bold">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link font-bold"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
