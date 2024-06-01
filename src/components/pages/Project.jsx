import { useEffect, useState } from 'react';
import styles from './Project.module.css'
import { useParams } from 'react-router-dom';
import Loading from '../layouts/Loading';
import ProjectForm from '../project/ProjectForm';
import { ServiceForm } from '../service/ServiceForm';
import Container from '../layouts/Container';
import { Message } from '../layouts/Message';
import { ServiceCard } from '../service/ServiceCard';

import { parse, v4 as uuidv4 } from 'uuid';
 
function Project() {

   const { id } = useParams();
   
   const [project, setProject] = useState();
   const [services, setServices] = useState([])
   const [showProjectForm, setShowProjectForm] = useState(false);
   const [showServiceForm, setShowServiceForm] = useState(false);
   const [message, setMessage] = useState({});

   useEffect(() => {
      setTimeout(() => {         
         fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
               'Accept': 'application/json'
            }
         }).then(resp => resp.json())
         .then(data => {
            setProject(data)
            setServices(data.services);
         }).catch(err => console.log(err))
      }, 250);
   }, [id])

   function editPost(eProject) {
      setMessage('');

      if(eProject.budget < eProject.cost) {
         setMessage({
            text: 'O orçamento não pode ser menor que o custo do projeto!',
            type: 'error',
         });
         return;
      }

      fetch(`http://localhost:5000/projects/${eProject.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(eProject),
      }).then(resp => resp.json()).then((data) => {
         setProject(data);
         setShowProjectForm(false);
         setMessage({
            text: 'Projeto atualizado!',
            type: 'success',
         });
      }).catch(err => console.log(err))
   }

   function createService(sProject) {
      setMessage('');
      
      const lastService = sProject.services[sProject.services.length - 1];
      lastService.id = uuidv4();
      const lastServiceCost = lastService.cost;
      const newCost = parseFloat(sProject.cost) + parseFloat(lastServiceCost);

      if(newCost > parseFloat(sProject.budget)) {
         setMessage({
            text: 'Orçamento ultrapassado!',
            type: 'error',
         });
         sProject.services.pop();
         return;
      }

      sProject.cost = newCost;

      fetch(`http://localhost:5000/projects/${sProject.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(sProject),
      }).then(resp => resp.json()).then((data) => {
         sProject.cost = newCost;
         setShowServiceForm(false);
         // setMessage({
         //    text: 'Serviço atualizado!',
         //    type: 'success',
         // });
      }).catch(err => console.log(err))
      
   }

   function removeService() {
      
   }

   function toggleProjectForm() {
      setShowProjectForm(!showProjectForm)
   }

   function toggleServiceForm() {
      setShowServiceForm(!showServiceForm)
   }

   return (
      <>
         {project ? (
         <div className={styles.project_details}>          
            <Container customClass='column'>
               {message && <Message text={message.text} type={message.type}/>}
               <div className={styles.details_container}>
                  <h1><span>Projeto:</span> {project.name}</h1>
                  <button className={styles.btn} type="button" onClick={toggleProjectForm}>
                     {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                  </button>
                  {!showProjectForm ? (
                     <div className={styles.project_info}>
                        {/* <p><span>Categoria: </span> {project.category.name}</p> */}
                        <p><span>Total de orçamento</span> R${project.budget}</p>
                        <p><span>Total utilizado</span> R${project.cost}</p>
                     </div>
                  ) : (
                     <div className={styles.project_info}>
                        <h1>Editar</h1>
                        <ProjectForm handleSubmit={editPost} btnText="Confirmar edição" projectData={project}/>
                     </div>
                  )}
               </div>
               <div className={styles.service_form_container}>
                  <h2>Adicione um serviço:</h2>
                  <button className={styles.btn} type="button" onClick={toggleServiceForm}>
                     {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                  </button>
                  <div className={styles.project_info}>
                     {showServiceForm && (
                        <div className={styles.project_info}>
                           <ServiceForm handleSubmit={createService} btnText="Adicionar serviço" projectData={project}/>
                        </div>
                     )}
                  </div>
               </div>
               <h2>Serviços</h2>
               <Container customClass="start">
                  {services.length > 0 ? (
                     services.map((service) => (
                        <ServiceCard serviceData={service} handleRemove={removeService} key={service.id}/>
                     ))
                  ) : (
                     <p>Não há serviços cadastrados!</p>
                  )}
               </Container>
            </Container>
         </div>
         ) : <Loading/>}
      </>
   )
}

export default Project;