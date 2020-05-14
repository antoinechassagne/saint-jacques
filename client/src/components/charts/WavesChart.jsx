import React from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryPortal,
  VictoryLabel,
  VictoryTheme,
} from "victory";
import processWeatherData from "../../helpers/functions/processWeatherData";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const WavesChart = (props) => {
  const data = processWeatherData(props.data, "waves_height-surface");

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
        width={props.width}
        height={props.height}
      >
        <VictoryAxis
          tickFormat={(x) => {
            const date = moment(x).calendar();
            return date.charAt(0).toUpperCase() + date.slice(1);
          }}
          tickLabelComponent={
            <VictoryPortal>
              <VictoryLabel />
            </VictoryPortal>
          }
          style={{
            tickLabels: {
              fontSize: 6,
              angle: -45,
              padding: 10,
              textAnchor: "end",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y}m`}
          style={{
            tickLabels: { fontSize: 6 },
          }}
        />
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
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    );
  };

  return content();
};

export default WavesChart;
