import Header from './components/Header'

function App() {
  return (
    <>
      <div className = "container mx-auto">
        <Header />
        <section className= "heading">
          <h1 className ="flex items-center justify-center">
            Welcome to the Productivity App      
          </h1>
          <p className ="text-2xl text-center">This app is designed to help you focus on tasks using the pomodoro technique</p>
        </section>
      </div>
    </>
  );
}

export default App;
