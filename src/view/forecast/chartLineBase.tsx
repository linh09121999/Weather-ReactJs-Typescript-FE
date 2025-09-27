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

type RainChartProps = {
    hours: string[];
    dataDetail: number[];
};

const ChartLineBase: React.FC<RainChartProps> = ({ hours, dataDetail }) => {
    // 👇 type ChartData<"line"> cho data
    const data: ChartData<"line"> = {
        labels: hours,
        datasets: [
            {
                data: dataDetail,
                borderColor: "white",
                backgroundColor: "rgb(255,255,255,0.3)",
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
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: false, text: "% Mưa", color: "white" }, // tiêu đề trục Y trắng
                ticks: {
                    color: "white", // số % trắng
                    font: { size: 16 }
                },
                grid: {
                    color: "rgba(255,255,255,0.2)", // lưới nhạt để nhìn rõ
                },
            },
            x: {
                title: { display: false, text: "Giờ trong ngày", color: "white" }, // tiêu đề trục X trắng
                ticks: {
                    color: "white", // 👈 label giờ màu trắng
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
