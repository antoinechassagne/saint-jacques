import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const processWeatherData = (data, dataLabel) => {
  if (!data[dataLabel][0]) {
    return false;
  }
  return data.ts.map((ts, i) => ({
    date: moment(ts),
    waveHeight: parseFloat(data[dataLabel][i].toFixed(2)),
  }));
};

export default processWeatherData;
