import { CloseOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { useSelector } from 'react-redux';

import { fetchForecast } from '../../redux/slices/geoSlice';
import { deleteLocation, setCurrentLocation } from '../../redux/slices/newLocationSlice';
import { RootState, useAppDispatch } from '../../redux/store';

import { ILocation } from '../../@types/coordinate';

const Locations = () => {
  const { locations, currrentLocation } = useSelector((state: RootState) => state.locations);
  const dispatch = useAppDispatch();
  function changeLocation(item: ILocation, id: number) {
    dispatch(fetchForecast({ lat: item.lat, lon: item.lon }));
    dispatch(setCurrentLocation(id));
  }
  function removeLocation(id: number) {
    dispatch(deleteLocation(id));
    if (id === currrentLocation) {
      dispatch(setCurrentLocation(0));
      dispatch(fetchForecast(locations[0]));
    }
  }
  return (
    <div style={{ margin: '5px' }}>
      {locations.length > 1 ? (
        <Radio.Group value={currrentLocation}>
          {locations.map((item: ILocation, id: number) => {
            return (
              <Radio.Button key={id} value={id} onClick={() => changeLocation(item, id)}>
                {!id ? 'Текущее место' : `${item.lat}:${item.lon}`}
                {id ? (
                  <CloseOutlined onClick={() => removeLocation(id)} style={{ marginLeft: '7px' }} />
                ) : (
                  ''
                )}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      ) : (
        ''
      )}
    </div>
  );
};

export default Locations;
