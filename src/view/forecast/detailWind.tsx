import React from "react";
import { useGlobal } from '../../context/GlobalContext';

const DetailWind: React.FC = () => {
    const {
        listBeaufore,
        selectDetailDay,
        resForecast,
        selectWind
    } = useGlobal()
    return (
        <div className='grid gap-6'>
            <div>
                {/* bieu do */}
                <p className='text-white/70 text-lg'>Tốc độ gió lớn nhất đạt {selectWind === "km/h" ? resForecast?.forecast.forecastday[selectDetailDay].day.maxwind_kph + " km/h" : resForecast?.forecast.forecastday[selectDetailDay].day.maxwind_mph + " mph"}</p>
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold'>Giới thiệu về tốc độ gió và gió giật</p>
                <div className='p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg'>Tốc độ gió được tính toán bằng giá trị trung bình trong một khoảng thời gian ngắn. Gió giật là sự gia tăng đột ngột ngắn của gió ở trên giá trị trung bình này. Một cơn gió giật thường kéo dài dưới 20 giây.</p>
                </div>
            </div>

            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold'>Thang Beaufort</p>
                <div className='p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>

                </div>
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold'>Giới thiệu về Thang Beaufort</p>
                <div className='p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg'>Thang sức gió Beaufore biểu thị cường độ hoặc sức gió tại một mốc nhất định. Thang Beaufore có thể giúp việc tìm hiểu cảm nhận về sức gió và mức độ tác động mà gió có thể gây ra trở nên dễ dàng hơn. Mỗi giá trị trên thang tương ứng với một phạm vi tốc độ</p>
                </div>
            </div>
        </div>
    )
}

export default DetailWind