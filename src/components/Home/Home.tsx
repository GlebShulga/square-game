import { GameFiledCreation } from "../GameFiledCreation/GameFiledCreation";
import { Rules } from "../Rules";

export const Home = () => {
  return (
    <div>
      <div className="grid-cols-2 h-screen">
        <div className="flex justify-items justify-center pl-5">
          <Rules />
        </div>
        <div className="max-w-2xl px-5 m-auto w-full flex justify-items justify-center">
          <div className="bg-purple-300 w-2/3 text-white font-bold rounded-lg border shadow-lg p-10">
            <GameFiledCreation />
          </div>
        </div>
      </div>
    </div>
  );
};
