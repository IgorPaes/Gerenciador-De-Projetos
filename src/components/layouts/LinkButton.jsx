import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css'

function LinkButton({ link, text }) {
   return (
      <Link className={styles.btn} to={link}>
         {text}
      </Link>
   );
}

export default LinkButton;