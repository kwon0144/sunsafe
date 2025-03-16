import { useEffect } from "react";
import * as echarts from "echarts";

const UVChart = () => {
    useEffect(() => {
        const chartDom = document.getElementById("uvChart");
        if (!chartDom) return;
    
        const myChart = echarts.init(chartDom);
        const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
        const uvData = [2, 4, 6, 8, 10, 11, 9, 7, 5, 3];
    
        const option = {
          animation: false,
          tooltip: {
            trigger: "axis",
            formatter: "{b}: {c}",
          },
          xAxis: {
            type: "category",
            data: hours,
            axisLabel: {
              color: "#666",
            },
          },
          yAxis: {
            type: "value",
            min: 0,
            max: 12,
            interval: 2,
            axisLabel: {
              color: "#666",
            },
          },
          series: [
            {
              data: uvData,
              type: "line",
              smooth: true,
              lineStyle: {
                color: "#6366f1",
              },
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(99, 102, 241, 0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(99, 102, 241, 0.1)",
                    },
                  ],
                },
              },
            },
          ],
        };
    
        myChart.setOption(option);
    
        return () => {
          myChart.dispose();
        };
      }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Today's UV Forecast</h2>
      <div id="uvChart" style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default UVChart;