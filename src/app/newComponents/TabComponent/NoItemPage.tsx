import styles from './tabComponent.module.css'

export default function NoItemPage() {
  return (
    <div className={styles.noItemsWrapper}>
        <div className={styles.bigIconContainer}>
            <span className="material-symbols-outlined">
                unknown_document
            </span>
        </div>
       <div className={styles.textContainer}>
        <p>There are no results </p>
        <p>Check your filters( or Tim or your brain) </p>
       </div>
    </div>
  )
}
