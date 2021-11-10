import styles from './ingridient.module.css'

const Ingridient = (props) => {
  return(
    <>
    <img className={`${styles.image} ml-4 mr-4`}src={props.image_large} alt={props.name}/>

    </>
  )
}

export default Ingridient;
