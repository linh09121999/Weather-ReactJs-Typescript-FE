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
    hours: string[];
    dataDetail: number[];
    title?: string;
    borderColor: string;
    backgroundColor: string;
    donvi: string;
    currentIndex: number; // 👈 vị trí giờ hiện tại
};

const ChartLineBase: React.FC<LineChartProps> = ({
    hours,
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
                data: dataDetail.map((v, i) => (i <= currentIndex ? v : null)), // giữ null sau current
                borderColor: "rgba(255,255,255,0.4)", // nhạt hơn
                backgroundColor: "rgba(255,255,255,0.2)",
                borderDash: [6, 6], // 👈 gạch đứt
                tension: 0.4,
                fill: false,
                pointBackgroundColor: "rgba(200,200,200,1)",
                pointRadius: 4,
            },
            {
                label: "Future",
                data: dataDetail.map((v, i) => (i >= currentIndex ? v : null)), // giữ null trước current
                borderColor: borderColor, // màu chính
                backgroundColor: backgroundColor,
                borderDash: [], // đường liền
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgba(54,162,235,1)",
                pointRadius: 5,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
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
            x: {
                ticks: {
                    color: "rgba(255,255,255,0.7)",
                    font: { size: 16 },
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
        },
    };

    return <Line className="w-full min-x-[340px]" data={data} options={options} />;
};

export default ChartLineBase;
