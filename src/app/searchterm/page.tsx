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
      setErrorMessage({ message: '' });
      const response: Response = await fetch(requestString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: House[] = await response.json();
      setIsLoading(false);

      //check if search yielded results
      if (data.length !== 0) {
        setHouseData([...data]);
      } else {
        setErrorMessage({ message: 'House not found' });
      }
    } catch (e: any) {
      setIsLoading(false);
      setErrorMessage({ message: 'Something went wrong' });
    }
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
      {errorMessage.message.length > 0 && (
        <span className={styles.error}>{errorMessage.message}</span>
      )}
      {errorMessage.message.length === 0 &&
        !isLoading &&
        houseData.length > 0 && <HouseComponent house={houseData} />}
    </main>
  );
}
