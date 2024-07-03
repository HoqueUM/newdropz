import React from 'react'
import SectionTitle from './SectionTitle'
import GetNewDrops from './GetNewDrops'

const SectionModel = ({brand} : {brand : string}) => {
  return (
    <>
    <SectionTitle brand={brand} />
    <div className='flex flex-wrap gap-4 justify-center items-center'>
        <GetNewDrops brand={brand} />
    </div>
    </>
  )
}

export default SectionModel