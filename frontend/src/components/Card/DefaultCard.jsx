import React from 'react'

const DefaultCard = ({ tittle , Score}) => {
  return (
    <div className="max-w-sm w-87 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tittle}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{Score}</p>
 
</div>
  )
}

export default DefaultCard