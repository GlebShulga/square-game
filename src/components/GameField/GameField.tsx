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
import "./GameField.scss";

export const GameField = () => {
  const dispatch = useAppDispatch();
  const generatedGameField = useAppSelector(list);
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
      <div className="game-field">
        <div
          className={`grid grid-rows-${rowsNumber} grid-cols-${colsNumber} gap-4 md:gap-10`}
          id="game-field"
        >
          {generatedGameField.map((it: number, index: number) => {
            let color = "bg-gray";
            if (it === YELLOW_SQUARE) {
              color = "bg-yellow";
            }
            if (it === GREEN_SQUARE) {
              color = "bg-green";
            }
            if (it === RED_SQUARE) {
              color = "bg-red";
            }
            return (
              <button
                type="button"
                aria-label="select square button"
                className={`generated-square ${color}`}
                key={`square-${index}-${it}`}
                onClick={() => dispatch(changeToGreen())}
                disabled={chosenSquare !== index}
              />
            );
          })}
        </div>
        {gameResults && (
          <div className="game-results">
            <Result />
          </div>
        )}
      </div>
    </div>
  );
};
