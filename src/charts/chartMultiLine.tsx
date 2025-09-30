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
    // 👈 import type
} from "chart.js";
import type { ChartOptions, ChartData, ScriptableLineSegmentContext } from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobal } from "../context/GlobalContext";

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
    label: string[];
    hours: string[];
    dataDetail: number[][]; // mỗi phần tử = 1 line
    title?: string;
    border: string[]; // màu line
    background: string[]; // màu fill
    donvi: string;
    currentIndex: number;
    stepSize?: number,
    maxValue?: number,
    minValue?:number
};

const ChartMultiLine: React.FC<LineChartProps> = ({
    label,
    hours,
    dataDetail,
    title,
    border,
    background,
    donvi,
    currentIndex,
    stepSize,
    maxValue,
    minValue
}) => {
    const { isMobile } = useGlobal()

    const datasets = dataDetail.map((arr, idx) => ({
        label: label[idx],
        data: arr,
        borderColor: border[idx],
        backgroundColor: background[idx],
        tension: 0.4,
        fill: true,
        // chỉ chấm tại currentIndex
        pointRadius: arr.map((_, i) => (i === currentIndex ? 5 : 0)),
        pointHoverRadius: arr.map((_, i) => (i === currentIndex ? 7 : 4)),
        pointBackgroundColor: arr.map((_, i) =>
            i === currentIndex ? "#fff" : border[idx]
        ),
        segment: {
            borderDash: (ctx: ScriptableLineSegmentContext) =>
                ctx.p0DataIndex < currentIndex ? [6, 6] : [], // Past = gạch đứt, Future = liền
            borderColor: (ctx: ScriptableLineSegmentContext) =>
                ctx.p0DataIndex < currentIndex ? "rgba(255,255,255,0.4)" : border[idx],
            backgroundColor: (ctx: ScriptableLineSegmentContext) =>
                ctx.p0DataIndex < currentIndex ? "rgba(255,255,255,0.4)" : background[idx],
        },
    }));

    const data: ChartData<"line"> = {
        labels: hours,
        datasets,
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: "white",
                    font: { size: isMobile ? 12 : 16 },
                    usePointStyle: true,
                    padding: isMobile ? 18 : 20,
                    boxHeight: isMobile ? 9 : 10
                },
            },
            title: {
                display: !!title,
                text: title ?? ""
            },
        },
        scales: {
            y: {
                max: maxValue,
                min: minValue,
                beginAtZero: true,
                ticks: {
                    color: "rgba(255,255,255,0.7)",
                    font: { size: isMobile ? 12 : 16 },
                    callback: (value) => `${value} ${donvi}`,
                    stepSize: stepSize,
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
            x: {
                ticks: {
                    color: "rgba(255,255,255,0.7)",
                    font: { size: isMobile ? 12 : 16 },
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
        },
    };

    return (
        <Line
            className="w-full min-x-[340px]"
            data={data}
            options={options}
        />
    );
};

export default ChartMultiLine;
