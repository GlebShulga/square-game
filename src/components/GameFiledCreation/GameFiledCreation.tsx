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

export const GameFiledCreation = () => {
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
      <div className="grid gap-4">
        <div className="col-span-2 md:col-span-1">
          <input
            className="inputClassName"
            type="number"
            min={NUMBERS.TWO}
            max={NUMBERS.FIVE}
            placeholder="Write number of horizontal lines"
            onChange={onChangeHorizontal}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <input
            className="inputClassName"
            type="number"
            min={NUMBERS.TWO}
            max={NUMBERS.FIVE}
            placeholder="Write number of vertical lines"
            onChange={onChangeVertical}
          />
        </div>
      </div>
      {error && (
        <div>
          <div className="text-red-500 font-semibold flex justify-center text-lg pt-1">
            {`The number of lines can be from ${NUMBERS.TWO} to ${NUMBERS.FIVE}.`}
          </div>
        </div>
      )}
      <div className="mt-4 grid justify-items-center">
        <button
          type="button"
          className="border rounded bg-teal-300 py-1 px-2 hover:text-red-200"
          onClick={onClickStart}
        >
          {"Start"}
        </button>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="toggleHardMode"
          className="mt-3 inline-flex items-center cursor-pointer"
        >
          <span className="relative">
            <span className="nameToggle" />
            <span
              className={
                isHardModeOn ? "nameToggleChecked" : "nameToggleUnchecked"
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
          <span className="ml-3 text-sm">{"Hard mode"}</span>
        </label>
      </div>
    </div>
  );
};
