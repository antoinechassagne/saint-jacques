import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryPortal,
  VictoryLabel,
  VictoryTheme, VictoryBar,
} from "victory";
import processWeatherData from "../../helpers/functions/processWeatherData";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const TempChart = (props) => {
  console.log(props.data)

  const rawData = processWeatherData(props.data, "temp-surface").map((el)=>{
    return {
      x: el.x,
      y: (el.y - 273.15)
    };
  });
  const data = rawData.splice(0, Math.floor(rawData.length / 2));


  const content = () => {
    if (!data) {
      return (
        <span className="d-block mt--m error">
          Une erreur s'est produite lors du chargement des données.
        </span>
      );
    }
    return (
        <div>
            <h4>Température</h4>
            <VictoryChart
                maxDomain={{ y: 40 }}
                minDomain={{ y: 0 }}
                animate={{ duration: 1000 }}
                theme={VictoryTheme.material}
                width={props.width}
                height={props.height}
                // scale={{ x: "time", y: "linear" }}
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
                            angle: 0,
                            padding: 10,
                            textAnchor: "middle",
                        },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(y) => `${y} s`}
                    style={{
                        tickLabels: { fontSize: 6 },
                    }}
                />
                <VictoryLine
                    data={data}
                    interpolation="natural"
                    labels={({ datum }) => `${datum.y.toFixed(1)} °C`}
                    style={{
                        data: {
                            stroke: "cyan",
                            fillOpacity: 0.4,
                            strokeWidth: 2,
                        },
                        labels: {
                            fill: "cyan",
                            fontSize: 6,
                            fontWeight: 600,
                        },
                    }}
                />
            </VictoryChart>
        </div>

    );
  };

  return content();
};

export default TempChart;
