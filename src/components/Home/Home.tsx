import { GameFiledCreation } from "../GameFiledCreation/GameFiledCreation";
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
            <GameFiledCreation />
          </div>
        </div>
      </div>
    </div>
  );
};
