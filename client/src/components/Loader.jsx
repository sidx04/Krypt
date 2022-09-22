import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-3 ">
      <div class="flex items-center gap-2 text-gray-500">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-red-500"/>
      </div>
    </div>
  )
}

export default Loader

    