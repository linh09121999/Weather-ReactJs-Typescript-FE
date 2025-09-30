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
import type { ChartOptions, ChartData } from "chart.js";
import { useGlobal } from "../context/GlobalContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = {
    labels: string[];
    values: number[];
    title?: string;
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    donvi: string;
    currentIndex: number; // 👈 thêm để biết cột nào là hiện tại
    maxValue?: number
    minValue?: number,
    stepSize?: number
};

const ChartBarBase: React.FC<BarChartProps> = ({
    labels,
    values,
    title,
    borderWidth,
    borderColor,
    backgroundColor,
    donvi,
    currentIndex,
    maxValue,
    minValue,
    stepSize
}) => {
    const { isMobile } = useGlobal()

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: !!title,
                text: title ?? "",
                align: 'start',
                font: { size: isMobile ? 12 : 16 },
                color: "white",
                padding: {
                    top: 10,
                    bottom: 25
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "rgba(255,255,255,0.7)",
                    font: { size: isMobile ? 12 : 16 },
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
            y: {
                beginAtZero: true,
                max: maxValue,
                min: minValue,
                ticks: {
                    color: "rgba(255,255,255,0.7)",
                    font: { size: isMobile ? 12 : 16 },
                    callback: (value) => `${value} ${donvi}`,
                    stepSize: stepSize
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
        },
    };

    const data: ChartData<"bar"> = useMemo(() => {
        return {
            labels,
            datasets: [
                {
                    data: values,
                    borderWidth,
                    // 👇 mỗi cột có màu riêng
                    borderColor: values.map((_, i) =>
                        i < currentIndex
                            ? "rgba(255,255,255,0.4)" // nhạt hơn trước current
                            : borderColor
                    ),
                    backgroundColor: values.map((_, i) =>
                        i < currentIndex
                            ? "rgba(255,255,255,0.2)" // nhạt hơn
                            : backgroundColor
                    ),
                },
            ],
        };
    }, [labels, values, currentIndex, borderColor, backgroundColor, borderWidth]);

    return <Bar data={data} options={options} />;
};

export default ChartBarBase;
