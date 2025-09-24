import React, { useEffect, useState, useCallback } from "react";
import { useGlobal } from '../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Home: React.FC = () => {
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
        Api_findForecast(selectQ!, selectDays, selectAqi, selectAlerts, selectLang)
        // Api_findSearch(selectQ!, selectLang)
        // Api_findAlerts(selectQ!, selectLang)
        // Api_findFuture(selectQ!, dt, selectLang)
        // Api_findMarine(selectQ!, selectDays, selectLang)
        // Api_findAstronomy(selectQ!, dt, selectLang)
        // Api_findTimezone(selectQ!, selectLang)
        // Api_findSports(selectQ!, selectLang)
    }, [selectQ])


    return (
        <>
            <main className="min-h-[69vh] my-[30px] p-[20px]">
                <section className="max-w-[1350px] mx-auto grid  items-center gap-4 bg-white/5 border-[1px] border-solid border-white/40 backdrop-blur-[10px] p-[25px] shadow-[0 8px 32px rgba(0, 0, 0, 0.1)] rounded-[20px]">
                    <div className="grid grid-col-1 md:grid-cols-2">
                        {/* loaction */}
                        <div className="grid gap-2">
                            <div className="flex text-white items-center gap-5">
                                <p className="text-white text-4xl font-bold md:relative md:after:absolute md:after:w-[4px] md:after:h-full md:after:bg-white md:after:right-[-10px]">{resForecast?.location.name} </p>
                                <p className="text-xl">{resForecast?.location.country}</p>
                            </div>
                            <p className="text-white">{resForecast?.current.last_updated}</p>
                            <p className="text-white text-8xl font-bold">{selectTypeCF === 0 ? resForecast?.current.temp_f + "°F" : resForecast?.current.temp_c + "°C"}</p>
                            <p className="text-white/70 text-xl ">Cảm giác như {selectTypeCF === 0 ? resForecast?.current.feelslike_f + "°F" : resForecast?.current.feelslike_c + "°C"}</p>
                        </div>

                        {/* img */}
                        <div className="justify-self-end">
                            <div className="grid justify-center">
                                <img className="size-35 justify-self-center" alt={resForecast?.current.condition.text} src={resForecast?.current.condition.icon} />
                                <p className="text-white text-xl text-center">{resForecast?.current.condition.text}</p>
                            </div>

                        </div>
                    </div>
                    {resForecast?.forecast.forecastday[0].hour.map((hour, index) => (
                        <div key={index}></div>
                    ))}
                </section>
                <section className="max-w-[1350px] mt-[30px] mx-auto grid p-[25px] items-center gap-4 bg-white/5 border-[1px] border-solid border-white/40 backdrop-blur-[10px]  shadow-[0 8px 32px rgba(0, 0, 0, 0.1)] rounded-[20px]">
                    <div className="flex grid grid-col-1 md:grid-cols-2 border-b-[2px] border-b-white/50">
                        <p className=" text-white/70 flex gap-2 items-center pb-[10px]">{icons.iconCalendar} Dự báo {selectDays} ngày tới</p>
                        <div className="justify-self-end"></div>
                    </div>
                    <div className=""></div>
                </section>
            </main>
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Home;