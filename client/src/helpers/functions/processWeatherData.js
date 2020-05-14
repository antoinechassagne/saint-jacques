import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const processWeatherData = (data) => {
  if (!data["waves_height-surface"][0]) {
    return false;
  }
  return data.ts.map((ts, i) => ({
    date: moment(ts),
    waveHeight: parseFloat(data["waves_height-surface"][i].toFixed(2)),
  }));
};

export default processWeatherData;
