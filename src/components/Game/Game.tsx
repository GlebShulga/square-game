import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  YELLOW_SQUARE,
  GREEN_SQUARE,
  RED_SQUARE,
} from "../../constants/constants";
import {
  cols,
  list,
  rows,
  setRandomSquare,
  activeTimer,
  activeIndex,
  changeToGreen,
  gameResult,
} from "../../redux/slices/gameFiledSlice";
import { Result } from "../Result";

export const GameField = () => {
  const dispatch = useAppDispatch();
  const generatedSquare = useAppSelector(list);
  const rowsNumber = useAppSelector(rows);
  const colsNumber = useAppSelector(cols);
  const timer = useAppSelector(activeTimer);
  const chosenSquare = useAppSelector(activeIndex);
  const gameResults = useAppSelector(gameResult);

  useEffect(() => {
    dispatch(setRandomSquare());
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="mx-auto my-10 md:my-5 flex flex-wrap justify-center">
        <div
          className={`grid grid-rows-${rowsNumber} grid-cols-${colsNumber} gap-4 md:gap-10`}
          id="game-field"
        >
          {generatedSquare.map((it, index) => {
            let color = "bg-gray-500";
            if (it === YELLOW_SQUARE) {
              color = "bg-yellow-500";
            }
            if (it === GREEN_SQUARE) {
              color = "bg-green-500";
            }
            if (it === RED_SQUARE) {
              color = "bg-red-500";
            }
            return (
              <button
                type="button"
                aria-label="Select square"
                className={`md:w-20 md:h-20 w-10 h-10 ${color}`}
                key={`square-${index}-${it}`}
                onClick={() => dispatch(changeToGreen())}
                disabled={chosenSquare !== index}
              />
            );
          })}
        </div>
        {gameResults && (
          <div className="absolute w-screen h-screen bg-gray-700 opacity-80 top-0 left-0 flex items-center justify-center">
            <Result />
          </div>
        )}
      </div>
    </div>
  );
};
