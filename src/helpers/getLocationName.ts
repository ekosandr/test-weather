import { IForecasts } from '../@types/forecast';

export default function getLocationName(location: IForecasts): string {
  if (location.geo_object.locality) {
    return location.geo_object.locality.name;
  } else if (location.geo_object.province) {
    return location.geo_object.province.name;
  } else if (location.geo_object.country) {
    return location.geo_object.country.name;
  } else {
    return 'Возможно где-то в море';
  }
}
