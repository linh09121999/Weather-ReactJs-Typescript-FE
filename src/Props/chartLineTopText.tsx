import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LineChartProps = {
  hours: string[];       // Trục X dưới (giờ)
  itemTop: string[];    // Trục X trên (link ảnh)
  dataDetail: number[];
  title?: string;
  borderColor: string;
  backgroundColor: string;
  donvi: string;
  currentIndex: number;
};

const ChartLineBase: React.FC<LineChartProps> = ({
  hours,
  itemTop,
  dataDetail,
  title,
  borderColor,
  backgroundColor,
  donvi,
  currentIndex,
}) => {
  const data: ChartData<"line"> = {
    labels: hours,
    datasets: [
      {
        label: "Past",
        data: dataDetail.map((v, i) => (i <= currentIndex ? v : null)),
        borderColor: "rgba(255,255,255,0.4)",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderDash: [6, 6],
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        xAxisID: "xBottom",
      },
      {
        label: "Future",
        data: dataDetail.map((v, i) => (i >= currentIndex ? v : null)),
        borderColor,
        backgroundColor,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(54,162,235,1)",
        pointRadius: 1,
        xAxisID: "xBottom",
      },
      {
        label: "Current",
        data: dataDetail.map((v, i) => (i == currentIndex ? v : null)),
        borderColor,
        backgroundColor,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointRadius: 3,
        xAxisID: "xBottom",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    layout: {
      padding: {
        top: 40, // 👈 chừa chỗ phía trên cho icon
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: !!title, text: title ?? "" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(255,255,255,0.7)",
          font: { size: 16 },
          callback: (value) => `${value} ${donvi}`,
        },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      xBottom: {
        type: "category",
        labels: hours,
        position: "bottom",
        ticks: {
          color: "rgba(255,255,255,0.7)",
          font: { size: 14 },
        },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      xTop: {
        type: "category",
        labels: hours, // vẫn cần label để ChartJS canh tick
        position: "top",
        ticks: { display: false }, // ẩn text tick
        grid: { drawTicks: false, drawOnChartArea: false },
      },
    },
  };

  // Plugin để vẽ ảnh lên trục trên
  const imagePlugin = {
    id: "imagePlugin",
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const xAxis = chart.scales.xTop;

      itemTop.forEach((src, i) => {
        const x = xAxis.getPixelForTick(i);
        const y = xAxis.top; // vị trí trên cùng của xTop

        const img = new Image();
        img.src = src;

        img.onload = () => {
          ctx.drawImage(img, x - 12, y - 24, 24, 24); // căn giữa và scale nhỏ
        };
      });
    },
  };

  return (
    <Line
      className="w-full min-x-[340px]"
      data={data}
      options={options}
      plugins={[imagePlugin]}
    />
  );
};

export default ChartLineBase;
