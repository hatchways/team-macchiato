import React, { Component } from 'react'

import { Grid, Container, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core'
import { Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import Masonry from 'react-masonry-component'

import DisplayImage from './DisplayImageComponent'
import MediaComponent from './MediaComponent'

import ProjectDetailModal from '../pages/ProjectDetail'

import { projectService } from '../services/userServices'

const useStyles = makeStyles({
   card: {
      margin: 10,
      width: 345,
   },
   media: {
      height: 140,
   },
});

function ProjectSummary(props) {
   const classes = useStyles()

   let project = props.project
   let photo = project.photos[0]
   console.log(project)
   return (
      <Card className={classes.card} id={'project_' + project.id}>
         <CardActionArea onClick={props.onClick}>
            <DisplayImage
               photo={photo}
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
      loading: true,
      showModal: true,
      projectToShow: 0
   }

   componentWillMount() {
      projectService.getProj(this.props.userId)
         .then(res => {
            // console.log(res)
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

   handleClick = (i) => {
      console.log("You have clicked on " + i)
      console.log(this.state.projects[i])
      this.setState({ showModal: true, projectToShow: i })
   }
   handleModalClose = () => {
      this.setState({ showModal: false })
   }

   render() {
      const loading = this.state.loading
      if (loading) {
         return 'Loading Projects...'
      }
      const projects = this.state.projects
      if (!projects || projects.length === 0) {
         return 'There are no Projects'
      }

      const mediaComponent = {
         flexBasis: '33.3333333333 %',
         // width: '33.3333333333 %',
         maxWidth: '50%',
         padding: '0 10px',
         boxSizing: 'border-box',
      }
      const displayProjects = this.state.projects.map((project, i) =>
         <ProjectSummary project={project}
            onClick={() => this.handleClick(i)}
            style={mediaComponent}
            key={project.id} />
      )
      return (
         <>
            <ProjectDetailModal show={this.state.showModal}
               onHide={this.handleModalClose}
               projectDetails={this.state.projects[this.state.projectToShow]} />
            <Masonry elementType={'div'}>
               {/* <MediaComponent style={mediaComponent} />
               <MediaComponent style={mediaComponent} /> */}
               {displayProjects}
            </Masonry>
         </>
      )
   }
}
