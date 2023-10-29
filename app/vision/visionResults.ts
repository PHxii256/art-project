import VisionResult from "./visionTypes";

async function DetectWebEntries(uploadedList : string[]){
    console.log("vision started!")

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();

    let prosessedImagesCount = 0; 
    let resultsList : VisionResult[] = []; //list of resultObj

    const resultsObj = {
          fileUri: "",
          fullMatchingResults: [], 
          partialMatchingResults: [], 
        };


    await Promise.all(uploadedList.map(async(uri)=>{
      await client.webDetection(uri).then((response : any) => 
      {
         resultsObj.fileUri = uri
         resultsObj.fullMatchingResults = response[0].webDetection.fullMatchingImages 
         resultsObj.partialMatchingResults = response[0].webDetection.partialMatchingImages 
         console.log(uri + ` has been processed! (${++prosessedImagesCount}/${uploadedList.length})`)
         resultsList.push(resultsObj);
      })
      // resultsObj.fullMatchingResults = result.webDetection.fullMatchingImages;
      // resultsObj.partialMatchingResults = result.webDetection.partialMatchingImages;
      return resultsList; //useless i think (test)
    })),{
      next:{
        revalidate: 0
      }
    }
    console.log(resultsList);
    return resultsList
  }

export default async function GetVisionResults(uploadedList : string[]) {

  const resultsList = await DetectWebEntries(uploadedList)
  return (resultsList)
}

