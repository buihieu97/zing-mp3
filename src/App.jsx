import { Routes, Route } from "react-router";
import "./App.scss";
import { Home, PlayList, HasHeader, Search } from "./pages";
import Artist from "./pages/Artist";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HasHeader>
              <Home />
            </HasHeader>
          }
        />
        <Route
          path="/artist/:teamId"
          element={
            <HasHeader>
              <Artist />
            </HasHeader>
          }
        />
        <Route
          path="/search/"
          element={
            <HasHeader>
              <Search />
            </HasHeader>
          }
        />
        <Route path="/test" element={<PlayList />} />
      </Routes>
    </div>
  );
}

export default App;
