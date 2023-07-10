import React from 'react'
import { Link } from 'react-router-dom'
import { NUMBERS, WIN } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { gameResult, resultCount, setGameResult } from '../../redux/slices/gameFiledSlice'

export const Result = () => {
  const dispatch = useAppDispatch();
  const gameResults = useAppSelector(gameResult);
  const resultCounts = useAppSelector(resultCount);

  return (
    <div>
      <div className="bg-blue-900 text-white font-bold rounded-lg border shadow-lg p-10 grid grid-rows-2 opacity-100">
        <div className="flex justify-center text-3xl pb-1">{gameResults}</div>
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
          className="border rounded bg-teal-300 p-2 mt-3 hover:text-pink-500 text-center"
        >
          {'Play again'}
        </Link>
      </div>
    </div>
  )
}
