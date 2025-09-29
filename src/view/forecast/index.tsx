import React, { useEffect, useState } from "react";
import { useGlobal } from '../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { MenuItem, Menu } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import ChartGauge from "../../props/chartGauge";
import WindDirectionChart from "../../props/chartDirectionWind"

const Home: React.FC = () => {
    const navigate = useNavigate();

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
            backgroundColor: 'rgba(255, 255, 255) !important',
            color: '#2B32B2 !important',
            fontWeight: 600
        },
    }

    const formatCityName = (city: string) => {
        return city
            .replace(/^Thành phố\s*/i, '') // bỏ "Thành phố" ở đầu
            .normalize('NFD')          // tách ký tự gốc và dấu
            .replace(/[\u0300-\u036f]/g, '') // xoá dấu
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/\s+/g, ' ') // gộp khoảng trắng thừa
            .trim();
    }

    const { keyApi,
        resForecast, setResForecast,
        // resFuture, setResFuture,
        // resMarine, setResMarine,
        // resAstronomy, setResAstronomy,
        // resTimeZone, setResTimeZone,
        // resSports, setResSports,
        selectLang,
        selectAqi,
        selectAlerts,
        days,
        selectDays, setSelectDays,
        selectQ,
        selectTypeCF,
        icons,
        setSelectDetailDay,
        is920px, isMobile,
        selectSrecip,
        selectWind,
        selectPressure,
        selectVis,
        setIsSelectDetail,
        currentHour,
        windDirectionVN,
        getUVlevel,
        getRainLever,
        getVisibilityLevel
    } = useGlobal();

    const Api_findForecast = async (q: string, days: number, aqi: string, alerts: string, lang: string) => {
        try {
            const response = await axios.get("https://weather-be-hhcd.onrender.com/api/forecast", { //"http://api.weatherapi.com/v1/forecast.json", { //https://weather-be-hhcd.onrender.com/api/forecast
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

    // const Api_findFuture = async (q: string, dt: string, lang: string) => {
    //    try {
    //      const response = await axios.get("http://api.weatherapi.com/v1/future.json", { //https://weather-be-hhcd.onrender.com/api/future
    //         params: {
    //            key: keyApi,
    //            q: q,
    //            dt: dt,
    //            lang: lang
    //         },
    //         headers: {
    //            'Content-Type': 'application/json',
    //            'Accept': 'application/json'
    //         }
    //      })
    //      setResFuture(response.data)
    //    }
    //    catch (err) {
    //      if (axios.isAxiosError(err)) {
    //         console.error("Axios error:", err.message);
    //         toast.error(err.message);
    //      } else {
    //         console.error("Unexpected error:", err);
    //      }
    //    }
    // }

    // const Api_findMarine = async (q: string, days: number, lang: string) => {
    //    try {
    //      const response = await axios.get("http://api.weatherapi.com/v1/marine.json", { //https://weather-be-hhcd.onrender.com/api/marine
    //         params: {
    //            key: keyApi,
    //            q: q,
    //            days: days,
    //            lang: lang
    //         },
    //         headers: {
    //            'Content-Type': 'application/json',
    //            'Accept': 'application/json'
    //         }
    //      })
    //      setResMarine(response.data)
    //    }
    //    catch (err) {
    //      if (axios.isAxiosError(err)) {
    //         console.error("Axios error:", err.message);
    //         toast.error(err.message);
    //      } else {
    //         console.error("Unexpected error:", err);
    //      }
    //    }
    // }

    // const Api_findAstronomy = async (q: string, dt: string, lang: string) => {
    //    try {
    //      const response = await axios.get("http://api.weatherapi.com/v1/astronomy.json", { //https://weather-be-hhcd.onrender.com/api/astronomy
    //         params: {
    //            key: keyApi,
    //            q: q,
    //            dt: dt,
    //            lang: lang
    //         },
    //         headers: {
    //            'Content-Type': 'application/json',
    //            'Accept': 'application/json'
    //         }
    //      })
    //      setResAstronomy(response.data)
    //    }
    //    catch (err) {
    //      if (axios.isAxiosError(err)) {
    //         console.error("Axios error:", err.message);
    //         toast.error(err.message);
    //      } else {
    //         console.error("Unexpected error:", err);
    //      }
    //    }
    // }

    // const Api_findTimezone = async (q: string, lang: string) => {
    //    try {
    //      const response = await axios.get("http://api.weatherapi.com/v1/timezone.json", { //https://weather-be-hhcd.onrender.com/api/timezone
    //         params: {
    //            key: keyApi,
    //            q: q,
    //            lang: lang
    //         },
    //         headers: {
    //            'Content-Type': 'application/json',
    //            'Accept': 'application/json'
    //         }
    //      })
    //      setResTimeZone(response.data)
    //    }
    //    catch (err) {
    //      if (axios.isAxiosError(err)) {
    //         console.error("Axios error:", err.message);
    //         toast.error(err.message);
    //      } else {
    //         console.error("Unexpected error:", err);
    //      }
    //    }
    // }

    // const Api_findSports = async (q: string, lang: string) => {
    //    try {
    //      const response = await axios.get("http://api.weatherapi.com/v1/sports.json", { //https://weather-be-hhcd.onrender.com/api/sports
    //         params: {
    //            key: keyApi,
    //            q: q,
    //            lang: lang
    //         },
    //         headers: {
    //            'Content-Type': 'application/json',
    //            'Accept': 'application/json'
    //         }
    //      })
    //      setResSports(response.data)
    //    }
    //    catch (err) {
    //      if (axios.isAxiosError(err)) {
    //         console.error("Axios error:", err.message);
    //         toast.error(err.message);
    //      } else {
    //         console.error("Unexpected error:", err);
    //      }
    //    }
    // }

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
            "CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"
        ]

        return isMobile === true ? weekdays[inputDate.getDay()] : weekdaysFull[inputDate.getDay()]
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

    const convertTo24 = (time12h: string | undefined) => {
        if (!time12h) return undefined;
        const [time, modifier] = time12h.trim().split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier.toUpperCase() === "PM" && hours < 12) {
            hours += 12;
        }
        if (modifier.toUpperCase() === "AM" && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
    };

    const convertDateTime = (input: string | undefined) => {
        if (!input) return undefined;
        const [datePart, timePart] = input.split(" ");
        const [year, month, day] = datePart.split("-");

        return `${timePart} ${day}-${month}-${year}`;
    };

    const timeToMinutes = (timeStr: string) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    }

    const persentMinutes = (timeStr: string) => {
        return timeToMinutes(timeStr) / 1440 * 100
    }

    const presentUV = (uv: number | undefined) => {
        return uv !== undefined ? uv / 11 * 100 : undefined
    }

    return (
        <>
            <main className="min-h-[80vh] p-[20px]">
                <section className="max-w-[1350px] mx-auto grid  items-center gap-4  ">
                    <div className="border-b-[2px] border-b-white/50 pb-[10px] grid gap-4">
                        <div className="flex text-white items-center gap-5 max-md:justify-center">
                            <p className="text-white text-4xl max-md:2xl font-bold relative after:absolute after:w-[4px] after:h-full after:bg-white after:right-[-10px]">{resForecast?.location.name} </p>
                            <p className="text-xl">{resForecast?.location.country}</p>
                        </div>
                        <div className="flex md:justify-between max-md:justify-center pb-[20px]">
                            {/* loaction */}
                            <div className="grid gap-2">
                                <p className="text-white max-md:text-center">{convertDateTime(resForecast?.current.last_updated)}</p>
                                <div className="flex items-center gap-3 max-lg:grid">
                                    <p className="text-white text-8xl font-bold max-md:text-6xl max-md:text-center">{selectTypeCF === 0 ? resForecast?.current.temp_f + "°" : resForecast?.current.temp_c + "°"}</p>
                                    <img className="size-35 max-md:mx-auto max-lg:justify-self-start max-md:hidden" alt={resForecast?.current.condition.text} src={resForecast?.current.condition.icon} />
                                    <p className="text-white text-center md:hidden">{resForecast?.current.condition.text}</p>
                                </div>
                                <p className="text-white/70 max-md:text-sm max-md:text-center">Cảm giác như {selectTypeCF === 0 ? resForecast?.current.feelslike_f + "°" : resForecast?.current.feelslike_c + "°"}</p>
                            </div>

                            {/* img */}
                            <div className="self-end max-md:hidden">
                                <div className="grid justify-center gap-2">
                                    <p className="text-white max-md:text-sm md:text-end">{resForecast?.current.condition.text}</p>
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
                            <span className="mx-auto">{icons.iconDown}</span>
                        </button>
                        <div className={`${showDetailForecast === true ? "" : "hidden"} transition-all duration-300 ease grid gap-5`}>
                            <div className="grid lg:grid-cols-2 gap-5">
                                <button className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(0)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconThermometer}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Nhiệt Độ</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] max-sm:text-sm">
                                        <p className="w-[calc(100%-50px)] text-start">Nhiệt độ cảm nhận</p>
                                        <p>{selectTypeCF === 0 ? resForecast?.current.feelslike_f + "°" : resForecast?.current.feelslike_c + "°"}</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-50px)] text-start">Nhiệt độ gió lạnh</p>
                                        <p>{selectTypeCF === 0 ? resForecast?.current.windchill_f + "°" : resForecast?.current.windchill_c + "°"}</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-50px)] text-start">Chỉ số nhiệt</p>
                                        <p>{selectTypeCF === 0 ? resForecast?.current.heatindex_f + "°" : resForecast?.current.heatindex_c + "°"}</p>
                                    </div>
                                    {/* thêm minh họa ở bên phải:  */}
                                </button>

                                <div className="rounded-[10px] mb-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(1)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconWind}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Gió</p>
                                    </div>
                                    <div className="flex gap-4 justify-between items-center">
                                        <div className="w-full">
                                            <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] max-sm:text-sm">
                                                <p className="w-[calc(100%-78px)] text-start">Gió</p>
                                                <p>{selectWind === "km/h" ? resForecast?.current.wind_kph + " km/h" : resForecast?.current.wind_mph + " mph"}</p>
                                            </div>
                                            <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] max-sm:text-sm">
                                                <p className="w-[calc(100%-78px)] text-start">Gió giật</p>
                                                <p>{selectWind === "km/h" ? resForecast?.current.gust_kph + " km/h" : resForecast?.current.gust_mph + " mph"}</p>
                                            </div>
                                            <div className="flex pt-[15px] pb-[5px] max-sm:text-sm">
                                                <p className="w-[calc(100%-78px)] text-start">Hướng gió</p>
                                                <p>{resForecast?.current.wind_degree}° {windDirectionVN(resForecast?.current.wind_dir) ?? undefined}</p>
                                            </div>
                                        </div>
                                        {/* <ChartWindDoungtnut value={45} speed={12} donvi="m/s" /> */}
                                        <WindDirectionChart
                                            value={selectWind === "km/h" ? resForecast?.current.wind_kph : resForecast?.current.wind_mph}
                                            donvi={selectWind === "km/h" ? "km/h" : "mph"}
                                            direction={resForecast?.current.wind_degree} // 45 độ - hướng Đông Bắc
                                        />
                                    </div>

                                    {/* thêm minh họa ở bên phải: la bàn có mũi tên hướng gió và hiện tốc độ gió */}
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-3 max-lg:grid-cols-2  gap-5 ">
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(2)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconSun}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Chỉ Số UV</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600] text-start max-sm:text-2xl">{resForecast?.current.uv}</p>
                                    {/* thêm minh họa ở giữa  */}
                                    <div className={`w-full my-[15px] h-[5px] rounded-xl [background:linear-gradient(to_right,#00ff00,#ffff00,#ff9900,#ff0000,#800080)] relative before:absolute before:w-[9px] before:h-[9px] before:rounded-full before:z-2 before:border-[2px] before:border-white before:top-[-2px] before:left-[var(--uv-pos)] `}
                                        style={{ "--uv-pos": `${presentUV(resForecast?.current.uv)?.toFixed(0)}%` } as React.CSSProperties}
                                    >
                                    </div>
                                    <p className="text-lg text-start max-sm:text-sm">Đang ở mức {getUVlevel(resForecast?.current.uv) ?? undefined} </p>

                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">

                                    {resForecast?.current.is_day === 1 ?
                                        <>
                                            <div className="flex gap-2 items-center">
                                                <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconSunset}</span>
                                                <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Mặt trời lặn</p>
                                            </div>
                                            <p className="text-3xl my-[15px] font-[600] max-sm:text-2xl">{convertTo24(resForecast?.forecast.forecastday[0].astro.sunset)}</p>
                                            <p className="text-lg max-sm:text-sm">Mặt trời mọc: {convertTo24(resForecast?.forecast.forecastday[0].astro.sunrise)} </p>
                                        </>
                                        :
                                        <>
                                            <div className="flex gap-2 items-center">
                                                <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconSunrise}</span>
                                                <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Mặt trăng lặn</p>
                                            </div>
                                            <p className="text-3xl my-[15px] font-[600] max-sm:text-2xl">{convertTo24(resForecast?.forecast.forecastday[0].astro.moonset)}</p>
                                            <p className="text-lg max-sm:text-sm">Mặt trăng mọc: {convertTo24(resForecast?.forecast.forecastday[0].astro.moonrise)} </p>
                                        </>
                                    }
                                    {/* thêm minh họa */}

                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(3)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconCloudRain}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm ">Lượng Mưa</p>
                                    </div>
                                    {/* them minh hoa */}
                                    <p className="text-3xl my-[15px] font-[600] text-start max-sm:text-2xl">{selectSrecip === "mm" ? resForecast?.current.precip_mm + " mm" : resForecast?.current.precip_in + " in"}</p>
                                    <p className="text-lg text-start max-sm:text-sm">{selectSrecip === "mm" ? getRainLever(resForecast?.current.precip_mm) ?? undefined : getRainLever(resForecast?.current.precip_in) ?? undefined} </p>

                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(5)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconEye}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Tầm Nhìn</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600] text-start max-sm:text-2xl">{selectVis === "km" ? resForecast?.current.vis_km + " km" : resForecast?.current.vis_miles + " dặm"}</p>
                                    {/* them minh hoa */}
                                    <p className="text-lg text-start max-sm:text-sm">Tầm nhìn {selectVis === "km" ? getVisibilityLevel(resForecast?.current.vis_km) ?? undefined : getVisibilityLevel(resForecast?.current.vis_miles) ?? undefined} </p>
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(6)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconTint}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Độ Ẩm</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600] text-start max-sm:text-2xl">{resForecast?.current.humidity}%</p>
                                    <p className="text-lg text-start max-sm:text-sm">Điểm sương là {selectTypeCF === 0 ? resForecast?.current.dewpoint_f + "°" : resForecast?.current.dewpoint_c + "°"} ngay lúc này</p>
                                    {/* thhem mih hoa */}
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(4)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconTachometer}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Áp Suất</p>
                                    </div>
                                    <div className="sm:pb-[25px] mt-[15px] max-sm:pb-[5px]">
                                        <ChartGauge value={selectPressure === "mb" ? resForecast?.current.pressure_mb : resForecast?.current.pressure_in} min={selectPressure === "mb" ? 960 : 28.5} max={selectPressure === "mb" ? 1050 : 31} donvi={selectPressure === "mb" ? " mb" : " in"} backgroundColor={["rgb(255,255,255,0.2)", "white", "rgb(255,255,255,0.2)"]} />
                                    </div>
                                </div>

                            </div>
                            <div className="grid lg:grid-cols-2 gap-5">
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconSolarPanel}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Bức Xạ Mặt Trời</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)]">Bức xạ sóng ngắn</p>
                                        <p>{resForecast?.current.short_rad} W/m²</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)]">Bức xạ khuếch tán</p>
                                        <p>{resForecast?.current.diff_rad} W/m²</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)]">Bức xạ trực tiếp</p>
                                        <p>{resForecast?.current.dni} W/m²</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)]">Bức xạ nghiêng</p>
                                        <p>{resForecast?.current.gti} W/m²</p>
                                    </div>
                                    {/* them minh hoa */}
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full"
                                    onClick={() => {
                                        setSelectDetailDay(0);
                                        setIsSelectDetail(7)
                                        navigate("/chi-tiet-theo-ngay");
                                    }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm max-sm:h-[25px] max-sm:w-[25px]">{icons.iconSmog}</span>
                                        <p className="text-white/70 max-md:text-lg md:text-xl max-sm:text-sm">Chất Lượng Không Khí</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)] text-start">Carbon Monoxide (CO)</p>
                                        <p>{resForecast?.current.air_quality?.co} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)] text-start">Nitrogen Dioxide (NO₂)</p>
                                        <p>{resForecast?.current.air_quality?.no2} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)] text-start">Ozone (O₃)</p>
                                        <p>{resForecast?.current.air_quality?.o3} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)] text-start">Sulfur Dioxide (SO₂)</p>
                                        <p>{resForecast?.current.air_quality?.so2} μg/m³</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px] text-lg max-sm:text-sm">
                                        <p className="w-[calc(100%-110px)] text-start">Bụi mịn PM2.5</p>
                                        <p>{resForecast?.current.air_quality?.pm2_5} μg/m³</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-110px)] text-start text-lg max-sm:text-sm">Bụi mịn PM10</p>
                                        <p>{resForecast?.current.air_quality?.pm10} μg/m³</p>
                                    </div>
                                </div>
                                {/* them minh hoa va Chỉ số EPA Hoa Kỳ & Chỉ số Defra Anh */}
                            </div>
                            <button className="grid justify-center w-full text-white items-center css-icon"
                                onClick={() => { setShowDetailForecast(false) }}
                            >
                                <span className="mx-auto">{icons.iconUp}</span>
                                Đóng lại
                            </button>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto bg-white/5 text-white border-[1px] border-white/5 backdrop-blur-[10px] mt-[30px] shadow-lg rounded-[10px]">
                        <div className="flex m-[25px] gap-3 scroll-x overflow-x-auto py-[10px] max-sm:py-0 w-full">
                            {(() => {
                                // Giờ hôm nay (>= giờ hiện tại)
                                const todayHours =
                                    resForecast?.forecast.forecastday[0].hour
                                        .filter((hour) => {
                                            const forecastHour = new Date(hour.time).getHours();
                                            return forecastHour >= currentHour;
                                        })
                                        .map((hour) => ({ ...hour, dayIndex: 0 })) ?? [];

                                // Giờ ngày mai
                                const tomorrowHours =
                                    resForecast?.forecast.forecastday[1].hour
                                        .map((hour) => ({ ...hour, dayIndex: 1 })) ?? [];

                                // Gộp hôm nay + ngày mai
                                const next24Hours = [...todayHours, ...tomorrowHours].slice(0, 24);

                                return next24Hours.map((hour, index) => {
                                    const forecastHour = new Date(hour.time).getHours();

                                    const isCurrentHour =
                                        hour.dayIndex === 0 && forecastHour === currentHour;

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectDetailDay(hour.dayIndex);
                                                navigate("/chi-tiet-theo-ngay");
                                            }}
                                            className="grid justify-center px-[10px] gap-2"
                                        >
                                            <p className="text-white text-center w-max">
                                                {isCurrentHour ? "Hiện tại" : `${forecastHour}:00`}
                                            </p>
                                            <div>
                                                <img
                                                    className="h-[50px] w-[55px]"
                                                    alt={hour.condition.text}
                                                    src={hour.condition.icon}
                                                />
                                                {hour.will_it_rain == 1 && (
                                                    <p className="text-center text-sm text-cyan-300">
                                                        {hour.chance_of_rain}%
                                                    </p>
                                                )}
                                                {hour.will_it_snow == 1 && (
                                                    <p className="text-center text-sm text-cyan-300">
                                                        {hour.chance_of_snow}%
                                                    </p>
                                                )}
                                            </div>

                                            <p className="text-white max-md:text-sm font-bold text-center self-end">
                                                {selectTypeCF === 0 ? hour.temp_f + "°" : hour.temp_c + "°"}
                                            </p>
                                        </button>
                                    );
                                });
                            })()}

                        </div>
                    </div>

                </section>
                <section className="max-w-[1350px] mt-[30px] mx-auto grid p-[25px] items-center gap-2 bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px]  shadow-lg rounded-[10px]">
                    <div className="flex items-center flex justify-between">
                        <p className=" text-white/70 flex gap-2 items-center pb-[10px] text-lg md:text-xl">Dự báo {selectDays} ngày tới</p>
                        <div className="justify-self-end flex gap-2 items-center pb-[10px]">
                            <p className="text-white/70 text-lg md:text-xl">Chọn</p>
                            <button className="text-white/70"
                                onClick={handleClickCalendar}
                            >{icons.iconCalendar}</button>
                            <Menu
                                anchorEl={anchorElCalendar}
                                open={openCalendar}
                                onClose={handleCloseCalendar}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
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
                    <div className="flex gap-3 w-full max-[920px]:grid">
                        {resForecast?.forecast.forecastday.map((forecast, index) => (
                            <>
                                {is920px ?
                                    <button key={index} className="flex justify-between items-center border-t-[1px] border-t-white/20"
                                        onClick={() => {
                                            setSelectDetailDay(index)
                                            navigate("/chi-tiet-theo-ngay")
                                        }}
                                    >
                                        <table className="w-full">
                                            <tbody >
                                                <tr>
                                                    <td className="w-[85px]">
                                                        <p className="text-white text-start text-lg w-[80px]"> {formatDate(forecast.date)}</p>
                                                    </td>
                                                    <td className="w-[50px]">
                                                        <div className="grid w-[40px]">
                                                            <img className="h-[40px] mx-auto" alt={forecast.day.condition.text} src={forecast.day.condition.icon} />

                                                            {forecast.day.daily_will_it_rain == 1 && (
                                                                <p className="text-center text-sm text-cyan-300">{forecast.day.daily_chance_of_rain}%</p>
                                                            )}
                                                            {forecast.day.daily_will_it_snow == 1 && (
                                                                <p className="text-center text-sm text-cyan-300">{forecast.day.daily_chance_of_snow}%</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="w-[50px]">
                                                        <p className="text-white/70 text-lg  w-[50px]">{selectTypeCF === 0 ? forecast.day.mintemp_f + "°" : forecast.day.mintemp_c + "°"}</p>
                                                    </td>
                                                    {/* them mau  */}
                                                    <td className="p-[10px]">
                                                        <div className="min-w-[40px] flex h-[5px] rounded-full bg-white/30">
                                                            <div
                                                                style={{
                                                                    width: `${persentMinutes(forecast.astro.sunrise)}%`
                                                                }}
                                                            ></div>
                                                            <div className="bg-orange-400 w-full"></div>
                                                            <div style={{
                                                                width: `${(100 - persentMinutes(forecast.astro.sunset))}%`
                                                            }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                    <td className="w-[50px]">
                                                        <p className="text-white text-lg font-bold ">{selectTypeCF === 0 ? forecast.day.maxtemp_f + "°" : forecast.day.maxtemp_c + "°"}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </button>
                                    :
                                    <button key={index} className="rounded-[10px] justify-center grid gap-2 bg-white/10 text-white border-[1px] border-white/10 shadow-lg p-[10px] w-full max-[920px]:hidden"
                                        onClick={() => {
                                            setSelectDetailDay(index)
                                            navigate("/chi-tiet-theo-ngay")
                                        }}
                                    >
                                        <p className="text-white text-center"> {formatDate(forecast.date)}</p>
                                        <img className="h-[50px] w-[55px] mx-auto" alt={forecast.day.condition.text} src={forecast.day.condition.icon} />
                                        <div>
                                            {forecast.day.daily_will_it_rain == 1 && (
                                                <p className="text-center text-cyan-300">{forecast.day.daily_chance_of_rain}%</p>
                                            )}
                                            {forecast.day.daily_will_it_snow == 1 && (
                                                <p className="text-center text-cyan-300">{forecast.day.daily_chance_of_snow}%</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1 self-end">
                                            <p className="text-white max-md:text-sm font-bold">{selectTypeCF === 0 ? forecast.day.maxtemp_f + "°" : forecast.day.maxtemp_c + "°"}</p>
                                            /
                                            <p className="text-white/70 max-md:text-sm">{selectTypeCF === 0 ? forecast.day.mintemp_f + "°" : forecast.day.mintemp_c + "°"}</p>
                                        </div>
                                    </button>
                                }
                            </>
                        ))}
                    </div>
                </section>
            </main >
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Home;