import React, { useEffect, useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { Menu, MenuItem } from "@mui/material"
import type { SxProps, Theme } from "@mui/material/styles";

import DetailThermometer from './detailThermometer';
import DetailWind from './detailWind';
import DetailUV from './detailUV';
import DetailRain from './detailRain';
import DetailPressure from './detailPressure';
import DetailVis from './detailVis';
import DetailHumidity from './detailHumidity';
import DetailAir from './detailAir';

const DetailForecast: React.FC = () => {

    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            maxWidth: 'calc(100%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 100,
        },
    }

    const MenuListProps: SxProps<Theme> = {
        sx: {
            paddingY: 0.5,
        },
    }

    const sxMenuItem: SxProps<Theme> = {
        justifyContent: 'start',
        paddingY: '10px',
        paddingLeft: '20px',
        color: 'var(--color-white)',
        zIndex: 100,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
            color: 'var(--color-cyan-300) !important',
            fontWeight: 600
        },
    }

    const { icons,
        selectDetailDay, setSelectDetailDay,
        listSelectShowDetail,
        resForecast,
        selectTypeCF, isMobile,
        selectSrecip,
        selectWind,
        selectPressure,
        selectVis,
        selectAir,
        isSelectDetail, setIsSelectDetail,
        currentHour,
        windDirectionVN,
        getVisibilityLevel, getUsEpaLever, getgetGbDefraLevel
    } = useGlobal()


    const [anchorElSelect, setAnchorElSelect] = useState<null | HTMLElement>(null);
    const openSelect = Boolean(anchorElSelect);
    const handleClickSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSelect(event.currentTarget);
    };
    const handleCloseSelect = () => {
        setAnchorElSelect(null);
    };

    const formatDateVN = (dateStr: string | undefined) => {
        if (!dateStr) return undefined;
        const days = [
            "Chủ nhật",
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
        ];

        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        const dayOfWeek = days[date.getDay()];

        return `${dayOfWeek}, ngày ${day} tháng ${month} năm ${year}`;
    }

    const getDay = (dateStr: string | undefined) => {
        if (!dateStr) return undefined;
        const [year, month, day] = dateStr.split("-").map(Number);
        return day
    }

    const formatDate = (dateStr: string) => {
        const inputDate: Date = new Date(dateStr);

        // mapping thứ trong tuần (tiếng Việt)
        const weekdaysFull: string[] = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
        ];

        const weekdays: string[] = [
            "CN", "T2", "T3", "T4", "T5", "T6", "T7"
        ]

        return isMobile === true ? weekdays[inputDate.getDay()] : weekdaysFull[inputDate.getDay()]
    }

    return (
        <main className="min-h-[80vh]">
            <div className='w-full backdrop-blur-[10px] px-[20px] sticky z-[99] md:top-[77px] max-md:top-[135px]'>
                <div className='flex gap-2 max-w-[1350px] mx-auto items-center text-white py-[10px] text-xl max-md:text-lg '>
                    <a href='/' className='transition duration-300 ease css-icon'>{icons.iconHome}</a>
                    <span>{icons.iconNext}</span>
                    <a href='#' className='transition duration-300 ease css-icon'>Chi tiết {listSelectShowDetail[isSelectDetail].title.toLowerCase()}</a>
                </div>
            </div>

            <section className=' px-[20px]'>
                <div className='max-w-[1350px] mt-[30px] mx-auto'>
                    <div className='grid gap-4'>
                        {/* list lich 7 ngay toi có [thứ, ngày] */}
                        <div className='flex justify-between'>
                            {resForecast?.forecast.forecastday.map((forecast, index) => (
                                <button key={index} className="rounded-[10px] justify-center grid gap-2 "
                                    onClick={() => {
                                        setSelectDetailDay(index)
                                    }}
                                >
                                    <p className="text-white text-center">{formatDate(forecast.date)}</p>
                                    <div className='flex gap-2 items-center justify-center'>
                                        <span className={` ${index === selectDetailDay ? "bg-white font-bold text-[#2B32B2] w-[35px] h-[35px]  justify-self-center content-center rounded-full" : "text-white"}`}>{getDay(forecast.date)}
                                        </span>
                                        <img className={`h-[50px] w-[55px] justify-self-center max-md:hidden ${index === selectDetailDay ? "hidden" : ""}`} alt={forecast.day.condition.text} src={forecast.day.condition.icon} />
                                    </div>
                                </button>

                            ))}
                        </div>
                        {/* ngay thang nam bang chu */}
                        <p className='text-xl text-white max-md:text-center'>{formatDateVN(resForecast?.forecast.forecastday[selectDetailDay].date)}</p>
                    </div>

                    <div className='mt-[30px] grid items-center gap-6 '>
                        <div className="max-sm:hidden shadow-lg border-[1px] border-solid border-white/10 gap-1 relative lg:flex lg:justify-between max-lg:grid max-lg:grid-cols-8 max-lg:gap-2 rounded-[15px] bg-white/5 p-1 backdrop-blur-[10px]">
                            {listSelectShowDetail.map((list, id1) => (
                                <button key={id1}
                                    className={`flex h-[36px] text-white text-lg lg:px-[15px] lg:py-[5px] justify-center items-center gap-2 whitespace-nowrap rounded-[10px] transition-all duration-300 group hover:bg-white/70 ${isSelectDetail === list.id ? " bg-white shadow-lg" : ""}`}
                                    onClick={() => setIsSelectDetail(list.id)}
                                >
                                    <svg
                                        className={`fill-current ${isSelectDetail === list.id ? "font-bold text-[#2B32B2]" : "text-white/50"} lg:hidden group-hover:text-[#2B32B2]`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                    >
                                        {list.icon}
                                    </svg>
                                    <span className={`max-lg:hidden  ${isSelectDetail === list.id ? "font-bold text-[#2B32B2]" : "text-white/50"} group-hover:text-[#2B32B2]`}>{list.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='grid gap-2 w-full'>
                                {isSelectDetail === 0 && (//thoi tiet
                                    <>
                                        <div className='flex gap-2 items-center'>
                                            <p className='text-3xl text-white font-bold'>{selectTypeCF === 0 ? resForecast?.forecast.forecastday[selectDetailDay].day.avgtemp_f + '°' : resForecast?.forecast.forecastday[selectDetailDay].day.avgtemp_c + '°'}</p>
                                            <img alt='' src={resForecast?.forecast.forecastday[selectDetailDay].day.condition.icon} />
                                        </div>
                                        <div className='flex gap-2 items-center text-lg text-white/70'>
                                            <p>C: {selectTypeCF === 0 ? resForecast?.forecast.forecastday[selectDetailDay].day.maxtemp_f + '°' : resForecast?.forecast.forecastday[selectDetailDay].day.maxtemp_c + '°'}</p>
                                            <p>T: {selectTypeCF === 0 ? resForecast?.forecast.forecastday[selectDetailDay].day.mintemp_f + '°' : resForecast?.forecast.forecastday[selectDetailDay].day.mintemp_c + '°'}</p>
                                        </div>
                                    </>
                                )}
                                {isSelectDetail === 1 && (//gio
                                    <>
                                        <div className='flex gap-2 items-center text-3xl'>
                                            <p className='text-3xl text-white flex gap-2 font-bold'>
                                                {selectWind === "km/h" ? resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].wind_kph + " km/h" : resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].wind_mph + " mph"}
                                            </p>
                                            <p className='text-white/70'>{resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].wind_degree}°  {windDirectionVN(resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].wind_dir) ?? undefined}</p>
                                        </div>
                                        <p className=' text-xl text-white/70'>
                                            Gió giật {selectWind === "km/h" ? resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].gust_kph + " km/h" : resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].gust_mph + " mph"}
                                        </p>
                                    </>
                                )}
                                {isSelectDetail === 2 && (//uv
                                    <>
                                        <p className='text-3xl text-white font-bold'>{resForecast?.forecast.forecastday[selectDetailDay].day.uv}</p>
                                        <p className='text-xl text-white/70'>Chỉ số trung bình trong 24 giờ</p>
                                    </>
                                )}
                                {isSelectDetail === 3 && (//luong mua
                                    <>
                                        <p className='text-3xl text-white flex gap-2 font-bold'>
                                            {selectSrecip === "mm" ? resForecast?.forecast.forecastday[selectDetailDay].day.totalprecip_mm + " mm" : resForecast?.forecast.forecastday[selectDetailDay].day.totalprecip_in + " in"}
                                        </p>
                                        <p className='text-xl text-white/70'>Tổng trong 24 giờ</p>
                                    </>
                                )}
                                {isSelectDetail === 4 && (//ap suat
                                    <>
                                        <p className='text-3xl text-white font-bold'>{selectPressure === "in" ? resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].pressure_in + " in" : resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].pressure_mb + " mb"}</p>
                                        <p className='text-xl text-white/70'>Ngay bây giờ</p>
                                    </>
                                )}
                                {isSelectDetail === 5 && (//tam nhịn
                                    <>
                                        <p className='text-3xl text-white flex gap-2 font-bold'>
                                            {selectVis === "km" ? resForecast?.forecast.forecastday[selectDetailDay].day.avgvis_km + " km" : resForecast?.forecast.forecastday[selectDetailDay].day.avgvis_miles + " dặm"}
                                        </p>
                                        <p className='text-xl text-white/70'>{getVisibilityLevel(resForecast?.forecast.forecastday[selectDetailDay].day.avgvis_km) ?? undefined}</p>
                                    </>
                                )}
                                {isSelectDetail === 6 && (//do am
                                    <>
                                        <p className='text-3xl text-white font-bold'>{resForecast?.forecast.forecastday[selectDetailDay].day.avghumidity}%</p>
                                        <p className='text-xl text-white/70'>Điểm sương hiện tại: {selectTypeCF === 0 ? resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].dewpoint_f + '°' : resForecast?.forecast.forecastday[selectDetailDay].hour[currentHour].dewpoint_c + '°'}</p>
                                    </>
                                )}
                                {isSelectDetail === 7 && (//chat luong khong khi
                                    <>
                                        <p className='text-3xl text-white flex gap-2 font-bold'>
                                            {selectAir === "us-epa" ? "US-EPA: " + resForecast?.forecast.forecastday[selectDetailDay].day.air_quality?.['us-epa-index'] : "GB-DEFRA: " + resForecast?.forecast.forecastday[selectDetailDay].day.air_quality?.['gb-defra-index']}
                                        </p>
                                        <p className='text-xl text-white/70'>
                                            {selectAir === "us-epa" ?
                                                getUsEpaLever(resForecast?.forecast.forecastday[selectDetailDay].day.air_quality?.['us-epa-index']) ?? undefined
                                                :
                                                getgetGbDefraLevel(resForecast?.forecast.forecastday[selectDetailDay].day.air_quality?.['gb-defra-index']) ?? undefined
                                            }
                                        </p>
                                    </>
                                )}

                            </div>
                            <div className='sm:hidden'>
                                <button className="text-white/70 px-[15px] py-[10px] bg-white/5 rounded-[15px] "
                                    onClick={handleClickSelect}
                                >
                                    <div className='flex gap-3'>
                                        <span>
                                            {listSelectShowDetail[isSelectDetail].icon}
                                        </span>
                                        {icons.iconDown}
                                    </div>
                                </button>
                                <Menu
                                    anchorEl={anchorElSelect}
                                    open={openSelect}
                                    onClose={handleCloseSelect}
                                    PaperProps={PaperProps}
                                    MenuListProps={MenuListProps}
                                >
                                    {listSelectShowDetail.map((list, index) => (
                                        <MenuItem key={index}
                                            onClick={() => {
                                                handleCloseSelect()
                                                setIsSelectDetail(list.id)
                                            }}
                                            sx={sxMenuItem}
                                        >
                                            <div className='w-full  flex items-center justify-between gap-3'>{list.title}
                                                <span>{list.icon}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>

                        {isSelectDetail === 0 &&
                            <DetailThermometer />
                        }
                        {isSelectDetail === 1 &&
                            <DetailWind />
                        }
                        {isSelectDetail === 2 &&
                            <DetailUV />
                        }
                        {isSelectDetail === 3 &&
                            <DetailRain />
                        }
                        {isSelectDetail === 4 &&
                            <DetailPressure />
                        }
                        {isSelectDetail === 5 &&
                            <DetailVis />
                        }
                        {isSelectDetail === 6 &&
                            <DetailHumidity />
                        }
                        {isSelectDetail === 7 &&
                            <DetailAir />
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DetailForecast