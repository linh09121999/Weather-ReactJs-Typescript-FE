import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type GaugeProps = {
  value?: number;
  min: number;
  max: number;
  donvi: string;
  backgroundColor: string[]
};

const ChartGauge: React.FC<GaugeProps> = ({ value, min, max, donvi, backgroundColor }) => {
  const safeValue = value ?? min; // fallback nếu value = undefined
  const percent = (safeValue - min) / (max - min); // 0 -> 1
  const angle = Math.min(Math.max(percent, 0), 1) * 270; // tính độ quét
  const rest = 270 - angle;

  const data = {
    datasets: [
      {
        data: [angle - 0.5, 1, rest - 0.5], // phần đã điền & phần còn lại
        backgroundColor: backgroundColor,
        borderWidth: [0, 4, 0],
        borderColor: backgroundColor,
        cutout: "85%", // tạo gauge rỗng ở giữa
        rotation: -135, // bắt đầu từ -135 độ
        circumference: 270, // quét 270 độ
      },
    ],
  };

  return (
    <div className="flex flex-col items-center relative w-36 h-36">
      <Doughnut data={data} options={{ plugins: { legend: { display: false } } }} />

      {/* Hiển thị value + đơn vị ở giữa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center">
        <p className="text-3xl font-bold">{safeValue}</p>
        <p className="text-xl text-white/70">{donvi}</p>
      </div>

      {/* Min - Max ở 2 đầu */}
      <div className="absolute bottom-[-18px] left-6 text-lg font-medium">Thấp</div>
      <div className="absolute bottom-[-18px] right-6 text-lg font-medium">Cao</div>
    </div>
  );
};

export default ChartGauge;
