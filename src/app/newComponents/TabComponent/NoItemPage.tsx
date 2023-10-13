import { createPresentationLoading } from 'src/presentation/createPresentation';
import styles from './tabComponent.module.css';
import { useAppSelector } from 'src/app/hooks';
import Loader from '../Icons/Loader';
export default function NoItemPage() {
  const loader = useAppSelector(createPresentationLoading);

  return (
    <div className={styles.noItemsWrapper}>
     
      {loader ? (
        <Loader />
      ) : (
        <>

          <div className={styles.bigIconContainer}>
            <span className="material-symbols-outlined">unknown_document</span>
          </div>
          <div className={styles.textContainer}>
            <p>There are no results </p>
            <p>Check your filters( or Tim or your brain) </p>
          </div>
        </>
      )}
    </div>
  );
}
