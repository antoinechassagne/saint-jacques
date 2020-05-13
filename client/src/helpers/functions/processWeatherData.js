import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const processWeatherData = (data) => {
  if (!data["waves_height-surface"][0]) {
    return false;
  }
  return data.ts.map((ts, i) => {
    const waveHeight = parseFloat(data["waves_height-surface"][i].toFixed(2));
    return {
      date: moment(ts),
      label: `${moment(ts).calendar()} - ${waveHeight}`,
      waveHeight,
      unit: data.units["waves_height-surface"],
    };
  });
};

export default processWeatherData;
