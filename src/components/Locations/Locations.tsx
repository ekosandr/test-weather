import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Radio } from 'antd';
import { useSelector } from 'react-redux';

import { fetchForecast } from '../../redux/slices/geoSlice';
import {
  cancelLocationName,
  changeName,
  deleteLocation,
  editLocationName,
  setCurrentLocation,
} from '../../redux/slices/locationsSlice';
import { RootState, useAppDispatch } from '../../redux/store';

const Locations: React.FC = () => {
  const { locations, currrentLocation, locationsName, name } = useSelector(
    (state: RootState) => state.locations,
  );
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
    <div style={{ margin: '5px' }}>
      {locations.length > 1 ? (
        <Radio.Group value={currrentLocation}>
          {locationsName.map((item: string, id: number) => {
            return (
              <Radio.Button key={id} value={id} onClick={() => changeLocation(id)}>
                {!id ? 'Текущее место' : item}
                {id ? (
                  <>
                    <Popconfirm
                      title="Введите название для локации"
                      description={
                        <input
                          value={name}
                          onChange={(e) => dispatch(changeName(e.target.value))}
                        />
                      }
                      onConfirm={() => dispatch(editLocationName(id))}
                      onCancel={() => dispatch(cancelLocationName())}
                      okText="Сохранить"
                      cancelText="Отмена">
                      <EditOutlined style={{ marginLeft: '5px' }} />
                    </Popconfirm>

                    <DeleteOutlined
                      onClick={() => removeLocation(id)}
                      style={{ marginLeft: '7px' }}
                    />
                  </>
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
