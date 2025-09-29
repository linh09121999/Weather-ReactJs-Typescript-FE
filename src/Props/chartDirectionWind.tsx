import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartOptions,
    type Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export type WindDirectionChartProps = {
    value: number | undefined;
    donvi: string;
    direction: number | undefined; // Góc từ 0-360 độ
};

const WindDirectionChart: React.FC<WindDirectionChartProps> = ({
    value,
    donvi,
    direction = 0,
}) => {
    // Dữ liệu vòng tròn nền
    const data = {
        labels: [],
        datasets: [
            {
                data: [1],
                backgroundColor: ["rgba(200,200,200,0.15)"],
                borderWidth: 0,
                cutout: "85%",
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    // Plugin vẽ mũi tên
    const arrowPlugin: Plugin<"doughnut"> = {
        id: "arrowPlugin",
        afterDraw: (chart) => {
            const { ctx, chartArea } = chart;
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
            const radius = Math.min(chartArea.width, chartArea.height) / 2;

            // Hướng gió (90° = Bắc, 180° = Đông, 270° = Nam, 0° = Tây)
            const angle = ((direction ?? 0) - 180) * Math.PI / 180;

            // Bắt đầu ngoài vùng text , cach tam 50%
            const innerGap = radius * 0.50;
            const x1 = centerX + innerGap * Math.cos(angle);
            const y1 = centerY + innerGap * Math.sin(angle);

            // Kết thúc cách biên một chút (thụt vào ~28%)
            const outerGap = radius * 0.82;
            const x2 = centerX + outerGap * Math.cos(angle);
            const y2 = centerY + outerGap * Math.sin(angle);

            ctx.save();
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.lineWidth = 3;

            // Vẽ thân mũi tên
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Vẽ đầu mũi tên
            const headlen = 12; // chiều dài đầu mũi tên
            const angleOffset = Math.PI / 8;

            const xArrow1 = x2 - headlen * Math.cos(angle - angleOffset);
            const yArrow1 = y2 - headlen * Math.sin(angle - angleOffset);

            const xArrow2 = x2 - headlen * Math.cos(angle + angleOffset);
            const yArrow2 = y2 - headlen * Math.sin(angle + angleOffset);

            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(xArrow1, yArrow1);
            ctx.lineTo(xArrow2, yArrow2);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        },
    };

    return (
        <div className="flex flex-col items-center relative w-48">
            <Doughnut data={data} options={options} plugins={[arrowPlugin]} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-lg text-white/70">{donvi}</p>
            </div>
            <p className="absolute -top-2 text-white text-lg">B</p>
            <p className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-lg">Đ</p>
            <p className="absolute -bottom-2 text-white text-lg">N</p>
            <p className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-lg">T</p>
        </div>
    );
};

export default WindDirectionChart;
