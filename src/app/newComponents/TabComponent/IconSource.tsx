 import styles from "./tabComponent.module.css"
 interface IconProps {
  url:string;
}
export default function IconSource(props: IconProps) {
  return (
    <div className={styles.iconSource}>

      <img  src={props.url} alt="" style={{ width: '24px', height: '24px' }} />
    </div>
  )
}
