import React from 'react'

const SectionHeading = ({ heading }: { heading: string }) => {
  return (
    <div className="border-b border-gray-200 pb-5 mb-4">
      <h3 className="text-xl capitalize font-semibold leading-6 text-red-700">{heading}</h3>
    </div>
  )
}

export default SectionHeading