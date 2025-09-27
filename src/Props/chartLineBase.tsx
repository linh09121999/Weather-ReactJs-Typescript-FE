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
import type { ChartOptions, ChartData } from "chart.js"; // 👈 import type-only
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
};

const ChartLineBase: React.FC<LineChartProps> = ({ hours, dataDetail, title, borderColor, backgroundColor }) => {
    // 👇 type ChartData<"line"> cho data
    const data: ChartData<"line"> = {
        labels: hours,
        datasets: [
            {
                data: dataDetail,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgba(54,162,235,1)",
                pointRadius: 5,
            },
        ],
    };

    // 👇 type ChartOptions<"line"> cho options
    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: { display: false, position: "top" },
            title: { display: !!title, text: title ?? "" },
        },
        scales: {
            y: {
                beginAtZero: true,
                // max: 100,
                ticks: {
                    color: "rgba(255,255,255,0.7)", // số % trắng
                    font: { size: 16 }
                },
                grid: {
                    color: "rgba(255,255,255,0.2)", // lưới nhạt để nhìn rõ
                },
            },
            x: {
                ticks: {
                    color: "rgba(255,255,255,0.7)", // 👈 label giờ màu trắng
                    font: { size: 16 }
                },
                grid: {
                    color: "rgba(255,255,255,0.2)",
                },
            },
        },
    };

    return <Line className="w-full min-x-[340px]" data={data} options={options} />;
};

export default ChartLineBase;
