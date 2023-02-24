import { IForecasts } from '../@types/forecast';

export default function getLocallyTime(location: IForecasts) {
  const time = new Date(location.now_dt);
  const offset = location.info.tzinfo.offset;
  return `${time.getHours() + offset / 3600 - 3}:${time.getMinutes()}`;
}
