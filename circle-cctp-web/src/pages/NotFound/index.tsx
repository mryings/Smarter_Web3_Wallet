import React from 'react'

const NotFoundPage: React.FC<{}> = () => {
  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-gray-800 animate-bounce text-6xl font-bold">
          404
        </div>
        <p className="text-gray-600 mb-8 mt-2">Sorry,the page is not found！</p>
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 inline-block rounded-md px-6 py-3 text-sm font-semibold text-white shadow transition-colors"
        >
          Back To Home
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage
