import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  generateAsync,
  isHardMode,
  setGameField,
  setHardMode,
} from "../../redux/slices/gameFiledSlice";
import { NUMBERS, ROWS, COLS } from "../../constants/constants";
import "./GameFieldCreation.scss"

export const GameFieldCreation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isHardModeOn = useAppSelector(isHardMode);

  const [error, setError] = useState(false);

  const onChangeHorizontal = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= NUMBERS.TWO && value <= NUMBERS.EIGHT) {
      setError(false);
      dispatch(setGameField({ axis: ROWS, number: value }));
    } else {
      setError(true);
    }
  };

  const onChangeVertical = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= NUMBERS.TWO && value <= NUMBERS.EIGHT) {
      setError(false);
      dispatch(setGameField({ number: value, axis: COLS }));
    } else {
      setError(true);
    }
  };

  const onClickStart = () => {
    if (!error) {
      dispatch(generateAsync());
      navigate("/game");
    }
  };

  return (
    <div>
      <div className="input-container">
        <div className="custom-input">
          <input
            className="input"
            type="number"
            min={NUMBERS.TWO}
            max={NUMBERS.FIVE}
            placeholder="Choose the number of rows"
            onChange={onChangeHorizontal}
          />
        </div>
        <div className="custom-input">
          <input
            className="input"
            type="number"
            min={NUMBERS.TWO}
            max={NUMBERS.FIVE}
            placeholder="Choose the number of columns"
            onChange={onChangeVertical}
          />
        </div>
      </div>
      {error && (
        <div>
          <div className="error">
            {`The number of lines can be from ${NUMBERS.TWO} to ${NUMBERS.FIVE}.`}
          </div>
        </div>
      )}
      <div className="start-button">
        <button
          type="button"
          onClick={onClickStart}
        >
          {"Start"}
        </button>
      </div>
      <div className="hard-mode-toggle">
        <label
          htmlFor="toggleHardMode"
          className="label"
        >
          <span className="toggle-span">
            <span className="toggle-name" />
            <span
              className={
                isHardModeOn ? "toggle-checked" : "toggle-unchecked"
              }
            >
              <input
                id="toggleHardMode"
                type="checkbox"
                className="absolute opacity-0 w-0 h-0"
                onChange={() => dispatch(setHardMode(!isHardModeOn))}
                checked={isHardModeOn}
              />
            </span>
          </span>
          <span className="toggle-text-hard">{"Hard mode"}</span>
        </label>
      </div>
    </div>
  );
};
