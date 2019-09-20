import React, { Component } from 'react'

import { Card, CardContent, CardActionArea, CardActions } from '@material-ui/core'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import DisplayImage from './DisplayImageComponent'
import MediaComponent from './MediaComponent'

import { projectService } from '../services/userServices'


const useStyles = makeStyles({
   card: {
      width: 345,
      // maxWidth: 345,
   },
   media: {
      height: 200,
   },
})

function ProjectSummary(props) {
   const classes = useStyles()

   let project = props.project
   let photo = project.photos[0]
   console.log(photo)
   return (
      <Card className={classes.card}>
         <CardActionArea>
            <DisplayImage
               photo={photo}
               height={200}
               title={project.title}
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  {project.desc}
               </Typography>
            </CardContent>
         </CardActionArea>
         <CardActions>
            <Button size="small" color="primary">
               Share
            </Button>
            <Button size="small" color="primary">
               Learn More
            </Button>
         </CardActions>
      </Card>
   )
}

export default class ProjectSummaries extends Component {
   state = {
      loading: true
   }

   componentWillMount() {
      projectService.getProj(this.props.userId)
         .then(res => {
            console.log(res)
            // let photo = projectDeets[0].photos[0]
            this.setState({
               projects: res,
               loading: false
            })
         })
         .catch(err => {
            console.log(err)
         })
   }

   render() {
      const loading = this.state.loading
      if (loading) {
         return 'Loading Projects...'
      }
      const projects = this.state.projects
      if (!projects || projects === []) {
         return 'There are no Projects'
      }
      const displayProjects = this.state.projects.map(project =>
         <ProjectSummary project={project} />
      )
      return (
         <div>
            <MediaComponent />
            {displayProjects}
         </div>
      )
   }
}
