import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Popconfirm, Radio } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { fetchForecast } from '../../redux/slices/geoSlice';
import {
  cancelLocationName,
  changeName,
  deleteLocation,
  editLocationName,
  setCurrentLocation,
} from '../../redux/slices/locationsSlice';
import { RootState, useAppDispatch } from '../../redux/store';

const Locations: FC = () => {
  const locations = useSelector((state: RootState) => state.locations.locations);
  const currrentLocation = useSelector((state: RootState) => state.locations.currrentLocation);
  const locationsName = useSelector((state: RootState) => state.locations.locationsName);
  const name = useSelector((state: RootState) => state.locations.name);
  const dispatch = useAppDispatch();

  function changeLocation(id: number) {
    dispatch(fetchForecast(locations[id]));
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
    <Radio.Group value={currrentLocation} style={{ margin: '5px' }}>
      {locationsName.map((item: string, id: number) => (
        <Radio.Button key={id} value={id} onClick={() => changeLocation(id)}>
          {item}
          <Popconfirm
            title="Введите название для локации"
            description={
              <input value={name} onChange={(e) => dispatch(changeName(e.target.value))} />
            }
            onConfirm={() => dispatch(editLocationName(id))}
            onCancel={() => dispatch(cancelLocationName())}
            okText="Сохранить"
            cancelText="Отмена">
            <EditOutlined style={{ marginLeft: '5px' }} />
          </Popconfirm>
          {id ? (
            <DeleteOutlined onClick={() => removeLocation(id)} style={{ marginLeft: '7px' }} />
          ) : (
            ''
          )}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default Locations;
