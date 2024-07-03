import React from 'react'
import FormatOutput from '@/utils/FormatOutput';

const GetNewDrops = ({ brand }: { brand: string }) => {
  return (
    <FormatOutput brand={brand} />
  )
}

export default GetNewDrops