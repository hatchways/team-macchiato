import React, { Component } from 'react'

import { Container, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core'
import { Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import DisplayImage from './DisplayImageComponent'
import MediaComponent from './MediaComponent'

import ProjectDetailModal from '../pages/ProjectDetail'

import { projectService } from '../services/userServices'

const useStyles = makeStyles({
   card: {
      margin: 10,
      maxWidth: '45%',
   },
   media: {
      height: 200,
   }
})

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
      loading: true,
      showModal: false
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

   handleClick = (e) => {
      console.log(e.currentTarget.parentNode.id)
      this.setState({ showModal: true })
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
      if (!projects || projects === []) {
         return 'There are no Projects'
      }

      const projsContainer = {
         display: 'flex',
         flexDirection: 'row',
         flexWrap: 'wrap',
         // width: '50%',
         maxWidth: '70%',
         margin: '0 auto',
      }
      const mediaComponent = {
         flexBasis: '33.3333333333 %',
         // width: '33.3333333333 %',
         maxWidth: '50%',
         padding: '0 10px',
         boxSizing: 'border-box',
      }
      const displayProjects = this.state.projects.map(project =>
         <ProjectSummary project={project}
            onClick={this.handleClick}
            style={mediaComponent}
            key={project.id} />
      )
      return (
         <Container style={projsContainer} id="ProjectContainer">
            <ProjectDetailModal show={this.state.showModal}
               onHide={this.handleModalClose} />
            {/* <MediaComponent style={mediaComponent} />
            <MediaComponent style={mediaComponent} />
            <MediaComponent style={mediaComponent} />
            <MediaComponent style={mediaComponent} />
            <MediaComponent style={mediaComponent} />
            <MediaComponent style={mediaComponent} /> */}
            {displayProjects}
         </Container>
      )
   }
}
