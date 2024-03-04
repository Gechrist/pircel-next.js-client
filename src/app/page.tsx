import styles from './page.module.css';
import LoadingSpinner from '@/components/loadingSpinner/loadingSpinnerComponent';
import dynamic from 'next/dynamic';

export type House = {
  id?: string;
  name?: string;
  houseColours?: string;
  founder?: string;
  animal?: string;
  element?: string;
  ghost?: string;
  commonRoom?: string;
  heads?: [{ id: string; firstName: string; lastName: string }];
  traits?: [{ id: string; name: string }];
};

export type ErrorMessage = {
  message: string;
};

async function searchHousesFunction(): Promise<House[] | ErrorMessage> {
  try {
    const response: Response = await fetch(
      'https://wizard-world-api.herokuapp.com/houses',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data: House[] = await response.json();
    if (data.length !== 0) {
      return data;
    } else {
      return { message: 'House not found' };
    }
  } catch (e: any) {
    return { message: 'Something went wrong' };
  }
}
const HouseComponent = dynamic(
  () => import('@/components/houseComponent/houseComponent'),
  {
    loading: () => <LoadingSpinner />,
  }
);

export default async function Home() {
  const houseData = await searchHousesFunction();

  // display error message if something is wrong
  if (Object.keys(houseData).includes('message')) {
    return (
      <main className={styles.main}>
        <div className={styles.error}>
          <span>{(houseData as ErrorMessage).message}</span>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <HouseComponent house={houseData as House[]} />
    </main>
  );
}
