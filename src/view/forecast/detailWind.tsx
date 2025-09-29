import React from "react";
import { useGlobal } from '../../context/GlobalContext';
import ChartLineBase from "../../props/chartLineBase";

const DetailWind: React.FC = () => {
    const {
        listBeaufore,
        selectDetailDay,
        resForecast,
        selectWind,
        isBorderDash
    } = useGlobal()

    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    const wind = selectWind === "km/h" ?
        (
            resForecast?.forecast.forecastday[selectDetailDay].hour.map(
                (h) => h.wind_kph ?? 0
            ) ?? []
        ) :
        (
            resForecast?.forecast.forecastday[selectDetailDay].hour.map(
                (h) => h.wind_mph ?? 0
            ) ?? []
        )

    const donvi = selectWind === "km/h" ? "km/h" : "mph"

    return (
        <div className='grid gap-6'>
            <div className="w-full grid gap-4 p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
                {/* bieu do */}
                <ChartLineBase currentIndex={isBorderDash} hours={hours} dataDetail={wind} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={donvi} />
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
                <div className='md:overflow-x-auto md:flex p-[25px] w-full bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <div className="max-md:hidden w-full flex py-[10px] gap-2 overflow-x-auto scroll-x">
                        <div className="grid items-center px-[10px] gap-2 text-white font-semibold">
                            <p className="font-semibold w-max">BFT</p>
                            <p className="font-semibold w-max">Mô tả</p>
                            <p className="font-semibold w-max">km/h</p>
                        </div>
                        {listBeaufore.map((item) => (
                            <div className="grid items-center px-[10px] gap-2 ">
                                <div className="flex gap-2 text-white items-center font-semibold w-max" >
                                    <span className={`${item.color} w-4 h-4 rounded-full`}></span>
                                    {item.bft}
                                </div>
                                <p className="text-lg text-white/70 w-max">{item.desc}</p>
                                <p className="text-lg text-white/70 w-max">{item.angel}</p>
                            </div>
                        ))}
                    </div>
                    <table className="md:hidden w-full">
                        <thead className="text-white">
                            <tr>
                                <th className=" px-1 text-lg py-2">BFT</th>
                                <th className=" px-1 py-2 text-lg">Mô tả</th>
                                <th className=" px-1 py-2 text-lg">km/h</th>
                            </tr>
                        </thead>
                        <tbody >
                            {listBeaufore.map((item) => (
                                <tr
                                    key={item.bft}
                                >
                                    {/* BFT cell */}
                                    <td className="px-1 py-3 text-lg">
                                        <div className="flex gap-2 items-center text-white font-semibold " >
                                            <span className={`${item.color} w-4 h-4 rounded-full`}></span>
                                            {item.bft}
                                        </div>
                                    </td>
                                    {/* Desc */}
                                    <td className="px-1 py-3 text-lg text-white/70">{item.desc}</td>
                                    {/* Angel */}
                                    <td className="px-1 py-3 text-lg text-white/70">{item.angel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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