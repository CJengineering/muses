import { useAppDispatch, useUpdateArchive } from 'src/app/hooks';
import styles from './icon.module.css';
import { selectedPostFiltred } from 'src/features/posts/postsSlice';
export interface ArchiveIconProps {
    id?: number;
}
export default function ArchiveIcon({id}:ArchiveIconProps) {
    const dispatch = useAppDispatch()
    const { updateArchive } = useUpdateArchive();
    const handleArchive = async (id: number)=>{
        dispatch(selectedPostFiltred(id));
        await updateArchive(id)
      }
  return (
    <div className={styles.icon} onClick={() =>id && handleArchive(id)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z" />
      </svg>
    </div>
  );
}
