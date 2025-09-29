import React, { createContext, useContext, useState } from "react";
import type { JSX, ReactNode } from "react";
import { useMediaQuery } from "@mui/material"

import {
    FaHome,
    FaUser,
    FaMapMarkerAlt,
    FaAngleDoubleUp,
    FaChevronDown,
    FaChevronUp,
    FaThermometerHalf,
    FaWind,
    FaTachometerAlt,
    FaCloudRain,
    FaTint,
    FaEye,
    FaSun,
    FaSolarPanel,
    FaSmog,
    FaCloud,
    FaRegSnowflake
} from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { CgMenu } from "react-icons/cg";
import {
    IoClose,
} from "react-icons/io5";
import {
    MdNavigateNext,
} from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { BsFillSunsetFill, BsFillSunriseFill } from "react-icons/bs"
import { LuSettings2 } from "react-icons/lu";

import imgRain from "../assets/image/img-rain.png"
import imgDay from "../assets/image/img-day.png"
import imgNight from "../assets/image/img-night.png"

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
    "us-epa-index": number;
    "gb-defra-index": number;
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

export interface Alert {
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    certainty: string;
    event: string;
    note: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string
}

export interface Alerts {
    alert: Alert[] | undefined
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

export interface Forecastday {
    date: string;
    date_epoch: number;
}

export interface ForecastdayForecast extends Forecastday {
    day: DayForecast;
    astro: AstroExtended;
    hour: HourForecast[];
}

export interface ResForecast {
    location: Location;
    current: Current;
    forecast: {
        forecastday: ForecastdayForecast[];
    };
    alerts?: Alerts
}

export interface ForecastdayFuture extends Forecastday {
    day: Day;
    astro: Astro;
    hour: HourFuture[];
}

export interface ResFuture {
    location: Location;
    forecast: {
        forecastday: ForecastdayFuture[];
    }
}

export interface ForecastdayMarine extends Forecastday {
    day: DayMarine;
    astro: AstroExtended;
    hour: HourMarine[];
}

export interface ResMarine {
    location: Location;
    forecast: {
        forecastday: ForecastdayMarine[];
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
    {
        id: "ar",
        title: "Arabic",
        img: "https://flagcdn.com/w40/sa.png"
    },
    {
        id: "bn",
        title: "Bengali",
        img: "https://flagcdn.com/w40/bd.png"
    },
    {
        id: "bg",
        title: "Bulgarian",
        img: "https://flagcdn.com/w40/bg.png"
    },
    {
        id: "zh",
        title: "Chinese Simplified",
        img: "https://flagcdn.com/w40/cn.png"
    },
    {
        id: "zh_tw",
        title: "Chinese Traditional",
        img: "https://flagcdn.com/w40/tw.png"
    },
    {
        id: "cs",
        title: "Czech",
        img: "https://flagcdn.com/w40/cz.png"
    },
    {
        id: "da",
        title: "Danish",
        img: "https://flagcdn.com/w40/dk.png"
    },
    {
        id: "nl",
        title: "Dutch",
        img: "https://flagcdn.com/w40/nl.png"
    },
    {
        id: "fi",
        title: "Finnish",
        img: "https://flagcdn.com/w40/fi.png"
    },
    {
        id: "fr",
        title: "French",
        img: "https://flagcdn.com/w40/fr.png"
    },
    {
        id: "de",
        title: "German",
        img: "https://flagcdn.com/w40/de.png"
    },
    {
        id: "el",
        title: "Greek",
        img: "https://flagcdn.com/w40/gr.png"
    },
    {
        id: "hi",
        title: "Hindi",
        img: "https://flagcdn.com/w40/in.png"
    },
    {
        id: "hu",
        title: "Hungarian",
        img: "https://flagcdn.com/w40/hu.png"
    },
    {
        id: "it",
        title: "Italian",
        img: "https://flagcdn.com/w40/it.png"
    },
    {
        id: "ja",
        title: "Japanese",
        img: "https://flagcdn.com/w40/jp.png"
    },
    {
        id: "jv",
        title: "Javanese",
        img: "https://flagcdn.com/w40/id.png"
    },
    {
        id: "ko",
        title: "Korean",
        img: "https://flagcdn.com/w40/kr.png"
    },
    {
        id: "zh_cmn",
        title: "Mandarin",
        img: "https://flagcdn.com/w40/cn.png"
    },
    {
        id: "mr",
        title: "Marathi",
        img: "https://flagcdn.com/w40/in.png"
    },
    {
        id: "pl",
        title: "Polish",
        img: "https://flagcdn.com/w40/pl.png"
    },
    {
        id: "pt",
        title: "Portuguese",
        img: "https://flagcdn.com/w40/pt.png"
    },
    {
        id: "pa",
        title: "Punjabi",
        img: "https://flagcdn.com/w40/in.png"
    },
    {
        id: "ro",
        title: "Romanian",
        img: "https://flagcdn.com/w40/ro.png"
    },
    {
        id: "ru",
        title: "Russian",
        img: "https://flagcdn.com/w40/ru.png"
    },
    {
        id: "sr",
        title: "Serbian",
        img: "https://flagcdn.com/w40/rs.png"
    },
    {
        id: "si",
        title: "Sinhalese",
        img: "https://flagcdn.com/w40/lk.png"
    },
    {
        id: "sk",
        title: "Slovak",
        img: "https://flagcdn.com/w40/sk.png"
    },
    {
        id: "es",
        title: "Spanish",
        img: "https://flagcdn.com/w40/es.png"
    },
    {
        id: "sv",
        title: "Swedish",
        img: "https://flagcdn.com/w40/se.png"
    },
    {
        id: "ta",
        title: "Tamil",
        img: "https://flagcdn.com/w40/in.png"
    },
    {
        id: "te",
        title: "Telugu",
        img: "https://flagcdn.com/w40/in.png"
    },
    {
        id: "tr",
        title: "Turkish",
        img: "https://flagcdn.com/w40/tr.png"
    },
    {
        id: "uk",
        title: "Ukrainian",
        img: "https://flagcdn.com/w40/ua.png"
    },
    {
        id: "ur",
        title: "Urdu",
        img: "https://flagcdn.com/w40/pk.png"
    },
    {
        id: "vi",
        title: "Vietnamese",
        img: "https://flagcdn.com/w40/vn.png"
    },
    {
        id: "zh_wuu",
        title: "Wu (Shanghainese)",
        img: "https://flagcdn.com/w40/cn.png"
    },
    {
        id: "zh_hsn",
        title: "Xiang",
        img: "https://flagcdn.com/w40/cn.png"
    },
    {
        id: "zh_yue",
        title: "Yue (Cantonese)",
        img: "https://flagcdn.com/w40/hk.png"
    },
    {
        id: "zu",
        title: "Zulu",
        img: "https://flagcdn.com/w40/za.png"
    }
]

export interface Icons {
    iconMenu: JSX.Element;
    iconClose: JSX.Element;
    iconBackToTop: JSX.Element;
    iconMap: JSX.Element;
    iconNext: JSX.Element;
    iconUser: JSX.Element;
    iconCalendar: JSX.Element;
    iconUp: JSX.Element;
    iconDown: JSX.Element;
    iconThermometer: JSX.Element;
    iconWind: JSX.Element;
    iconTachometer: JSX.Element;
    iconCloudRain: JSX.Element;
    iconTint: JSX.Element;
    iconEye: JSX.Element;
    iconSun: JSX.Element;
    iconSolarPanel: JSX.Element;
    iconSmog: JSX.Element;
    iconCloud: JSX.Element;
    iconSunset: JSX.Element;
    iconHome: JSX.Element;
    iconSunrise: JSX.Element;
    iconSnow: JSX.Element;
    iconSetting: JSX.Element;
}

const defaultIcons: Icons = {
    iconMenu: <CgMenu />,
    iconClose: <IoClose className=" mx-auto" />,
    iconBackToTop: <FaAngleDoubleUp />,
    iconMap: <FaMapMarkerAlt size={30} />,
    iconNext: <MdNavigateNext size={24} />,
    iconUser: <FaUser />,
    iconCalendar: <FaCalendarDays />,
    iconUp: <FaChevronUp />,
    iconDown: <FaChevronDown />,
    iconThermometer: <FaThermometerHalf className="mx-auto" />,
    iconWind: <FaWind className="mx-auto" />,
    iconTachometer: <FaTachometerAlt className="mx-auto" />,
    iconCloudRain: <FaCloudRain className="mx-auto" />,
    iconTint: <FaTint className="mx-auto" />,
    iconEye: <FaEye className="mx-auto" />,
    iconSun: <FaSun className="mx-auto" />,
    iconSolarPanel: <FaSolarPanel className="mx-auto" />,
    iconSmog: <FaSmog className="mx-auto" />,
    iconCloud: <FaCloud className="mx-auto" />,
    iconSunset: <BsFillSunsetFill className="mx-auto" />,
    iconSunrise: <BsFillSunriseFill className="mx-auto" />,
    iconSnow: <FaRegSnowflake className="mx-auto" />,
    iconHome: <FaHome />,
    iconSetting: <LuSettings2 className="mx-auto" />,
}

export interface Header {
    title: string;
    iconSearch: JSX.Element;
    descSearch: string;
    date: Date | null;
}

const defaultHeader: Header = {
    title: "Dự báo thời tiết",
    iconSearch: <IoMdSearch />,
    descSearch: "Tìm kiếm thành phố ...",
    date: new Date()
}

export interface ListCity {
    code: number;
    codename: string;
    division_type: string;
    name: string;
    phone_code: number;
    wards: string[]
}

export interface TypeCF {
    id: number;
    title: string
}

const defaultTypeCF: TypeCF[] = [
    {
        id: 0,
        title: "°F"
    },
    {
        id: 1,
        title: "°C"
    }
]

export interface Footer {
    footerText: string;
    yearFull: number;
}

const defaultFooter: Footer = {
    footerText: "Dữ liệu được cung cấp bởi các API thời tiết hàng đầu.",
    yearFull: new Date().getFullYear(),
}

export interface SelectDays {
    id: number;
    desc: string
}

const defaultSelectDays: SelectDays[] = [
    {
        id: 3,
        desc: "3 ngày tới"
    },
    {
        id: 4,
        desc: "4 ngày tới"
    },
    {
        id: 5,
        desc: "5 ngày tới"
    },
    {
        id: 6,
        desc: "6 ngày tới"
    },
    {
        id: 7,
        desc: "7 ngày tới"
    },
]

export interface ListSelectShowDetail {
    id: number;
    icon: JSX.Element;
    title: string;
}

const defaultListSelectShowDetail: ListSelectShowDetail[] = [
    {
        id: 0,
        icon: defaultIcons.iconThermometer,
        title: "Điều kiện thời tiết"
    },
    {
        id: 1,
        icon: defaultIcons.iconWind,
        title: "Gió"
    },
    {
        id: 2,
        icon: defaultIcons.iconSun,
        title: "Chỉ Số UV"
    },
    {
        id: 3,
        icon: defaultIcons.iconCloudRain,
        title: "Lượng Mưa"
    },
    {
        id: 4,
        icon: defaultIcons.iconTachometer,
        title: "Áp suất"
    },
    {
        id: 5,
        icon: defaultIcons.iconEye,
        title: "Tầm Nhìn"
    },
    {
        id: 6,
        icon: defaultIcons.iconTint,
        title: "Độ Ẩm"
    },
    {
        id: 7,
        icon: defaultIcons.iconSmog,
        title: "Chất Lượng Không Khí"
    },
]

export interface TypeTemp_Fellslike {
    id: number;
    title: string;
    desc: string;
}

const defaultTypeTemp_Fellslike: TypeTemp_Fellslike[] = [
    {
        id: 0,
        title: "Thực tế",
        desc: "Nhiệt độ thực tế"
    },
    {
        id: 1,
        title: "Cảm nhận",
        desc: "Cảm nhận về nhiệt độ, do độ ẩm, ánh nắng hoặc gió gây ra"
    }
]

export interface ListBeaufore {
    bft: number;
    desc: string;
    angel: string;
    color: string;
}

const defaultListBeaufore: ListBeaufore[] = [
    {
        bft: 0,
        desc: "Lặng gió",
        angel: "< 2",
        color: "bg-sky-600"
    },
    {
        bft: 1,
        desc: "Gió rất nhẹ",
        angel: "2 - 5",
        color: "bg-cyan-600"
    },
    {
        bft: 2,
        desc: "Gió yếu",
        angel: "6 - 11",
        color: "bg-teal-600"
    },
    {
        bft: 3,
        desc: "Gió nhẹ",
        angel: "12 - 19",
        color: "bg-emerald-500"
    },
    {
        bft: 4,
        desc: "Gió vừa phải",
        angel: "20 - 28",
        color: "bg-green-400"
    },
    {
        bft: 5,
        desc: "Gió mạnh vừa phải",
        angel: "29 - 38",
        color: "bg-lime-300"
    },
    {
        bft: 6,
        desc: "Gió khá mạnh",
        angel: "39 - 49",
        color: "bg-yellow-200"
    },
    {
        bft: 7,
        desc: "Gió mạnh",
        angel: "50 - 61",
        color: "bg-yellow-300"
    },
    {
        bft: 8,
        desc: "Gió lốc",
        angel: "62 - 74",
        color: "bg-amber-400"
    },
    {
        bft: 9,
        desc: "Gió lốc mạnh",
        angel: "75 - 87",
        color: "bg-orange-400"
    },
    {
        bft: 10,
        desc: "Bão",
        angel: "88 - 102",
        color: "bg-amber-600"
    },
    {
        bft: 11,
        desc: "Bão rất mạnh",
        angel: "103 - 117",
        color: "bg-orange-600"
    },
    {
        bft: 12,
        desc: "Siêu bão",
        angel: "> 118",
        color: "bg-red-600"
    },
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
    is920px: boolean;
    keyApi: string;
    lang: Lang[];
    selectLang: string;
    selectSetLang: (selectLang: string) => void;
    yes_no: string[];
    selectAqi: string;
    setSelectAqi: (selectAqi: string) => void;
    selectAlerts: string;
    setSelectAlerts: (selectAlerts: string) => void;
    days: SelectDays[]
    selectDays: number;
    setSelectDays: (selectDays: number) => void;
    dt: string;
    setDt: (dt: string) => void;
    selectQ: string | undefined;
    setSelectQ: (selectQ: string | undefined) => void;

    icons: Icons;

    header: Header;
    typeCF: TypeCF[];
    selectTypeCF: number;
    setSelectTypeCF: (selectTypeCF: number) => void

    footerContent: Footer;

    selectDetailDay: number; //mếu = 0: resForecast?.forecast.forecastday[0]
    setSelectDetailDay: (selectDetailDay: number) => void;

    listSelectShowDetail: ListSelectShowDetail[];
    listSrecip: string[];
    listWind: string[];
    listPressure: string[];
    listVis: string[];
    listAir: string[];

    selectSrecip: string;
    setSelectSrecip: (selectSrecip: string) => void;
    selectWind: string;
    setSelectWind: (selectWind: string) => void;
    selectPressure: string;
    setSelectPressure: (selectPressure: string) => void;
    selectVis: string;
    setSelectVis: (selectVis: string) => void;
    selectAir: string;
    setSelectAir: (selectAir: string) => void;
    typeTemp_Fellslike: TypeTemp_Fellslike[];
    listBeaufore: ListBeaufore[];
    isSelectDetail: number;
    setIsSelectDetail: (isSelectDetail: number) => void;
    selectTypeTemp_Fellslike: number;
    setSelectTypeTemp_Fellslike: (selectTypeTemp_Fellslike: number) => void;
    currentHour: number,
    isBorderDash: number,
    windDirectionVN: (dir: string | undefined) => void;
    getUVlevel: (uv: number | undefined) => void;
    getRainLever: (rain: number | undefined) => void;
    getVisibilityLevel: (vis: number | undefined) => void;
    getUsEpaLever: (lv: number | undefined) => void;
    getgetGbDefraLevel: (lv: number | undefined) => void;
    img_Rain: string;
    img_Day: string;
    img_Night: string;
    formatCityName: (city: string) => string;
    removeVietnameseTones: (str: string) => string,
    timestamp: number | null;
    checkTimeExp: () => boolean;
    setForecast: (data: ResForecast) => void;
}


const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const is920px = useMediaQuery("(max-width:920px)");

    const keyApi = "230f3011bf6d47bd997172046252009";

    const img_Rain = imgRain;
    const img_Day = imgDay;
    const img_Night = imgNight

    const [resCurrent, setResCurrent] = useState<ResCurrent>();
    const [resForecast, setResForecast] = useState<ResForecast>();
    const [resSearch, setResSearch] = useState<ResSearch[]>([]);
    const [resAlerts, setResAlerts] = useState<ResAlerts>();
    const [resFuture, setResFuture] = useState<ResFuture>();
    const [resMarine, setResMarine] = useState<ResMarine>();
    const [resAstronomy, setResAstronomy] = useState<ResAstronomy>();
    const [resTimeZone, setResTimeZone] = useState<ResTimeZone>();
    const [resSports, setResSports] = useState<ResSports>();

    const [timestamp, setTimestamp] = useState<number | null>(null);
    const setForecast = (data: ResForecast) => {
        setResForecast(data);
        setTimestamp(Date.now());
    };
    // true = đã hết hạn, false = còn hạn
    const checkTimeExp = () => {
        if (!timestamp) return true;
        return Date.now() - timestamp > 5 * 60 * 1000; // 5 phút
    };

    const [selectQ, setSelectQ] = useState<string | undefined>("HaNoi");

    const [selectLang, selectSetLang] = useState<string>("vi")

    const yes_no = ["yes", "no"]

    const [selectAqi, setSelectAqi] = useState<string>("yes")
    const [selectAlerts, setSelectAlerts] = useState<string>("no")

    const [selectDays, setSelectDays] = useState<number>(7)

    const [dt, setDt] = useState<string>("2025-09-23")
    const [selectTypeCF, setSelectTypeCF] = useState<number>(1)

    const [selectDetailDay, setSelectDetailDay] = useState<number>(0)
    const currentHour = new Date().getHours();

    const listSrecip = ["mm", "in"]
    const listWind = ["km/h", "mph"]
    const listPressure = ["mb", "in"]
    const listVis = ["km", "dặm"]
    const listAir = ["us-epa", "gb-defra"]

    const [selectSrecip, setSelectSrecip] = useState<string>("mm")
    const [selectWind, setSelectWind] = useState<string>("km/h")
    const [selectPressure, setSelectPressure] = useState<string>("mb")
    const [selectVis, setSelectVis] = useState<string>("km")
    const [selectAir, setSelectAir] = useState<string>("us-epa")
    const [isSelectDetail, setIsSelectDetail] = useState<number>(0)
    const [selectTypeTemp_Fellslike, setSelectTypeTemp_Fellslike] = useState<number>(0)

    const isBorderDash = selectDetailDay === 0 ? currentHour : 0

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

    const formatCityName = (city: string): string => {
        return city
            .replace(/^Thành phố\s*/i, "") // bỏ "Thành phố" ở đầu
            .normalize("NFD") // tách ký tự gốc và dấu
            .replace(/[\u0300-\u036f]/g, "") // xoá dấu
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s+/g, " ") // gộp khoảng trắng thừa
            .trim();
    };

    const removeVietnameseTones = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    const getUVlevel = (uv: number | undefined) => {
        if (uv === undefined || uv === null) return undefined;
        const levers = [
            { min: 11, label: "Cực đoan" },
            { min: 8, label: "Rất cao" },
            { min: 6, label: "Cao" },
            { min: 3, label: "Trung bình" },
        ];

        return levers.find(l => uv >= l.min)?.label || "Thấp";
    }

    const getRainLever = (rain: number | undefined) => {
        if (rain === undefined || rain === null) return undefined;

        const levers = [
            { minMM: 50, minIn: 2, label: "Mưa rất to" },
            { minMM: 7.6, minIn: 0.3, label: "Mưa to" },
            { minMM: 2.5, minIn: 0.098, label: "Mưa vừa" },
        ];

        return selectSrecip === "mm" ?
            levers.find(l => rain >= l.minMM)?.label || "Mưa nhỏ"
            :
            levers.find(l => rain >= l.minIn)?.label || "Mưa nhỏ"
    }

    const getVisibilityLevel = (vis: number | undefined) => {
        if (vis === undefined || vis === null) return undefined;
        const levels = [
            { minKm: 19, minMiles: 11.8, label: "Hoàn toàn rõ" },
            { minKm: 15, minMiles: 9.3, label: "Rõ ràng" },
            { minKm: 10, minMiles: 6.2, label: "Khá rõ" },
            { minKm: 5, minMiles: 3.1, label: "Trung bình" },
            { minKm: 1, minMiles: 0.6, label: "Hạn chế" },
            { minKm: 0.2, minMiles: 0.12, label: "Kém" }
        ];

        return selectVis === "km" ? levels.find(l => vis >= l.minKm)?.label || "Rất kém"
            :
            levels.find(l => vis >= l.minMiles)?.label || "Rất kém"
    }

    const getUsEpaLever = (lv: number | undefined) => {
        if (lv === undefined || lv === null) return undefined;

        const levels: Record<number, string> = {
            1: "Tốt",
            2: "Trung bình",
            3: "Không tốt",
            4: "Không lành mạnh",
            5: "Xấu",
            6: "Nguy hại"
        };
        return levels[lv];
    }

    const getgetGbDefraLevel = (lv: number | undefined) => {
        if (lv === undefined || lv === null) return undefined;

        const levels = [
            { min: 10, label: "Rất cao" },
            { min: 7, label: "Cao" },
            { min: 4, label: "Trung bình" },
        ];

        return levels.find(l => lv >= l.min)?.label || "Thấp";
    }

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
        setForecast, checkTimeExp, timestamp,
        img_Rain, img_Day, img_Night,
        isMobile, is920px,
        keyApi,
        lang: defaultLang,
        selectLang, selectSetLang,
        yes_no,
        selectAqi, setSelectAqi,
        selectAlerts, setSelectAlerts,
        days: defaultSelectDays,
        selectDays, setSelectDays,
        dt, setDt,
        selectQ, setSelectQ,
        removeVietnameseTones,
        icons: defaultIcons,
        header: defaultHeader,
        typeCF: defaultTypeCF,
        selectTypeCF, setSelectTypeCF,
        footerContent: defaultFooter,
        selectDetailDay, setSelectDetailDay,
        listSelectShowDetail: defaultListSelectShowDetail,
        listSrecip, listWind, listPressure, listVis, listAir,
        selectSrecip, setSelectSrecip,
        selectWind, setSelectWind,
        selectPressure, setSelectPressure,
        selectVis, setSelectVis,
        selectAir, setSelectAir,
        typeTemp_Fellslike: defaultTypeTemp_Fellslike,
        listBeaufore: defaultListBeaufore,
        isSelectDetail, setIsSelectDetail,
        selectTypeTemp_Fellslike, setSelectTypeTemp_Fellslike,
        currentHour,
        isBorderDash,
        formatCityName,
        windDirectionVN, getUVlevel, getRainLever, getVisibilityLevel, getUsEpaLever, getgetGbDefraLevel
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