import React from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryTooltip,
  VictoryTheme,
} from "victory";
import processWeatherData from "../../helpers/functions/processWeatherData";

const WavesChart = (props) => {
  const data = processWeatherData(props.data);
  const content = () => {
    if (!data) {
      return (
        <span className="d-block mt--m error">
          Une erreur s'est produite lors du chargement des données.
        </span>
      );
    }
    return (
      <VictoryChart
        animate={{ duration: 1000 }}
        theme={VictoryTheme.material}
        width={400}
        height={200}
      >
        <VictoryArea
          data={data}
          interpolation={"basis"}
          x="date"
          y="waveHeight"
          labelComponent={<VictoryTooltip />}
          style={{
            data: {
              fill: "cyan",
              stroke: "cyan",
              fillOpacity: 0.4,
              strokeWidth: 3,
            },
            labels: {
              fontSize: 3,
              fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
            },
          }}
        />
      </VictoryChart>
    );
  };

  return content();
};

export default WavesChart;
