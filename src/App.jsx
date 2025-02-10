import RackView from "./components/RackView.jsx";
import RackForm from "./components/RackForm.jsx";
import Header from "./components/Header.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen lsyr-container">
      <Header />
      <div className="mx-auto w-full 2xl:w-3/4">
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          <RackForm />
          <RackView />
        </div>
      </div>
    </div>
  );
}

export default App;
