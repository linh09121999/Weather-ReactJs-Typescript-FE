import React, { useEffect, useState, useCallback } from "react";
import { useGlobal } from '../context/GlobalContext';
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
            color: 'rgb(26,41,128) !important',
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
        resCurrent, setResCurrent,
        resForecast, setResForecast,
        resSearch, setResSearch,
        resAlerts, setResAlerts,
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

    const Api_findCurrent = async (q: string, aqi: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/current.json", { //https://weather-be-hhcd.onrender.com/api/current
                params: {
                    key: keyApi,
                    q: q,
                    aqi: aqi,
                    lang: lang
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setResCurrent(response.data)
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

    const Api_findSearch = async (q: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/search.json", { //https://weather-be-hhcd.onrender.com/api/search
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
            setResSearch(response.data)
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

    const Api_findAlerts = async (q: string, lang: string) => {
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/alerts.json", { //https://weather-be-hhcd.onrender.com/api/alerts
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
            setResAlerts(response.data)
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
        // Api_findSearch(selectQ!, selectLang)
        // Api_findAlerts(selectQ!, selectLang)
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

    return (
        <>
            <main className="min-h-[69vh] my-[30px] p-[20px]">
                <section className="max-w-[1350px] mx-auto grid  items-center gap-4 bg-white/5 border-[1px] border-solid border-white/40 backdrop-blur-[10px] p-[25px] shadow-[0 8px 32px rgba(0, 0, 0, 0.1)] rounded-[20px]">
                    <div className="grid grid-col-1 md:grid-cols-2 border-b-[2px] border-b-white/50 pb-[10px]">
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
                        <div className="justify-self-end">
                            <div className="grid justify-center gap-2">
                                <p className="text-white text-xl text-end">{resForecast?.current.condition.text}</p>
                                <div className="text-white grid gap-1">
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
                <section className="max-w-[1350px] mt-[30px] mx-auto grid p-[25px] items-center gap-4 bg-white/5 border-[1px] border-solid border-white/40 backdrop-blur-[10px]  shadow-[0 8px 32px rgba(0, 0, 0, 0.1)] rounded-[20px]">
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
                            <div key={index} className="rounded-[10px] justify-center grid gap-2 bg-white/30 text-white border-[1px] border-white/40 p-[10px] w-full">
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