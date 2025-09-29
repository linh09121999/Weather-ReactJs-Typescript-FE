import React from "react";
import ChartLineBase from '../../props/chartLineBase';
import { useGlobal } from '../../context/GlobalContext';

const DetailPressure: React.FC = () => {
    const { selectDetailDay,resForecast, selectPressure, 
        isBorderDash
    } = useGlobal()

    // lấy danh sách 24 giờ của ngày được chọn
    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    const pressure = selectPressure === "in" ?
        (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.pressure_in ?? 0
        ) ?? []) :
        (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.pressure_mb ?? 0
        ) ?? [])

    return (
        <div className='grid gap-6'>
            <div className='w-full p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                <ChartLineBase maxValue={1050} currentIndex={isBorderDash} hours={hours} dataDetail={pressure} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi="hPa" />
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl  font-bold'>Giới thiệu về Áp suất</p>
                <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg '>
                        Những gì thay đổi nhanh, đáng kể về áp suất được sử dụng để dự đoán các thay đổi về thời tiết. Ví dụ: sự sụt giảm đáng kể về áp suất có thể nghĩa là sắp có mưa hoặc tuyết và áp suất tăng có nghĩa là thời tiết đang cải thiện. Áp suất cũng được gọi là áp suất khí quyển hoặc áp suất không khí
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailPressure