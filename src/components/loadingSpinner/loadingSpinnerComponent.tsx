import Image from 'next/image';
import styles from './loadingSpinner.module.css';

export default function loadingSpinner() {
  return (
    <div className={styles.spinner}>
      <Image
        src={'/loadingSpinner.svg'}
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
}
