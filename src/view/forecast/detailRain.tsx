import React from "react";
import ChartLineBase from "../../Props/chartLineBase";
import { useGlobal } from '../../context/GlobalContext';

const DetailRain: React.FC = () => {
    const { icons,
        selectDetailDay, setSelectDetailDay,
        listSelectShowDetail,
        resForecast,
        selectTypeCF, isMobile,
        selectSrecip, setSelectSrecip,
        selectWind, setSelectWind,
        selectPressure, setSelectPressure,
        selectVis, setSelectVis,
        selectAir, setSelectAir,
        typeTemp_Fellslike,
        listBeaufore,
        isSelectDetail, setIsSelectDetail,
        selectTypeTemp_Fellslike, setSelectTypeTemp_Fellslike
    } = useGlobal()

    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    // lấy % mưa tương ứng
    const rainChance =
        resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.chance_of_rain ?? 0 // hoặc h.daily_chance_of_rain
        ) ?? [];

    return (
        <div className='grid gap-6'>
            <div className='w-full'>
                {/* bieu do mmua */}
            </div>

            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold'>Khả năng có mưa</p>
                <p className='text-sm text-white/70'>Khả năng có mưa  {resForecast?.forecast.forecastday[selectDetailDay].day.daily_chance_of_rain} %</p>
                {/* bieu do */}
                <div className='w-full'>
                    <ChartLineBase hours={hours} dataDetail={rainChance} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" />
                </div>
                <p className='text-sm text-white/70'>Khả năng có mưa hằng ngày có xu hướng cao hơn khả năng mưa cho mỗi giờ</p>

            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold'>Cường độ mưa</p>
                <div className='p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg'>
                        Cường độ được tính toán dựa trên lượng mưa hoặc tuyết rơi mỗi giờ và nhằm cho biết mức độ mưa hoặc tuyết cảm nhận được. Cường độ cũng được sử dụng cho các loại mưa khác, ví dụ như mưa tuyết cũng như mưa và tuyết hỗn hợp. Một trận mưa như trút nước hoặc bão tuyết dày đặc có thể có cường độ "cao", trong khi lượng mưa trung bình hoặc mưa phùn nhẹ hơn có thể có cường độ "trung bình" hoặc "thấp".
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailRain