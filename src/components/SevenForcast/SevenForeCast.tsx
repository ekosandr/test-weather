import { useSelector } from 'react-redux';
import { Radio } from 'antd';

import { changeDayView, changeDay, currentDay } from '../../redux/slices/geoSlice';
import { RootState, useAppDispatch } from '../../redux/store';

import { IForcast } from '../../@types/forecast';

const SevenForeCast = () => {
  const { sevenForcast, day, status } = useSelector((state: RootState) => state.geo);
  const dispatch = useAppDispatch();
  function changeForecast(day: IForcast, id: number) {
    if (id === 0) {
      dispatch(currentDay());
      dispatch(changeDay(id));
    } else {
      dispatch(changeDayView(day));
      dispatch(changeDay(id));
    }
  }
  if (status === 'success') {
    return (
      <div style={{ margin: '5px' }}>
        <Radio.Group value={day}>
          <Radio.Button>Прогноз на 7 дней:</Radio.Button>
          {sevenForcast?.map((item: IForcast, id: number) => {
            return (
              <Radio.Button key={id} value={id} onClick={() => changeForecast(item, id)}>
                {!id ? 'сегодня' : item.date}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
    );
  }
  return null;
};

export default SevenForeCast;
