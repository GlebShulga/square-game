import React from 'react'
import CreateSquare from './common/CreateSquare'
import Rules from './common/Rules'
import Head from './Head'

const MainPage = () => {
  return (
    <div>
      <Head title="Square Game" />
      <div className="grid-cols-2 h-screen">
        <div className="flex justify-items justify-center pl-5">
          <Rules />
        </div>
        <div className="max-w-2xl px-5 m-auto w-full flex justify-items justify-center">
          <div className="bg-purple-300 w-2/3 text-white font-bold rounded-lg border shadow-lg p-10">
            <CreateSquare />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MainPage)