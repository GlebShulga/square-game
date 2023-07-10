import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  GRAY_SQUARE,
  YELLOW_SQUARE,
  GREEN_SQUARE,
  RED_SQUARE,
  INC_TIMER,
  DEC_TIMER,
  WIN,
  LOSE,
  NUMBERS,
} from "../../constants/constants";
import { RootState } from "..";
import { updateArrayValue } from "../../utils/array-utils";

interface GameSliceState {
  list: number[];
  rows: number;
  cols: number;
  activeIndex: number | null;
  activeTimer: number;
  gameResult: string | null;
  isHardMode: boolean;
  timeoutValue: number;
  resultCount: { green: number; red: number };
  [key: string]: any;
}

interface setGameFieldActionPayload {
  axis: string;
  number: number;
}

interface ActiveTimerActionPayload {
  timer: number;
  resultCount: { green: number; red: number };
}

const initialState: GameSliceState = {
  list: [],
  rows: 0,
  cols: 0,
  activeIndex: null,
  activeTimer: 0,
  gameResult: null,
  isHardMode: false,
  timeoutValue: NUMBERS.ONE_THOUSAND,
  resultCount: { green: 0, red: 0 },
};

const gameSlice = createSlice({
  name: "gameField",
  initialState,
  reducers: {
    setGameField(state, action: PayloadAction<setGameFieldActionPayload>) {
      const { axis, number } = action.payload;
      state[axis] = number;
    },
    generateGameField(state, action: PayloadAction<number[]>) {
      state.list = action.payload;
    },
    setRandomNumber(state, action: PayloadAction<number>) {
      state.activeIndex = action.payload;
    },
    setHardMode(state, action: PayloadAction<boolean>) {
      state.isHardMode = action.payload;
    },
    updateField(state, action: PayloadAction<number[]>) {
      state.list = action.payload;
    },
    setGreenColor(state, action: PayloadAction<number[]>) {
      state.list = action.payload;
    },
    setRedColor(state, action: PayloadAction<number[]>) {
      state.list = action.payload;
    },
    setActiveTimer(state, action: PayloadAction<ActiveTimerActionPayload>) {
      const { timer, resultCount } = action.payload;
      state.activeTimer = timer;
      state.resultCount = resultCount;
    },
    setGameResult(state, action: PayloadAction<string | null>) {
      state.gameResult = action.payload;
    },
    updateTimeoutValue(state, action: PayloadAction<number>) {
      state.timeoutValue = action.payload;
    },
  },
});

export const list = (state: RootState) => state.gameField.list;
export const activeIndex = (state: RootState) => state.gameField.activeIndex;
export const activeTimer = (state: RootState) => state.gameField.activeTimer;
export const gameResult = (state: RootState) => state.gameField.gameResult;
export const isHardMode = (state: RootState) => state.gameField.isHardMode;
export const timeoutValue = (state: RootState) => state.gameField.timeoutValue;
export const resultCount = (state: RootState) => state.gameField.resultCount;
export const rows = (state: RootState) => state.gameField.rows;
export const cols = (state: RootState) => state.gameField.cols;

export const generateAsync =
  (): ThunkAction<void, RootState, undefined, PayloadAction<number[]>> =>
  (dispatch, getState) => {
    const { rows, cols } = getState().gameField;
    const multiply = new Array(rows * cols).fill(GRAY_SQUARE);
    dispatch(generateGameField(multiply));
  };

export const changeToRed =
  (): ThunkAction<
    void,
    RootState,
    undefined,
    PayloadAction<number | number[]>
  > =>
  (dispatch, getState) => {
    const { list, isHardMode, timeoutValue, activeIndex } =
      getState().gameField;
    const newIndex = activeIndex ?? 0;
    const newArrayRed = updateArrayValue(list, newIndex, RED_SQUARE);
    if (isHardMode) {
      const hardModeTimer: number = timeoutValue * INC_TIMER;
      dispatch(updateTimeoutValue(hardModeTimer));
    }
    dispatch(setRedColor(newArrayRed));
    dispatch(setRandomSquare());
  };

export const setRandomSquare =
  (): ThunkAction<void, RootState, undefined, AnyAction> =>
  (dispatch, getState) => {
    const { activeTimer, list, timeoutValue } = getState().gameField;
    const indexOfList = list.reduce(
      (acc: number[], rec: number, index: number) => {
        return rec === GRAY_SQUARE ? [...acc, index] : acc;
      },
      []
    );
    const redCount = list.reduce((acc: number, rec: number) => {
      return rec === RED_SQUARE ? acc + NUMBERS.ONE : acc;
    }, 0);
    const greenCount = list.reduce((acc: number, rec: number) => {
      return rec === GREEN_SQUARE ? acc + NUMBERS.ONE : acc;
    }, 0);
    if (redCount >= list.length / NUMBERS.TWO) {
      dispatch(setGameResult(LOSE));
      if (activeTimer) {
        window.clearTimeout(activeTimer);
      }
      return;
    }
    if (greenCount >= list.length / NUMBERS.TWO) {
      dispatch(setGameResult(WIN));
      if (activeTimer) {
        window.clearTimeout(activeTimer);
      }
      return;
    }
    if (indexOfList.length > NUMBERS.ZERO) {
      const randomNumber = Math.floor(Math.random() * indexOfList.length);
      dispatch(setRandomNumber(indexOfList[randomNumber]));
      const newArray = updateArrayValue(
        list,
        indexOfList[randomNumber],
        YELLOW_SQUARE
      );
      dispatch(updateField(newArray));
      const timer = window.setTimeout(() => {
        dispatch(changeToRed());
      }, timeoutValue);
      if (activeTimer) {
        window.clearTimeout(activeTimer);
      }
      dispatch(
        setActiveTimer({
          timer,
          resultCount: { red: redCount, green: greenCount },
        })
      );
    } else {
      if (activeTimer) {
        window.clearTimeout(activeTimer);
      }
    }
  };

export const changeToGreen =
  (): ThunkAction<
    void,
    RootState,
    undefined,
    PayloadAction<number | number[] | null>
  > =>
  (dispatch, getState) => {
    const { activeIndex, activeTimer, list, isHardMode, timeoutValue } =
      getState().gameField;
    const newArrayGreen = updateArrayValue(list, activeIndex!, GREEN_SQUARE);
    if (isHardMode) {
      const hardModeTimer = timeoutValue * DEC_TIMER;
      dispatch(updateTimeoutValue(hardModeTimer));
    }
    clearTimeout(activeTimer!);
    dispatch(setGreenColor(newArrayGreen));
    dispatch(setRandomSquare());
  };

export const {
  setGameField,
  generateGameField,
  setRandomNumber,
  updateField,
  setGreenColor,
  setRedColor,
  setActiveTimer,
  setGameResult,
  updateTimeoutValue,
  setHardMode,
} = gameSlice.actions;

export default gameSlice.reducer;
