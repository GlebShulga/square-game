import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/Home";
import { RoutesPath } from "./constants/routesPath";
import { GameField } from "./components/GameField";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutesPath.home} element={<Home />} />
        <Route path={RoutesPath.game} element={<GameField />} />
        <Route
          path={RoutesPath.fallback}
          element={<Navigate to={RoutesPath.home} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
