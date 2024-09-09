import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CharacterDetail from "./pages/CharacterDetail";

function App() {
  return (
    <Router>
      <header>
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            alt="Marvel Logo"
            width="150"
          />
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:characterId" element={<CharacterDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
