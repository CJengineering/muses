import {  useSlack } from 'src/app/hooks';
import styles from './icon.module.css';
import { toast } from 'react-toastify';

export interface SlackIconProps {
    keyword: string;
    link:string;
  }
export default function SlackIcon({keyword,link}: SlackIconProps) {
    const { sendSlackMessage } = useSlack();
    const sendSlack = async (keyword: string, link:string) => {
        toast.success('Item sent to slack!');
        await sendSlackMessage(keyword, link);
      };
  return (
    <div className={styles.icon} onClick={() => sendSlack(keyword,link)}>
    <span className="material-symbols-outlined">tag</span>
  </div>
  )
}
