import { GameFieldCreation } from "../GameFieldCreation/GameFieldCreation";
import { Rules } from "../Rules";
import "./Home.scss"

export const Home = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="rules">
          <Rules />
        </div>
        <div className="custom-box-wrapper">
          <div className="custom-box">
            <GameFieldCreation />
          </div>
        </div>
      </div>
    </div>
  );
};
