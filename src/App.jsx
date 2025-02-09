import RackView from "./components/RackView.jsx";
import RackForm from "./components/RackForm.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
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
