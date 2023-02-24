interface ITzinfo {
  name: string;
  abbr: string;
  dst: boolean;
  offset: number;
}
interface IInfo {
  n: boolean;
  geoid: number;
  url: string;
  lat: number;
  lon: number;
  tzinfo: ITzinfo;
  def_pressure_mm: number;
  def_pressure_pa: number;
  slug: string;
  zoom: number;
  nr: boolean;
  ns: boolean;
  nsr: boolean;
  p: boolean;
  f: boolean;
  _h: boolean;
}
interface IDistrict {
  id: number;
  name: string;
}
interface ILocality extends IDistrict {}
interface IProvince extends IDistrict {}
interface ICountry extends IDistrict {}
interface IParts {
  day: {
    temp_min: number;
    temp_avg: number;
    temp_max: number;
    feels_like: number;
    condition: string;
    wind_speed: number;
    pressure_mm: number;
    humidity: number;
  };
}
export interface IForcast {
  date: string;
  date_ts: number;
  week: number;
  sunrise: string;
  sunset: string;
  set_end: string;
  moon_code: number;
  moon_text: string;
  parts: IParts;
  hours: [];
  biomet: {
    index: number;
    condition: string;
  };
}

interface IFact {
  obs_time: number;
  uptime: number;
  temp: number;
  feels_like: number;
  temp_water: number;
  icon: string;
  condition: string;
  cloudness: number;
  prec_type: number;
  prec_prob: number;
  prec_strength: number;
  is_thunder: boolean;
  wind_speed: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  daytime: string;
  polar: boolean;
  season: string;
  source: string;
  accum_prec: {
    1: number;
    3: number;
    7: number;
  };
  soil_moisture: number;
  soil_temp: number;
  uv_index: number;
  wind_gust: number;
}
export interface IForecasts {
  now: number;
  now_dt: string;
  info: IInfo;
  geo_object: {
    district: IDistrict | null;
    locality: ILocality | null;
    province: IProvince | null;
    country: ICountry | null;
  };
  yesterday: { temp: number };
  fact: IFact;
  forecasts: IForcast[];
}
