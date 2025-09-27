import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartOptions, ChartData } from "chart.js"; // 👈 import type-only


// Đăng ký các thành phần cần dùng
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = {
    labels: string[];
    values: number[];
    title?: string;
    borderColor: string;
    backgroundColor: string;
    borderWidth: number,
    donvi: string;
};

const ChartBarBase: React.FC<BarChartProps> = ({ labels, values, title, borderWidth, borderColor, backgroundColor, donvi }) => {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, position: "top" },
            title: { display: !!title, text: title ?? "" },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: "rgba(255,255,255,0.7)", // số % trắng
                    font: { size: 16 }
                },
                grid: {
                    color: "rgba(255,255,255,0.2)", // lưới nhạt để nhìn rõ
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "rgba(255,255,255,0.7)", // 👈 label giờ màu trắng
                    font: { size: 16 },
                    callback: (value) => `${value} ${donvi}`,
                },
                grid: {
                    color: "rgba(255,255,255,0.2)",
                },
            },
        },
    };

    const data: ChartData<"bar"> = useMemo(
        () => ({
            labels,
            datasets: [
                {
                    data: values,
                    borderWidth: borderWidth,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor, // dùng rgba để có alpha
                },
            ],
        }),
        [labels, values]
    );

    return <Bar data={data} options={options} />
}

export default ChartBarBase