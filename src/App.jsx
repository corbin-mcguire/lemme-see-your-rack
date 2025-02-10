import RackView from "./components/RackView.jsx";
import RackForm from "./components/RackForm.jsx";
import Header from "./components/Header.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen lsyr-container">
      <Header />
      <div className="w-3/4 mx-auto">
        <div className="grid grid-cols-2 gap-6 p-6">
          <RackForm />
          <RackView />
        </div>
      </div>
    </div>
  );
}

export default App;
