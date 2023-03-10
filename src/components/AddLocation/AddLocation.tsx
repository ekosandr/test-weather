import { FC } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';

import { changeDay, fetchForecast } from '../../redux/slices/geoSlice';
import { addLocation, onChangeLat, onChangeLon } from '../../redux/slices/locationsSlice';
import { RootState, useAppDispatch } from '../../redux/store';

import styles from './AddLocation.module.css';

const AddLocation: FC = () => {
  const dispatch = useAppDispatch();
  const lat = useSelector((state: RootState) => state.locations.lat);
  const lon = useSelector((state: RootState) => state.locations.lon);
  const isAllow = useSelector((state: RootState) => state.geo.isAllow);
  function addNewLocation() {
    dispatch(addLocation());
    dispatch(fetchForecast({ lat: lat, lon: lon }));
    dispatch(changeDay(0));
  }
  return (
    <>
      {!isAllow ? (
        <Input
          placeholder="Широта (например: 59.8)"
          style={{ width: '20%', marginRight: '5px' }}
          value="Разрешите доступ для добавления новых мест"
        />
      ) : (
        <>
          <Input
            placeholder="Широта (например: 59.8)"
            style={{ width: '15%', marginRight: '5px' }}
            value={lat}
            onChange={(e) => dispatch(onChangeLat(e.target.value))}
          />
          <Input
            value={lon}
            onChange={(e) => dispatch(onChangeLon(e.target.value))}
            placeholder="Долгота (например: 30.2)"
            style={{ width: '15%' }}
          />
          <Button
            className={styles.btn}
            type="primary"
            style={{ marginLeft: '5px' }}
            disabled={lat !== '' && lon !== '' ? false : true}
            onClick={addNewLocation}>
            Добавть локацию
          </Button>
        </>
      )}
    </>
  );
};

export default AddLocation;
