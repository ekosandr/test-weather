import { useEffect } from 'react';
import { Card, Spin } from 'antd';
import { useSelector } from 'react-redux';

import styles from './CardForecast.module.css';

import { RootState, useAppDispatch } from '../../redux/store';
import { changeAllow, fetchForecast } from '../../redux/slices/geoSlice';
import { firstAddLocation, setLocations } from '../../redux/slices/newLocationSlice';

import Slide from './Slide/Slide';

const CardForecast = () => {
  const { isAllow, geolocation, day, status } = useSelector((state: RootState) => state.geo);
  const locations = useSelector((state: RootState) => state.locations.locations);
  const dispatch = useAppDispatch();

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(changeAllow(true));
      const promis = dispatch(
        fetchForecast({
          lat: String(position.coords.latitude),
          lon: String(position.coords.longitude),
        }),
      );
      setTimeout(() => {
        promis.abort();
      }, 10000);
      dispatch(
        firstAddLocation({
          lat: String(position.coords.latitude),
          lon: String(position.coords.longitude),
        }),
      );
    });
  };
  useEffect(() => {
    const storage = localStorage.getItem('locations');
    if (storage) {
      console.log(locations[0]);
      const firstLocation = JSON.parse(storage);
      dispatch(setLocations(firstLocation));
      dispatch(changeAllow(true));
      dispatch(fetchForecast(firstLocation[0]));
    } else {
      getGeoLocation();
    }
  }, []);

  useEffect(() => localStorage.setItem('locations', JSON.stringify(locations)), [locations]);

  if (!isAllow) {
    return (
      <>
        <Card className={styles.currentCard} bordered={false}>
          <h2>Предупреждение</h2>
          <p>Приложение не может определить геопозицию.</p>
          <p>Разрешите доступ к данным о вашем местоположении</p>
        </Card>
      </>
    );
  }

  if (status === 'error') {
    return (
      <h1>
        Что-то пошло не так, произошла ошибка или введены не корректные данные, попробуйте
        перезагрузить страничку
      </h1>
    );
  }
  if (day === 0 && geolocation.length) {
    return <Slide today={true} data={geolocation[0]} dayNumb={0} />;
  } else if (day !== 0) {
    return <Slide today={false} data={geolocation[0]} dayNumb={day} />;
  } else {
    return <Spin size="large" />;
  }
};

export default CardForecast;
