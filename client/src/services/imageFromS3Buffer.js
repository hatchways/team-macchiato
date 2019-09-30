export default function (imgType, arrayBuffer) {
   let blob = new Blob([new Uint8Array(arrayBuffer)], { type: imgType })
   let urlCreator = window.URL || window.webkitURL
   let imageUrl = urlCreator.createObjectURL(blob)
   return {
      imageUrl,
      urlCreator
   }
}

// Also this:
// Don't forget to call revokeObjectURL() 
//  after onload fires to free up the memory
//  used to create the blob URL.