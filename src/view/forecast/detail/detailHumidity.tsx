import React from "react";
import { useGlobal } from '../../../context/GlobalContext';
import ChartLineBase from '../../../charts/chartLineBase';

const DetailHumidity: React.FC = () => {
    const { selectDetailDay,
        resForecast,
        isBorderDash,
        isMobile
    } = useGlobal()

    // lấy danh sách 24 giờ của ngày được chọn
    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    const humidity = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => h.humidity ?? 0
    ) ?? []

    return (
        <div className='grid gap-6'>
            <div className='w-full p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                <ChartLineBase stepSize={20} currentIndex={isBorderDash} hours={hours} dataDetail={humidity} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={isMobile ? "" : "%"} />
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold '>Giới thiệu về độ ẩm tương đối</p>
                <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg '>
                        Độ ẩm tương đối, thường được gọi đơn giản là độ ẩm, là lượng hi ẩm có trong không khí so với lượng hơi ẩm mà không khí có thể lưu giữ. Không khí có thể lưu giữ nhiều hơi ẩm hơn ở nhiệt độ cao hơn. Độ ẩm tương đối gần 100% nghĩa là có thể có sương hoặc sương mù.
                    </p>
                </div>
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold ' >Giới thiệu về điểm sương</p>
                <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg '>
                        Điểm sương là ngưỡng mà nhiệt độ cần giảm xuống để hình thành sương. Đó có thể là một cách hữu ích để cho biết cảm giác về độ ẩm không khí - điểm sương càng cao thì cảm giác độ ẩm càng lớn. Điểm sương khớp với nhiệt độ hiện tại nghĩa là độ ẩm tương đối bằng 100% và có thể có sương hoặc sương mù.</p>
                </div>
            </div>
        </div>
    )
}

export default DetailHumidity