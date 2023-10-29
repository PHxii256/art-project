import React, { Suspense } from 'react'
import GetVisionResults from './visionResults'
import Loading from '../loading'
import {data} from './data'
import ResultsUi from './resultsUi'



export default async function page() {

  const uploadedList = ["public/camus.jpg","public/GEAR5TEST.png","public/nanamiSS.png", "public/YoruBG.jpg"]
  //const results = await GetVisionResults(uploadedList)

  return (
    <div>
      <ResultsUi data={data}/>
    </div>
  )
}
