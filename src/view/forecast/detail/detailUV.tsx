import React from "react";
import { useGlobal } from "../../../context/GlobalContext";
import ChartLineBase from "../../../charts/chartLineBase";

const DetailUV: React.FC = () => {
    const { selectDetailDay, 
        resForecast,
        isBorderDash
    } = useGlobal()

    // lấy danh sách 24 giờ của ngày được chọn
    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    const uv = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => h.uv ?? 0
    )?? []

    return (
        <div className='grid gap-6'>
            <div className="w-full p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
                <ChartLineBase stepSize={1} maxValue={11} currentIndex={isBorderDash} hours={hours} dataDetail={uv} borderColor="white" backgroundColor="rgb(255,255,255,0.5)"  donvi=""/>
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold '>Giới thiệu về chỉ số UV</p>
                <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg '>
                        Chỉ số UV (UVI) của Tổ chức Y tế Thế giới đo mức độ bức xạ cực tím. UVI càng cao thì khả năng gây hại càng lớn và tốc độ xảy ra tổn thương có thể càng nhanh. UVI có thể giúp bạn quyết định khi nào cần tự bảo vệ khỏi ánh nắng mặt trời và khi nào cần tránh ra ngoài trời. WHO khuyến cáo sử dụng vật che chắng, kem chống nắng, nón và quần áo bảo vệ ở mực 3 (Trung bình) trở nên.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailUV