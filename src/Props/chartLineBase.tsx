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
                label: "Line",
                data: dataDetail,
                borderColor: borderColor, // default
                backgroundColor: backgroundColor,
                tension: 0.4,
                fill: true,
                // highlight point tại currentIndex
                pointRadius: dataDetail.map((_, i) => (i === currentIndex ? 4 : 0)),
                pointBackgroundColor: borderColor,
                segment: {
                    borderDash: (ctx: ScriptableLineSegmentContext) =>
                        ctx.p0DataIndex < currentIndex ? [6, 6] : [], // Past = gạch đứt, Future = liền
                    borderColor: (ctx: ScriptableLineSegmentContext) =>
                        ctx.p0DataIndex < currentIndex ? "rgba(255,255,255,0.4)" : borderColor,
                    backgroundColor: (ctx: ScriptableLineSegmentContext) =>
                        ctx.p0DataIndex < currentIndex ? "rgba(255,255,255,0.4)" : backgroundColor,
                },
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
