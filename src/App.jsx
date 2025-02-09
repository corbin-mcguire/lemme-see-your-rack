import RackView from "./components/RackView.jsx";
import RackForm from "./components/RackForm.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <RackView />
        <RackForm />
      </div>
    </div>
  );
}

export default App;
