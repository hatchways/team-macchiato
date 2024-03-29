import React, { Component } from 'react'

import imageFromBuffer from '../services/imageFromS3Buffer'

import { CardMedia } from '@material-ui/core'

export default function (props) {
   let photo = props.photo
   let imageUrl = ''
   if (photo) {
      // photo = JSON.parse(photo)
      let imgType = photo.ContentType
      let arrayBuffer = photo.Body.data

      imageUrl = imageFromBuffer(imgType, arrayBuffer)
   } else {
      imageUrl = "https://via.placeholder.com/345x200"
   }
   return (
      <CardMedia
         style={{ height: 300 }}
         image={imageUrl}
         title={props.title}
      />
      // The Above display image as background of div
      // This is display image as img
      // <CardMedia
      //    component="img"
      //    alt={props.title}
      //    // height={props.height}
      //    image={imageUrl}
      //    title={props.title}
      // />
   )
}

export function DisplayImageAsImage(props) {
   let photo = props.photo
   let imageUrl = ''
   if (photo) {
      // photo = JSON.parse(photo)
      let imgType = photo.ContentType
      let arrayBuffer = photo.Body.data

      imageUrl = imageFromBuffer(imgType, arrayBuffer)
   } else {
      imageUrl = "https://via.placeholder.com/345x200"
   }
   return (
      <img src={imageUrl} />
   )
}
// class DisplayImageComponent extends Component {
//    state = {
//       src: '',
//       revoker: ''
//    }

//    componentWillMount() {
//       projectService.getProj(25)
//          .then(res => {
//             let projectDeets = res
//             let photo = projectDeets[0].photos[0]

//             let imgType = photo.ContentType
//             let arrayBuffer = photo.Body.data

//             let { imageUrl, urlCreator } = imageFromBuffer(imgType, arrayBuffer)

//             this.setState({ src: imageUrl })

//             setTimeout(() => {
//                urlCreator.revokeObjectURL(imageUrl)
//                // Free up memory after a few seconds (to let img render)
//             }, 5000)
//          })
//    }

//    render() {

//       return (
//          <div>
//             projectDeets
//             <img src={this.state.src} />
//          </div>
//       )
//    }
// }
