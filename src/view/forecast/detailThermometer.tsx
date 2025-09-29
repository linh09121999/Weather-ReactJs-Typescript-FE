import React from "react";
import ChartLineBase from '../../props/chartLineBase';
import ChartLineTopText from "../../props/chartLineTopText";
import { useGlobal } from '../../context/GlobalContext';

const DetailThermometer: React.FC = () => {
    const { selectDetailDay, 
        resForecast,
        selectTypeCF,
        typeTemp_Fellslike,
        selectTypeTemp_Fellslike, setSelectTypeTemp_Fellslike,
        isBorderDash
    } = useGlobal()

    // lấy danh sách 24 giờ của ngày được chọn
    const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
        (h) => {
            const date = new Date(h.time);
            return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
        }
    ) ?? [];

    const temp =
        selectTypeCF === 0 ?
            (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
                (h) => h.temp_f ?? 0
            ) ?? []) :
            (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
                (h) => h.temp_c ?? 0
            ) ?? [])

    const imgCondition =
        resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.condition.icon ?? 0
        ) ?? []

    const feelslike =
        selectTypeCF === 0 ?
            (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
                (h) => h.feelslike_f ?? 0
            ) ?? []) :
            (resForecast?.forecast.forecastday[selectDetailDay].hour.map(
                (h) => h.feelslike_c ?? 0
            ) ?? [])

    // lấy % mưa tương ứng
    const rainChance =
        resForecast?.forecast.forecastday[selectDetailDay].hour.map(
            (h) => h.chance_of_rain ?? 0 // hoặc h.daily_chance_of_rain
        ) ?? [];

    const dvCF = selectTypeCF === 0 ? '°F' : '°C'

    return (
        <div className='grid gap-6'>
            <div className='grid grid-cols-2 gap-5 max-lg:hidden'>
                <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
                    <ChartLineTopText maxValue={42} currentIndex={isBorderDash} itemTop={imgCondition} hours={hours} dataDetail={temp} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvCF} />
                </div>
                <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
                    <ChartLineTopText maxValue={42} currentIndex={isBorderDash} itemTop={imgCondition} hours={hours} dataDetail={feelslike} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvCF} />
                </div>
                {typeTemp_Fellslike.map((type, id) => (
                    <div key={id} className='grid gap-2 text-lg '>
                        <p className='text-white'>{type.title}</p>
                        <p className='text-white/70'>{type.desc}</p>
                    </div>
                ))}

            </div>
            <div className='grid gap-4 lg:hidden'>
                {/* bieu do theo selectTypeTemp_Fellslike */}
                {selectTypeTemp_Fellslike === 0 ?
                    //thuc te
                    <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
                        <ChartLineTopText maxValue={42} currentIndex={isBorderDash} itemTop={imgCondition} hours={hours} dataDetail={temp} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvCF} />
                    </div>
                    :
                    //cam nhan
                    <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
                        <ChartLineTopText maxValue={42} currentIndex={isBorderDash} itemTop={imgCondition} hours={hours} dataDetail={feelslike} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvCF} />
                    </div>
                }

                <div className='flex bg-white/5 rounded-[15px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg text-lg '>
                    {typeTemp_Fellslike.map((type) => (
                        <>
                            <button key={type.id}
                                className={`px-[12px] w-1/2 py-[2px] rounded-[10px] transition-all duration-300 ease  ${selectTypeTemp_Fellslike === type.id ? "bg-white font-bold text-[#2B32B2]" : "text-white"}`}
                                onClick={() => {
                                    setSelectTypeTemp_Fellslike(type.id)
                                }}
                            >{type.title}</button>
                        </>
                    ))}
                </div>
                <p className='text-lg  text-white/70'>{typeTemp_Fellslike[selectTypeTemp_Fellslike].desc}</p>
            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl   font-bold'>Khả năng có mưa</p>
                <p className='text-lg text-white/70  '>Khả năng có mưa  {resForecast?.forecast.forecastday[selectDetailDay].day.daily_chance_of_rain} %</p>
                {/* bieu do */}
                <div className='w-full p-[25px] max-sm:p-[15px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <ChartLineBase maxValue={100} currentIndex={isBorderDash} hours={hours} dataDetail={rainChance} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi="%" />
                </div>
                <p className='text-lg text-white/70 '>Khả năng có mưa hằng ngày có xu hướng cao hơn khả năng mưa cho mỗi giờ</p>

            </div>
            <div className='grid gap-4'>
                <p className='text-white text-xl font-bold ' >Giới thiệu về nhiệt độ cảm nhận</p>
                <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
                    <p className='text-white text-lg '>Nhiệt độ cảm nhận biểu thị độ ấm hoặc độ lạnh mà bạn cảm nhận thấy và có thể khác với nhiệt độ thực tế. Nhiệt độ cảm nhận bị ảnh hưởng bởi độ ẩm, ánh nắng và gió.</p>
                </div>
            </div>
        </div>
    )
}

export default DetailThermometer