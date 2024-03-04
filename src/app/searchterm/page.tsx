'use client';
import { useState } from 'react';
import { House } from '@/app/page';
import { ErrorMessage } from '@/app/page';
import styles from './page.module.css';
import HouseComponent from '@/components/houseComponent/houseComponent';
import LoadingSpinner from '@/components/loadingSpinner/loadingSpinnerComponent';

export default function SearchTerm() {
  const [houseData, setHouseData] = useState<Array<House>>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //get house data
  async function searchHousesFunction(formData: FormData) {
    let requestString: string;
    if (formData?.get('houseName')) {
      requestString = `http://localhost:4000/houses?name=${formData?.get(
        'houseName'
      )}`;
    } else {
      requestString = 'https://wizard-world-api.herokuapp.com/houses';
    }
    try {
      const response: Response = await fetch(requestString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: House[] = await response.json();
      setIsLoading(false);
      if (data.length !== 0) {
        setHouseData([...data]);
      } else {
        setErrorMessage({ message: 'House not found' });
      }
      console.log(isLoading);
    } catch (e: any) {
      setIsLoading(false);
      setErrorMessage({ message: 'Something went wrong' });
    }
  }

  // display error message if something is wrong
  if (errorMessage.message.length > 0) {
    return (
      <main className={styles.main}>
        <div className={styles.error}>
          {isLoading && <LoadingSpinner />}
          <span>{errorMessage.message}</span>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <form id="form" className={styles.form} action={searchHousesFunction}>
        <input name="houseName" type="text" />
        <button
          className={styles.button}
          type="submit"
          onClick={() => setIsLoading(true)}
        >
          Search House Name
        </button>
      </form>
      {isLoading && <LoadingSpinner />}
      {houseData && <HouseComponent house={houseData} />}
    </main>
  );
}
