import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'

function NewProject() {
   return (
      <div className={styles.newproject_container}>
         <h1>Criar Projeto</h1>
         <p>Crie o seu projeto para adicionar os serviços.</p>
         <ProjectForm btnText="Criar projeto"/>
      </div>
   )
}

export default NewProject;