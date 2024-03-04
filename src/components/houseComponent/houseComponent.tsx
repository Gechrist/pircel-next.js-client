'use client';
import { verdanaBold } from '@/fonts/font';
import styles from './houseComponent.module.css';
import validateColor from 'validate-color';
import { House } from '@/app/page';

export default function HouseComponent({ house }: { house: Array<House> }) {
  return (
    <div className={styles.housesContainer}>
      {house.map((house: any) => (
        <div className={styles.house} key={house.id}>
          <div className={styles.houseNameAnimal}>
            <p style={{ fontSize: '24px' }} className={verdanaBold.className}>
              {house.name}
            </p>
            <p style={{ fontSize: '12px' }}>{house.animal}</p>
          </div>
          <div className={styles.houseColours}>
            {validateColor(house.houseColours.split(' ')[0]) &&
            validateColor(house.houseColours.split(' ')[2]) ? (
              <div>
                <p
                  style={{
                    backgroundImage: `linear-gradient(to right,${
                      house.houseColours.split(' ')[0]
                    },${house.houseColours.split(' ')[2]})`,
                    borderRadius: '4px',
                  }}
                >
                  &nbsp;
                </p>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    backgroundImage: `linear-gradient(to right,white,black)`,
                    borderRadius: '4px',
                  }}
                >
                  &nbsp;
                </p>
              </div>
            )}
          </div>
          <div style={{ fontSize: '12px' }} className={styles.houseFounder}>
            <p>Founder:</p>{' '}
            <p className={verdanaBold.className}>{house.founder}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
