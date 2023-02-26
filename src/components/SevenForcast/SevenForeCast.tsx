import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Radio } from 'antd';

import { changeDayView, changeDay, currentDay } from '../../redux/slices/geoSlice';
import { RootState, useAppDispatch } from '../../redux/store';

import { IForcast } from '../../@types/forecast';

const SevenForeCast: FC = () => {
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
      <Radio.Group value={day} style={{ margin: '5px' }}>
        <Radio.Button>Прогноз на 7 дней:</Radio.Button>
        {sevenForcast?.map((item: IForcast, id: number) => {
          return (
            <Radio.Button key={item.date} value={id} onClick={() => changeForecast(item, id)}>
              {!id ? 'сегодня' : item.date}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    );
  }
  return null;
};

export default SevenForeCast;
