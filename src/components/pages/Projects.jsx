import { useLocation } from "react-router-dom";

import { Message } from "../layouts/Message";
import Container from '../layouts/Container'

import LinkButton from "../layouts/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layouts/Loading";
import styles from './Project.module.css'
import { useEffect, useState } from "react";

function Projects() {

   const [projects, setProjects] = useState([]);
   const [removerLoading, setRemoveLoading] = useState(false);

   const location = useLocation();
   let message = '';

   if (location.state) {
      message = location.state.message;
   }

   useEffect(() => {

      setTimeout(() => {
         fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
               'Accept': 'application/json'
            }
         }).then(resp => resp.json()).then(data => {
            setProjects(data)
            setRemoveLoading(true);
         }).catch(err => console.log(err))
      }, 1000)

   }, [])

   return (
      <div className={styles.project_container}>
         <div className={styles.title_container}>
            <h1>Meus projetos</h1>
            <LinkButton to='/newProject' text='Novo projeto'></LinkButton>
         </div>
         {message && <Message type="success" msg={message}/>}
         <Container customClass="start">
            {projects.length > 0 && projects.map((project) => (
               <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id}/>
            ))}
            {!removerLoading && <Loading/>}
            {removerLoading && projects.length === 0 &&
               <p>Não há projetos cadastrados</p>
            }
         </Container>
      </div>
   )
}

export default Projects;