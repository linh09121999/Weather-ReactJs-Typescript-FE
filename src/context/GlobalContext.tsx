import React, { createContext, useContext, useState } from "react";
import type { JSX, ReactNode } from "react";
import { useMediaQuery } from "@mui/material"

// Định nghĩa interface cho cấu trúc dữ liệu vị trí
export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

// Định nghĩa interface cho điều kiện thời tiết
export interface Condition {
    text: string;
    icon: string;
    code: number;
}

export interface AirQuality {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    us_epa_index: number;
    gb_defra_index: number;
}

export interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality?: AirQuality;
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
}

export interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
}

export interface AstroExtended extends Astro {
    is_moon_up: number;
    is_sun_up: number;
}

export interface Tide {
    tide_time: string;
    tide_height_mt: string;
    tide_type: string;
}

export interface Tides {
    tide: Tide[];
}

export interface Alerts {
    alert: string[]
}

export interface Hour {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
}

export interface HourForecast extends Hour {
    snow_cm: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    air_quality?: AirQuality;
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
}

export interface HourFuture extends Hour {
    precip_mm: number;
    precip_in: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
}

export interface HourMarine extends Hour {
    precip_mm: number;
    precip_in: number;
    sig_ht_mt: number;
    swell_ht_mt: number;
    swell_ht_ft: number;
    swell_dir: number;
    swell_dir_16_point: string;
    swell_period_secs: number;
    water_temp_c: number;
    water_temp_f: number;
}

export interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: Condition;
    uv: number;
}

export interface DayForecast extends Day {
    totalsnow_cm: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    air_quality?: AirQuality;
}

export interface DayMarine extends Day {
    totalsnow_cm: number;
    tides: Tides[];
}

export interface ResSearch {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

export interface ResAlerts {
    location: Location;
    alerts: Alerts
}

export interface ResTimeZone {
    location: Location;
}

export interface Sports {
    stadium: string;
    country: string;
    region: string;
    tournament: string;
    start: string;
    match: string;
}

export interface ResSports {
    football: Sports[];
    cricket: Sports[];
    golf: Sports[]
}

export interface ResCurrent {
    location: Location;
    current: Current;
}

export interface ResForecast {
    location: Location;
    current: Current;
    forecast: {
        forecastday: {
            date: string;
            date_epoch: number;
            day: DayForecast;
            astro: AstroExtended;
            hour: HourForecast[];
        }[];
    };
    alerts?: Alerts
}

export interface ResFuture {
    location: Location;
    forecast: {
        forecastday: {
            date: string;
            date_epoch: number;
            day: Day;
            astro: Astro;
            hour: HourFuture[];
        }[];
    }
}

export interface ResMarine {
    location: Location;
    forecast: {
        forecastday: {
            date: string;
            date_epoch: number;
            day: DayMarine;
            astro: AstroExtended;
            hour: HourMarine[];
        }[];
    }
}

export interface ResAstronomy {
    location: Location;
    astronomy: {
        astro: AstroExtended;
    }
}

export interface Lang {
    id: string;
    title: string;
    img: string
}

const defaultLang: Lang[] = [
    { id: "ar", title: "Arabic", img: "https://flagcdn.com/w40/sa.png" },
    { id: "bn", title: "Bengali", img: "https://flagcdn.com/w40/bd.png" },
    { id: "bg", title: "Bulgarian", img: "https://flagcdn.com/w40/bg.png" },
    { id: "zh", title: "Chinese Simplified", img: "https://flagcdn.com/w40/cn.png" },
    { id: "zh_tw", title: "Chinese Traditional", img: "https://flagcdn.com/w40/tw.png" },
    { id: "cs", title: "Czech", img: "https://flagcdn.com/w40/cz.png" },
    { id: "da", title: "Danish", img: "https://flagcdn.com/w40/dk.png" },
    { id: "nl", title: "Dutch", img: "https://flagcdn.com/w40/nl.png" },
    { id: "fi", title: "Finnish", img: "https://flagcdn.com/w40/fi.png" },
    { id: "fr", title: "French", img: "https://flagcdn.com/w40/fr.png" },
    { id: "de", title: "German", img: "https://flagcdn.com/w40/de.png" },
    { id: "el", title: "Greek", img: "https://flagcdn.com/w40/gr.png" },
    { id: "hi", title: "Hindi", img: "https://flagcdn.com/w40/in.png" },
    { id: "hu", title: "Hungarian", img: "https://flagcdn.com/w40/hu.png" },
    { id: "it", title: "Italian", img: "https://flagcdn.com/w40/it.png" },
    { id: "ja", title: "Japanese", img: "https://flagcdn.com/w40/jp.png" },
    { id: "jv", title: "Javanese", img: "https://flagcdn.com/w40/id.png" },
    { id: "ko", title: "Korean", img: "https://flagcdn.com/w40/kr.png" },
    { id: "zh_cmn", title: "Mandarin", img: "https://flagcdn.com/w40/cn.png" },
    { id: "mr", title: "Marathi", img: "https://flagcdn.com/w40/in.png" },
    { id: "pl", title: "Polish", img: "https://flagcdn.com/w40/pl.png" },
    { id: "pt", title: "Portuguese", img: "https://flagcdn.com/w40/pt.png" },
    { id: "pa", title: "Punjabi", img: "https://flagcdn.com/w40/in.png" },
    { id: "ro", title: "Romanian", img: "https://flagcdn.com/w40/ro.png" },
    { id: "ru", title: "Russian", img: "https://flagcdn.com/w40/ru.png" },
    { id: "sr", title: "Serbian", img: "https://flagcdn.com/w40/rs.png" },
    { id: "si", title: "Sinhalese", img: "https://flagcdn.com/w40/lk.png" },
    { id: "sk", title: "Slovak", img: "https://flagcdn.com/w40/sk.png" },
    { id: "es", title: "Spanish", img: "https://flagcdn.com/w40/es.png" },
    { id: "sv", title: "Swedish", img: "https://flagcdn.com/w40/se.png" },
    { id: "ta", title: "Tamil", img: "https://flagcdn.com/w40/in.png" },
    { id: "te", title: "Telugu", img: "https://flagcdn.com/w40/in.png" },
    { id: "tr", title: "Turkish", img: "https://flagcdn.com/w40/tr.png" },
    { id: "uk", title: "Ukrainian", img: "https://flagcdn.com/w40/ua.png" },
    { id: "ur", title: "Urdu", img: "https://flagcdn.com/w40/pk.png" },
    { id: "vi", title: "Vietnamese", img: "https://flagcdn.com/w40/vn.png" },
    { id: "zh_wuu", title: "Wu (Shanghainese)", img: "https://flagcdn.com/w40/cn.png" },
    { id: "zh_hsn", title: "Xiang", img: "https://flagcdn.com/w40/cn.png" },
    { id: "zh_yue", title: "Yue (Cantonese)", img: "https://flagcdn.com/w40/hk.png" },
    { id: "zu", title: "Zulu", img: "https://flagcdn.com/w40/za.png" }
]

export interface GlobalState {
    resCurrent: ResCurrent | undefined;
    setResCurrent: React.Dispatch<React.SetStateAction<ResCurrent | undefined>>;

    resForecast: ResForecast | undefined;
    setResForecast: React.Dispatch<React.SetStateAction<ResForecast | undefined>>;

    resSearch: ResSearch[];
    setResSearch: React.Dispatch<React.SetStateAction<ResSearch[]>>;

    resAlerts: ResAlerts | undefined;
    setResAlerts: React.Dispatch<React.SetStateAction<ResAlerts | undefined>>;

    resFuture: ResFuture | undefined;
    setResFuture: React.Dispatch<React.SetStateAction<ResFuture | undefined>>;

    resMarine: ResMarine | undefined;
    setResMarine: React.Dispatch<React.SetStateAction<ResMarine | undefined>>;

    resAstronomy: ResAstronomy | undefined;
    setResAstronomy: React.Dispatch<React.SetStateAction<ResAstronomy | undefined>>;

    resTimeZone: ResTimeZone | undefined;
    setResTimeZone: React.Dispatch<React.SetStateAction<ResTimeZone | undefined>>;

    resSports: ResSports | undefined;
    setResSports: React.Dispatch<React.SetStateAction<ResSports | undefined>>;

    isMobile: boolean;
    keyApi: string;
    lang: Lang[];
    selectLang: string;
    selectSetLang: (selectLang: string) => void;
    yes_no: string[];
    selectAqi: string;
    setSelectAqi: (selectAqi: string) => void;
    selectAlerts: string;
    setSelectAlerts: (selectAlerts: string) => void;
    days: number[]
    selectDays: number;
    setSelectDays: (selectDays: number) => void;
    dt: string;
    setDt: (dt: string) => void;
    selectQ: string;
    setSelectQ: (selectQ: string) => void;
}


const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const keyApi = "230f3011bf6d47bd997172046252009";

    const [resCurrent, setResCurrent] = useState<ResCurrent>();
    const [resForecast, setResForecast] = useState<ResForecast>();
    const [resSearch, setResSearch] = useState<ResSearch[]>([]);
    const [resAlerts, setResAlerts] = useState<ResAlerts>();
    const [resFuture, setResFuture] = useState<ResFuture>();
    const [resMarine, setResMarine] = useState<ResMarine>();
    const [resAstronomy, setResAstronomy] = useState<ResAstronomy>();
    const [resTimeZone, setResTimeZone] = useState<ResTimeZone>();
    const [resSports, setResSports] = useState<ResSports>();

    const [selectQ, setSelectQ] = useState<string>("HaNoi")

    const [selectLang, selectSetLang] = useState<string>("vi")

    const yes_no = ["yes", "no"]
    const days = [1, 2, 3, 4, 5, 6, 7]

    const [selectAqi, setSelectAqi] = useState<string>("no")
    const [selectAlerts, setSelectAlerts] = useState<string>("no")

    const [selectDays, setSelectDays] = useState<number>(1)

    const [dt, setDt] = useState<string>("2025-09-23")

    const value = {
        resCurrent, setResCurrent,
        resForecast, setResForecast,
        resSearch, setResSearch,
        resAlerts, setResAlerts,
        resFuture, setResFuture,
        resMarine, setResMarine,
        resAstronomy, setResAstronomy,
        resTimeZone, setResTimeZone,
        resSports, setResSports,
        isMobile,
        keyApi,
        lang: defaultLang,
        selectLang, selectSetLang,
        yes_no,
        selectAqi, setSelectAqi,
        selectAlerts, setSelectAlerts,
        days,
        selectDays, setSelectDays,
        dt, setDt,
        selectQ, setSelectQ
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for convenience
export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};