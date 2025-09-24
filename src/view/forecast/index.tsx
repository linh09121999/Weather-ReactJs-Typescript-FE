import React, { useEffect, useState, useCallback } from "react";
import { useGlobal } from '../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Select, MenuItem, Menu } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const Home: React.FC = () => {
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
            color: 'var(--color-blue-800) !important',
            fontWeight: 600
        },
    }

    const formatCityName = (city: string) => {
        return city
            .replace(/^Thành phố\s*/i, '') // bỏ "Thành phố" ở đầu
            .normalize('NFD')              // tách ký tự gốc và dấu
            .replace(/[\u0300-\u036f]/g, '') // xoá dấu
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/\s+/g, ' ') // gộp khoảng trắng thừa
            .trim();
    }

    const { keyApi,
        resForecast, setResForecast,
        resFuture, setResFuture,
        resMarine, setResMarine,
        resAstronomy, setResAstronomy,
        resTimeZone, setResTimeZone,
        resSports, setResSports,
        yes_no,
        selectLang, selectSetLang,
        selectAqi, setSelectAqi,
        selectAlerts, setSelectAlerts,
        days,
        selectDays, setSelectDays,
        dt, setDt,
        selectQ, setSelectQ,
        selectTypeCF, setSelectTypeCF,
        icons
    } = useGlobal();

    const Api_findForecast = async (q: string, days: number, aqi: string, alerts: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/forecast.json", { //https://weather-be-hhcd.onrender.com/api/forecast
                params: {
                    key: keyApi,
                    q: q,
                    days: days,
                    aqi: aqi,
                    alerts: alerts,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResForecast(response.data)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    const Api_findFuture = async (q: string, dt: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/future.json", { //https://weather-be-hhcd.onrender.com/api/future
                params: {
                    key: keyApi,
                    q: q,
                    dt: dt,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResFuture(response.data)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    const Api_findMarine = async (q: string, days: number, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/marine.json", { //https://weather-be-hhcd.onrender.com/api/marine
                params: {
                    key: keyApi,
                    q: q,
                    days: days,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResMarine(response.data)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    const Api_findAstronomy = async (q: string, dt: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/astronomy.json", { //https://weather-be-hhcd.onrender.com/api/astronomy
                params: {
                    key: keyApi,
                    q: q,
                    dt: dt,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResAstronomy(response.data)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    const Api_findTimezone = async (q: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/timezone.json", { //https://weather-be-hhcd.onrender.com/api/timezone
                params: {
                    key: keyApi,
                    q: q,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResTimeZone(response.data)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    const Api_findSports = async (q: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/sports.json", { //https://weather-be-hhcd.onrender.com/api/sports
                params: {
                    key: keyApi,
                    q: q,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResSports(response.data)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message);
                toast.error(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    useEffect(() => {
        Api_findForecast(formatCityName(selectQ!), selectDays, selectAqi, selectAlerts, selectLang)
        // Api_findFuture(selectQ!, dt, selectLang)
        // Api_findMarine(selectQ!, selectDays, selectLang)
        // Api_findAstronomy(selectQ!, dt, selectLang)
        // Api_findTimezone(selectQ!, selectLang)
        // Api_findSports(selectQ!, selectLang)
    }, [formatCityName(selectQ!), selectDays])

    const formatDate = (dateStr: string) => {
        const inputDate: Date = new Date(dateStr);
        const today: Date = new Date();

        // chuẩn hóa để so sánh ngày (không quan tâm giờ)
        const isToday: boolean =
            inputDate.getFullYear() === today.getFullYear() &&
            inputDate.getMonth() === today.getMonth() &&
            inputDate.getDate() === today.getDate();

        if (isToday) return "Hôm nay";

        // mapping thứ trong tuần (tiếng Việt)
        const weekdays: string[] = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
        ];

        return weekdays[inputDate.getDay()];
    }

    const [anchorElCalendar, setAnchorElCalendar] = useState<null | HTMLElement>(null);
    const openCalendar = Boolean(anchorElCalendar);
    const handleClickCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCalendar(event.currentTarget);
    };
    const handleCloseCalendar = () => {
        setAnchorElCalendar(null);
    };

    const [showDetailForecast, setShowDetailForecast] = useState<boolean>(false)

    const listSrecip = ["mm", "in"]
    const [selectSrecip, setSelectSrecip] = useState<string>("mm")

    const listWind = ["km/h", "mph"]
    const [selectWind, setSelectWind] = useState<string>("km/h")

    const listPressure = ["mb", "in"]
    const [selectPressure, setSelectPressure] = useState<string>("mb")

    const listVis = ["km", "dặm"]
    const [selectVis, setSelectVis] = useState<string>("km")

    return (
        <>
            <main className="min-h-[69vh] my-[30px] p-[20px]">
                <section className="max-w-[1350px] mx-auto grid  items-center gap-4 bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] p-[25px] shadow-lg rounded-[20px]">
                    <div className="border-b-[2px] border-b-white/50 pb-[10px]">
                        <div className="grid grid-col-1 md:grid-cols-2 pb-[20px]">
                            {/* loaction */}
                            <div className="grid gap-2">
                                <div className="flex text-white items-center gap-5">
                                    <p className="text-white text-4xl font-bold md:relative md:after:absolute md:after:w-[4px] md:after:h-full md:after:bg-white md:after:right-[-10px]">{resForecast?.location.name} </p>
                                    <p className="text-xl">{resForecast?.location.country}</p>
                                </div>
                                <p className="text-white">{resForecast?.current.last_updated}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-white text-8xl font-bold">{selectTypeCF === 0 ? resForecast?.current.temp_f + "°" : resForecast?.current.temp_c + "°"}</p>
                                    <img className="size-35 justify-self-center" alt={resForecast?.current.condition.text} src={resForecast?.current.condition.icon} />
                                </div>
                                <p className="text-white/70 text-xl ">Cảm giác như {selectTypeCF === 0 ? resForecast?.current.feelslike_f + "°" : resForecast?.current.feelslike_c + "°"}</p>
                            </div>

                            {/* img */}
                            <div className="justify-self-end max-md:hidden">
                                <div className="grid justify-center gap-2">
                                    <p className="text-white text-xl md:text-end">{resForecast?.current.condition.text}</p>
                                    <div className="text-white grid gap-1 max-md:hidden">
                                        <p className="text-end">Gió: {resForecast?.current.wind_kph} km/h</p>
                                        <p className="text-end">Mây: {resForecast?.current.cloud} %</p>
                                        <p className="text-end">Lượng mưa: {resForecast?.current.precip_mm} mm</p>
                                        <p className="text-end">Độ ẩm: {resForecast?.current.humidity} %</p>
                                        <p className="text-end">UV: {resForecast?.current.uv}</p>
                                        <p className="text-end">Áp suất: {resForecast?.current.pressure_mb} mb</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={`${showDetailForecast === true ? "hidden" : ""} grid justify-center w-full text-white items-center css-icon`}
                            onClick={() => { setShowDetailForecast(true) }}
                        >
                            Chi tiết
                            <span className="justify-self-center">{icons.iconDown}</span>
                        </button>
                        <div className={`${showDetailForecast === true ? "" : "hidden"} transition-all duration-300 ease grid gap-5`}>
                            <div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-3">
                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconThermometer}</span>
                                        <p className="text-white/70 text-xl">Nhiệt Độ</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-50px)]">Nhiệt độ cảm nhận</p>
                                        <p>{selectTypeCF === 0 ? resForecast?.current.feelslike_f + "°" : resForecast?.current.feelslike_c + "°"}</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-50px)]">Nhiệt độ gió lạnh</p>
                                        <p>{selectTypeCF === 0 ? resForecast?.current.windchill_f + "°" : resForecast?.current.windchill_c + "°"}</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-50px)]">Chỉ số nhiệt</p>
                                        <p>{selectTypeCF === 0 ? resForecast?.current.heatindex_f + "°" : resForecast?.current.heatindex_c + "°"}</p>
                                    </div>
                                </div>

                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center justify-between">
                                        <div className="flex gap-2 items-center">
                                            <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconWind}</span>
                                            <p className="text-white/70 text-xl">Gió</p>
                                        </div>
                                        <div className='flex bg-blue-600/10 rounded-[15px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[2px] py-[2px] shadow-lg'>
                                            {listWind.map((wind, index) => (
                                                <button key={index}
                                                    className={`px-[8px] py-[1px] rounded-[15px] transition-all duration-300 ease text-white ${selectWind === wind ? "bg-white/30" : ""}`}
                                                    onClick={() => {
                                                        setSelectWind(wind)
                                                    }}
                                                >{wind}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-75px)]">Gió</p>
                                        <p>{selectWind === "km/h" ? resForecast?.current.wind_kph + " km/h" : resForecast?.current.wind_mph + " mph"}</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-75px)]">Gió giật</p>
                                        <p>{selectWind === "km/h" ? resForecast?.current.gust_kph + " km/h" : resForecast?.current.gust_mph + " mph"}</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-75px)]">Hướng gió</p>
                                        <p>{resForecast?.current.wind_degree}° {resForecast?.current.wind_dir}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 ">
                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconCloud}</span>
                                        <p className="text-white/70 text-xl">Mây</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{resForecast?.current.cloud}</p>
                                </div>

                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center justify-between">
                                        <div className="flex gap-2 items-center">
                                            <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconTachometer}</span>
                                            <p className="text-white/70 text-xl">Áp Suất</p>
                                        </div>
                                        <div className='flex bg-blue-600/10 rounded-[15px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[2px] py-[2px] shadow-lg'>
                                            {listPressure.map((pressure, index) => (
                                                <button key={index}
                                                    className={`px-[8px] py-[1px] rounded-[15px] transition-all duration-300 ease text-white ${selectPressure === pressure ? "bg-white/30" : ""}`}
                                                    onClick={() => {
                                                        setSelectPressure(pressure)
                                                    }}
                                                >{pressure}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{selectPressure === "mb" ? resForecast?.current.pressure_mb + " mb" : resForecast?.current.pressure_in + " in"}</p>
                                </div>

                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center justify-between">
                                        <div className="flex gap-2 items-center">
                                            <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconCloudRain}</span>
                                            <p className="text-white/70 text-xl">Lượng Mưa</p>
                                        </div>

                                        <div className='flex bg-blue-600/10 rounded-[15px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[2px] py-[2px] shadow-lg'>
                                            {listSrecip.map((srecip, index) => (
                                                <button key={index}
                                                    className={`px-[8px] py-[1px] rounded-[15px] transition-all duration-300 ease text-white ${selectSrecip === srecip ? "bg-white/30" : ""}`}
                                                    onClick={() => {
                                                        setSelectSrecip(srecip)
                                                    }}
                                                >{srecip}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{selectSrecip === "mm" ? resForecast?.current.precip_mm + " mm" : resForecast?.current.precip_in + " in"}</p>
                                </div>

                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconTint}</span>
                                        <p className="text-white/70 text-xl">Độ Ẩm</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{resForecast?.current.humidity}%</p>
                                    <p className="text-xl">Điểm sương là {selectTypeCF === 0 ? resForecast?.current.dewpoint_f + "°" : resForecast?.current.dewpoint_c + "°"} ngay lúc này</p>
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center justify-between">
                                        <div className="flex gap-2 items-center">
                                            <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconEye}</span>
                                            <p className="text-white/70 text-xl">Tầm Nhìn</p>
                                        </div>
                                        <div className='flex bg-blue-600/10 rounded-[15px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[2px] py-[2px] shadow-lg'>
                                            {listVis.map((vis, index) => (
                                                <button key={index}
                                                    className={`px-[8px] py-[1px] rounded-[15px] transition-all duration-300 ease text-white ${selectVis === vis ? "bg-white/30" : ""}`}
                                                    onClick={() => {
                                                        setSelectVis(vis)
                                                    }}
                                                >{vis}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{selectVis === "km" ? resForecast?.current.vis_km + " km" : resForecast?.current.vis_miles + " dặm"}</p>
                                </div>

                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconSun}</span>
                                        <p className="text-white/70 text-xl">Chỉ Số UV</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{resForecast?.current.uv}</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 max-md:grid-cols-1 gap-3">
                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconSolarPanel}</span>
                                        <p className="text-white/70 text-xl">Bức Xạ Mặt Trời</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Bức xạ sóng ngắn</p>
                                        <p>{resForecast?.current.short_rad} W/m²</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Bức xạ khuếch tán</p>
                                        <p>{resForecast?.current.diff_rad} W/m²</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Bức xạ trực tiếp</p>
                                        <p>{resForecast?.current.dni} W/m²</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Bức xạ nghiêng</p>
                                        <p>{resForecast?.current.gti} W/m²</p>
                                    </div>
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full text-blur-800 content-center text-xl">{icons.iconSmog}</span>
                                        <p className="text-white/70 text-xl">Chất Lượng Không Khí</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Carbon Monoxide (CO)</p>
                                        <p>{resForecast?.current.air_quality?.co} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Nitrogen Dioxide (NO₂)</p>
                                        <p>{resForecast?.current.air_quality?.no2} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Ozone (O₃)</p>
                                        <p>{resForecast?.current.air_quality?.o3} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Sulfur Dioxide (SO₂)</p>
                                        <p>{resForecast?.current.air_quality?.so2} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Bụi mịn PM2.5</p>
                                        <p>{resForecast?.current.air_quality?.pm2_5} μg/m³</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)]">Bụi mịn PM10</p>
                                        <p>{resForecast?.current.air_quality?.pm10} μg/m³</p>
                                    </div>
                                </div>
                            </div>
                            <button className="grid justify-center w-full text-white items-center css-icon"
                                onClick={() => { setShowDetailForecast(false) }}
                            >
                                <span className="justify-self-center">{icons.iconUp}</span>
                                Đóng lại
                            </button>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-3">
                        {resForecast?.forecast.forecastday[0].hour.map((hour, index) => (
                            <div key={index}
                                className="grid justify-center p-[10px] gap-2"
                            >
                                <p className="text-white text-center"> {index}:00</p>
                                <img className="h-[50px] w-[55px]" alt={hour.condition.text} src={hour.condition.icon} />
                                <p className="text-white text-xl font-bold text-center">{selectTypeCF === 0 ? hour.temp_f + "°" : hour.temp_c + "°"}</p>
                            </div>
                        ))}
                    </div>

                </section>
                <section className="max-w-[1350px] mt-[30px] mx-auto grid p-[25px] items-center gap-4 bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px]  shadow-lg rounded-[20px]">
                    <div className="flex items-center grid grid-col-1 md:grid-cols-2 border-b-[2px] border-b-white/50">
                        <p className=" text-white/70 flex gap-2 items-center pb-[10px] text-xl">Dự báo {selectDays} ngày tới</p>
                        <div className="justify-self-end flex gap-2 items-center pb-[10px]">
                            <p className="text-white text-xl">Chọn</p>
                            <button className="text-white"
                                onClick={handleClickCalendar}
                            >{icons.iconCalendar}</button>
                            <Menu
                                anchorEl={anchorElCalendar}
                                open={openCalendar}
                                onClose={handleCloseCalendar}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {days.map((day, index) => (
                                    <MenuItem key={index}
                                        onClick={() => {
                                            handleCloseCalendar()
                                            setSelectDays(day.id)
                                        }}
                                        sx={sxMenuItem}
                                    >
                                        {day.desc}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        {resForecast?.forecast.forecastday.map((forecast, index) => (
                            <div key={index} className="rounded-[10px] justify-center grid gap-2 bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full">
                                <p className="text-white text-center"> {formatDate(forecast.date)}</p>
                                <img className="h-[50px] w-[55px] justify-self-center" alt={forecast.day.condition.text} src={forecast.day.condition.icon} />
                                <div className="flex gap-2">
                                    <p className="text-white text-xl font-bold">{selectTypeCF === 0 ? forecast.day.maxtemp_f + "°" : forecast.day.maxtemp_c + "°"}</p>
                                    /
                                    <p className="text-white text-xl">{selectTypeCF === 0 ? forecast.day.mintemp_f + "°" : forecast.day.mintemp_c + "°"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main >
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Home;