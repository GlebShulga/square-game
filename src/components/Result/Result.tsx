import React from 'react'
import { Link } from 'react-router-dom'
import { NUMBERS, WIN } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { gameResult, resultCount, setGameResult } from '../../redux/slices/gameFiledSlice'
import "./Result.scss"

export const Result = () => {
  const dispatch = useAppDispatch();
  const gameResults = useAppSelector(gameResult);
  const resultCounts = useAppSelector(resultCount);

  return (
    <div>
      <div className="result">
        <div className="result-text">{gameResults}</div>
        <div>
          {gameResults === WIN
            ? `Red: ${resultCounts.red} Green: ${resultCounts.green + NUMBERS.ONE}`
            : `Red: ${resultCounts.red + NUMBERS.ONE} Green: ${resultCounts.green}`}
        </div>
        <Link
          to="/"
          onClick={() => {
            dispatch(setGameResult(null))
          }}
          className="button"
        >
          {'Play again'}
        </Link>
      </div>
    </div>
  )
}
