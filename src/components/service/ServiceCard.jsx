import styles from '../project/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

export function ServiceCard({serviceData, handleRemove}) {

   const remove = (e) => {
      e.preventDefault()
      handleRemove(serviceData.id, serviceData.cost)
   }

   return (
      <div className={styles.project_card}>
         <h1>{serviceData.name}</h1>
         <p>
            <span>Custo total:</span> R$ {serviceData.cost}
         </p>
         <p>{serviceData.description}</p>
         <div className={styles.project_card_actions}>
            <button onClick={remove}>
               <BsFillTrashFill/> Excluir
            </button>
         </div>
      </div>
   )
}