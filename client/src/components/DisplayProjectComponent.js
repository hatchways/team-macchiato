import React, { Component } from 'react'

import { projectService } from '../services/userServices'

import imageFromBuffer from '../services/imageFromS3Buffer'

export default class DisplayProjectComponent extends Component {
   state = {
      src: '',
      revoker: ''
   }

   componentWillMount() {
      projectService.getProj(25)
         .then(res => {
            let projectDeets = res
            let photo = projectDeets[0].photos[0]

            let imgType = photo.ContentType
            let arrayBuffer = photo.Body.data

            let { imageUrl, urlCreator } = imageFromBuffer(imgType, arrayBuffer)

            this.setState({ src: imageUrl })

            setTimeout(() => {
               urlCreator.revokeObjectURL(imageUrl)
               // Free up memory after a few seconds (to let img render)
            }, 5000)
         })
   }

   render() {

      return (
         <div>
            projectDeets
            <img src={this.state.src} />
         </div>
      )
   }
}
