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
import type { ChartOptions, ChartData, ScriptableLineSegmentContext } from "chart.js";
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
        label: "Line",
        data: dataDetail,
        borderColor: dataDetail.map((_, i) =>
          i < currentIndex ? "rgba(255,255,255,0.4)" : borderColor
        ),
        backgroundColor: dataDetail.map((_, i) =>
          i < currentIndex ? "rgba(255,255,255,0.4)" : backgroundColor
        ),
        tension: 0.4,
        fill: true,
        // highlight point tại currentIndex
        pointRadius: dataDetail.map((_, i) => (i === currentIndex ? 4 : 0)),
        pointBackgroundColor: borderColor,
        xAxisID: "xBottom",
        segment: {
          borderDash: (ctx: ScriptableLineSegmentContext) =>
            ctx.p0DataIndex < currentIndex ? [6, 6] : [], // Past = gạch đứt, Future = liền
        },
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
      const xBottom = chart.scales.xBottom;
      const xTop = chart.scales.xTop;

      // clear vùng trước để tránh đè nhiều lần
      ctx.save();

      // Duyệt theo tick hiển thị thực sự của xBottom
      xBottom.ticks.forEach((tick: any, i: number) => {
        if (tick.label === undefined) return;

        const x = xBottom.getPixelForTick(i);
        const y = xTop.top;

        const src = itemTop[i];
        if (!src) return;

        const img = new Image();
        img.src = src;
        img.onload = () => {
          ctx.drawImage(img, x - 12, y - 24, 24, 24);
        };
      });

      ctx.restore();
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
