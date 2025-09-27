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
    borderWidth: number
};

const ChartBarBase: React.FC<BarChartProps> = ({ labels, values, title, borderWidth, borderColor, backgroundColor }) => {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: !!title, text: title ?? "" },
        },
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
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