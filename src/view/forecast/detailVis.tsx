import React from "react";
import { useGlobal } from '../../context/GlobalContext';
import ChartLineBase from '../../props/chartLineBase';

const DetailVis: React.FC = () => {
    const { selectDetailDay,
        resForecast,
        selectVis,
        isBorderDash
    } = useGlobal()

    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    const vis = selectVis === "km" ?
        (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.vis_km ?? 0
        ) ?? []) :
        (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.vis_miles ?? 0
        ) ?? [])

    return (
        <div className='grid gap-6'>
            <div className='w-full p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]' >
                <ChartLineBase
                    maxValue={45}
                    currentIndex={isBorderDash}
                    hours={hours}
                    dataDetail={vis}
                    borderColor="white"
                    backgroundColor="rgb(255,255,255,0.5)"
                    donvi={selectVis === "km" ? "km" : "dặm"}
                />
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold '>Giới thiệu về tầm nhìn</p>
                <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg '>
                        Tầm nhìn cho biết khoảng cách mà bạn có thể nhìn rõ các vật thể như tòa nhà và đồi núi. Đó là một số đo về độ trong suốt của không khí và không tính đến lượng ánh sáng mặt trời hoặc sự hiện diện của các vật cản. Tầm nhìn bằng hoặc trên 10 km được coi là rõ.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailVis