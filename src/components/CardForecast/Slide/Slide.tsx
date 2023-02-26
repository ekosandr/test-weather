import { FC } from 'react';
import { Card } from 'antd';
import classNames from 'classnames/bind';

import { IForecasts } from '../../../@types/forecast';

import getLocallyTime from '../../../utils/getLocallyTime';
import getLocationName from '../../../utils/getLocationName';

import styles from './Slide.module.css';

type SlideProps = {
  today: boolean;
  data: IForecasts;
  dayNumb: number;
};

const Slide: FC<SlideProps> = ({ today, data, dayNumb }) => {
  const cn = classNames.bind(styles);
  const dayNotToday = data.forecasts[dayNumb].parts.day;
  return (
    <Card
      className={cn('currentCard', {
        imgBack1: dayNumb === 0,
        imgBack2: dayNumb === 1,
        imgBack3: dayNumb === 2,
        imgBack4: dayNumb === 3,
        imgBack5: dayNumb === 4,
        imgBack6: dayNumb === 5,
        imgBack7: dayNumb === 6,
      })}
      bordered={false}>
      <>
        <p className={styles.location}>{getLocationName(data)}</p>
        {today ? (
          <p className={styles.time}>МЕСТНОЕ ВРЕМЯ {getLocallyTime(data)}</p>
        ) : (
          <p className={styles.time}> {data.forecasts[dayNumb].date}</p>
        )}

        <div className={styles.coord}>
          <p>ШИРОТА: {data.info.lat}</p>
          <p>ДОЛГОТА: {data.info.lon}</p>
        </div>
        {today ? (
          <p className={styles.tempMain}>{data.fact.temp}℃</p>
        ) : (
          <div className={styles.maxMin}>
            <p className={styles.tempAvg}>
              <span className={styles.descT}>средняя</span>
              {dayNotToday.temp_avg}℃{' '}
            </p>
            <span className={styles.descT}>
              макс {dayNotToday.temp_max}℃ / мин {dayNotToday.temp_min}℃
            </span>
          </div>
        )}
        <div className={cn({ temp: true, tempFeel: !today })}>
          <p>ощущается как {today ? data.fact.feels_like : dayNotToday.feels_like} ℃</p>
        </div>
        <div className={styles.other}>
          <p>Погода: {today ? data.fact.condition : dayNotToday.condition}</p>
          <p>Скорость ветра: {today ? data.fact.wind_speed : dayNotToday.wind_speed} м/с</p>
          <p>
            Атмосферное давление: {today ? data.fact.pressure_mm : dayNotToday.pressure_mm} мм.рт.ст
          </p>
          <p>Влажность: {today ? data.fact.humidity : dayNotToday.humidity}%</p>
        </div>
      </>
    </Card>
  );
};

export default Slide;
