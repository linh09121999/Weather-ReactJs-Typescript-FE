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
        selectQ, setSelectQ
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
        // Api_findCurrent(selectQ, selectAqi, selectLang)
        // Api_findForecast(selectQ, selectDays, selectAqi, selectAlerts, selectLang)
        // Api_findSearch(selectQ, selectLang)
        // Api_findAlerts(selectQ, selectLang)
        // Api_findFuture(selectQ, dt, selectLang)
        // Api_findMarine(selectQ, selectDays, selectLang)
        // Api_findAstronomy(selectQ, dt, selectLang)
        // Api_findTimezone(selectQ, selectLang)
        // Api_findSports(selectQ, selectLang)
    }, [])


    return (
        <>
            <div className="text-3xl font-bold underline flex items-center justify-center h-full text-black" > {resCurrent?.location.name}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Home;