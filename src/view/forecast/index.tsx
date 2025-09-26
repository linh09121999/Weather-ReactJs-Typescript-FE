import React, { useEffect, useState } from "react";
import { useGlobal } from '../../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { MenuItem, Menu } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

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
            backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
            color: 'var(--color-cyan-300) !important',
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
        // yes_no,
        selectLang,
        // selectSetLang,
        selectAqi,
        // setSelectAqi,
        selectAlerts,
        // setSelectAlerts,
        days,
        selectDays, setSelectDays,
        // dt, setDt,
        selectQ,
        // setSelectQ,
        selectTypeCF,
        // setSelectTypeCF,
        icons,
        setSelectDetailDay,
        listSrecip, listWind, listPressure, listVis,
        is920px, isMobile,
        selectSrecip, setSelectSrecip,
        selectWind, setSelectWind,
        selectPressure, setSelectPressure,
        selectVis, setSelectVis
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

    const windDirectionVN = (dir: string | undefined) => {
        if (!dir) return undefined;
        const map: Record<string, string> = {
            N: "B",
            S: "N",
            E: "Đ",
            W: "T",
        };

        return dir
            .split("")       // tách chuỗi thành từng ký tự
            .map((c) => map[c] || c) // đổi sang tiếng Việt
            .join("");
    }


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
                                <p className="text-white max-md:text-center">{resForecast?.current.last_updated}</p>
                                <div className="flex items-center gap-3 max-lg:grid">
                                    <p className="text-white text-8xl font-bold max-md:text-6xl max-md:text-center">{selectTypeCF === 0 ? resForecast?.current.temp_f + "°" : resForecast?.current.temp_c + "°"}</p>
                                    <img className="size-35 max-md:justify-self-center max-lg:justify-self-start max-md:hidden" alt={resForecast?.current.condition.text} src={resForecast?.current.condition.icon} />
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
                            <span className="justify-self-center">{icons.iconDown}</span>
                        </button>
                        <div className={`${showDetailForecast === true ? "" : "hidden"} transition-all duration-300 ease grid gap-5`}>
                            <div className="grid lg:grid-cols-2 gap-5">
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconThermometer}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Nhiệt Độ</p>
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
                                    {/* thêm minh họa ở bên phải:  */}
                                </div>

                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconWind}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Gió</p>
                                    </div>

                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-78px)]">Gió</p>
                                        <p>{selectWind === "km/h" ? resForecast?.current.wind_kph + " km/h" : resForecast?.current.wind_mph + " mph"}</p>
                                    </div>
                                    <div className="flex border-b-[1px] border-b-white/20 pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-78px)]">Gió giật</p>
                                        <p>{selectWind === "km/h" ? resForecast?.current.gust_kph + " km/h" : resForecast?.current.gust_mph + " mph"}</p>
                                    </div>
                                    <div className="flex pt-[15px] pb-[5px]">
                                        <p className="w-[calc(100%-78px)]">Hướng gió</p>
                                        <p>{resForecast?.current.wind_degree}° {windDirectionVN(resForecast?.current.wind_dir)}</p>
                                    </div>
                                    {/* thêm minh họa ở bên phải: la bàn có mũi tên hướng gió và hiện tốc độ gió */}
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 ">
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconSun}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Chỉ Số UV</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{resForecast?.current.uv}</p>
                                    {/* thêm minh họa ở giữa  */}

                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">

                                    {resForecast?.current.is_day === 1 ?
                                        <>
                                            <div className="flex gap-2 items-center">
                                                <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconSunset}</span>
                                                <p className="text-white/70 text-lg md:text-xl">Mặt trời lặn</p>
                                            </div>
                                            <p className="text-3xl my-[15px] font-[600]">{convertTo24(resForecast?.forecast.forecastday[0].astro.sunset)}</p>
                                            <p className="text-lg">Mặt trời mọc: {convertTo24(resForecast?.forecast.forecastday[0].astro.sunrise)} </p>
                                        </>
                                        :
                                        <>
                                            <div className="flex gap-2 items-center">
                                                <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconSunrise}</span>
                                                <p className="text-white/70 text-lg md:text-xl">Mặt trăng lặn</p>
                                            </div>
                                            <p className="text-3xl my-[15px] font-[600]">{convertTo24(resForecast?.forecast.forecastday[0].astro.moonset)}</p>
                                            <p className="text-lg">Mặt trăng mọc: {convertTo24(resForecast?.forecast.forecastday[0].astro.moonrise)} </p>
                                        </>
                                    }
                                    {/* thêm minh họa */}

                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconCloudRain}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Lượng Mưa</p>
                                    </div>

                                    {/* them minh hoa */}
                                    <p className="text-3xl my-[15px] font-[600]">{selectSrecip === "mm" ? resForecast?.current.precip_mm + " mm" : resForecast?.current.precip_in + " in"}</p>
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconEye}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Tầm Nhìn</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{selectVis === "km" ? resForecast?.current.vis_km + " km" : resForecast?.current.vis_miles + " dặm"}</p>
                                    {/* them minh hoa */}
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconTint}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Độ Ẩm</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{resForecast?.current.humidity}%</p>
                                    <p className="text-lg">Điểm sương là {selectTypeCF === 0 ? resForecast?.current.dewpoint_f + "°" : resForecast?.current.dewpoint_c + "°"} ngay lúc này</p>
                                    {/* thhem mih hoa */}
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconTachometer}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Áp Suất</p>
                                    </div>
                                    <p className="text-3xl my-[15px] font-[600]">{selectPressure === "mb" ? resForecast?.current.pressure_mb + " mb" : resForecast?.current.pressure_in + " in"}</p>
                                    {/* them minh hoa */}
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 max-lg:grid-cols-1 gap-5">
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconSolarPanel}</span>
                                        <p className="text-white/70 text-lg md:text-xl md:text-xl">Bức Xạ Mặt Trời</p>
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
                                    {/* them minh hoa */}
                                </div>
                                <div className="rounded-[10px] justify-center bg-white/5 backdrop-blur-[10px] text-white border-[1px] border-white/10 shadow-lg p-[20px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-[30px] h-[30px] bg-white/20 rounded-full  content-center max-md:text-sm">{icons.iconSmog}</span>
                                        <p className="text-white/70 text-lg md:text-xl">Chất Lượng Không Khí</p>
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
                                {/* them minh hoa va Chỉ số EPA Hoa Kỳ & Chỉ số Defra Anh */}
                            </div>
                            <button className="grid justify-center w-full text-white items-center css-icon"
                                onClick={() => { setShowDetailForecast(false) }}
                            >
                                <span className="justify-self-center">{icons.iconUp}</span>
                                Đóng lại
                            </button>
                        </div>
                    </div>
                    <button className="flex overflow-x-auto bg-white/10 text-white border-[1px] border-white/5 backdrop-blur-[10px] mt-[30px] shadow-lg rounded-[10px]"
                        onClick={() => {
                            setSelectDetailDay(0)
                            navigate("/chi-tiet-theo-ngay")
                        }}
                    >
                        <div className="flex m-[25px] gap-3 scroll-x overflow-x-auto">
                            {resForecast?.forecast.forecastday[0].hour.map((hour, index) => (
                                <div key={index}
                                    className="grid justify-center p-[10px] gap-2"
                                >
                                    <p className="text-white text-center"> {index}:00</p>
                                    <div>
                                        <img className="h-[50px] w-[55px]" alt={hour.condition.text} src={hour.condition.icon} />
                                        {hour.will_it_rain == 1 && (
                                            <p className="text-center text-sm text-cyan-300">{hour.chance_of_rain}%</p>
                                        )}
                                        {hour.will_it_snow == 1 && (
                                            <p className="text-center text-sm text-cyan-300">{hour.chance_of_snow}%</p>
                                        )}
                                    </div>

                                    <p className="text-white max-md:text-sm font-bold text-center self-end">{selectTypeCF === 0 ? hour.temp_f + "°" : hour.temp_c + "°"}</p>
                                </div>
                            ))}
                        </div>
                    </button>

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
                                    <button className="flex justify-between items-center border-t-[1px] border-t-white/20"
                                        onClick={() => {
                                            setSelectDetailDay(index)
                                            navigate("/chi-tiet-theo-ngay")
                                        }}
                                    >
                                        <table className="w-full">
                                            <tr>
                                                <td className="w-[85px]">
                                                    <p className="text-white text-start text-lg w-[80px]"> {formatDate(forecast.date)}</p>
                                                </td>
                                                <td className="w-[50px]">
                                                    <div className="grid w-[40px]">
                                                        <img className="h-[40px] justify-self-center" alt={forecast.day.condition.text} src={forecast.day.condition.icon} />

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
                                                    <div className="min-w-[40px]  h-[5px] rounded-full bg-white/30"></div>
                                                </td>
                                                <td className="w-[50px]">
                                                    <p className="text-white text-lg font-bold ">{selectTypeCF === 0 ? forecast.day.maxtemp_f + "°" : forecast.day.maxtemp_c + "°"}</p>
                                                </td>
                                            </tr>
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
                                        <img className="h-[50px] w-[55px] justify-self-center" alt={forecast.day.condition.text} src={forecast.day.condition.icon} />
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