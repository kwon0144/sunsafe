import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

interface LineChartProps {
  title?: string;
  xAxisData: string[];
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
  height?: string;
  className?: string;
  yAxisUnit?: string;
}

const LineChart = ({ title, xAxisData, series, height = '400px', className = '', yAxisUnit = 'Number of Cases' }: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize the chart
    chartInstance.current = echarts.init(chartRef.current);

    const option: ECBasicOption = {
      animation: false,
      title: title ? {
        text: title,
        left: 'center',
        top: '20px',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        padding: [0, 0, 20, 0]
      } : undefined,
      tooltip: {
        trigger: 'axis',
        confine: true // Keeps tooltip within chart bounds
      },
      legend: {
        data: series.map(s => s.name),
        bottom: '0',
        type: 'scroll', // Makes legend scrollable if too wide
        textStyle: {
          fontSize: 12
        },
        padding: [8, 0]
      },
      grid: {
        left: '7%',
        right: '5%',
        top: title ? '20%' : '5%',
        bottom: '15%',
        containLabel: true // Ensures axis labels are visible
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 'auto', // Auto-adjusts label display
          rotate: window.innerWidth < 768 ? 45 : 0, // Rotates labels on mobile
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        name: yAxisUnit,
        nameTextStyle: {
          fontSize: 12
        },
        axisLabel: {
          fontSize: 12
        }
      },
      series: series.map(s => ({
        name: s.name,
        type: 'line',
        data: s.data,
        itemStyle: s.color ? { color: s.color } : undefined,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2
        }
      }))
    };

    chartInstance.current.setOption(option);

    // Handle window resize
    const resizeChart = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
        // Update x-axis label rotation based on window width
        chartInstance.current.setOption({
          xAxis: {
            axisLabel: {
              rotate: window.innerWidth < 768 ? 45 : 0
            }
          }
        });
      }
    };

    // Add resize observer for container size changes
    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    });
    resizeObserver.observe(chartRef.current);

    window.addEventListener('resize', resizeChart);

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      window.removeEventListener('resize', resizeChart);
      resizeObserver.disconnect();
    };
  }, [title, xAxisData, series, yAxisUnit]);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        height, 
        width: '100%',
        minHeight: '300px',
        maxHeight: '600px'
      }} 
      className={`${className} overflow-hidden`} 
    />
  );
};

export default LineChart; 