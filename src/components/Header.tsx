import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputAdornment,
    FormControl,
    Autocomplete,
    MenuItem, Menu
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";
import { useGlobal } from '../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import type { ListCity } from '../context/GlobalContext';

const Header: React.FC = () => {

    const sxFormControl = {
        minWidth: 250,
        margin: 0
    }

    const componentsProps: SxProps<Theme> = {
        paper: {
            sx: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                zIndex: 100,
                '& .MuiAutocomplete-option': {
                    minHeight: '30px !important',
                    color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiAutocomplete-option:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
                    color: 'var(--color-cyan-300) !important',
                    fontWeight: 600
                },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
                    color: 'var(--color-cyan-300) !important',
                    fontWeight: 600
                }
            }
        }
    }

    const sxText: SxProps<Theme> = {
        '& .MuiOutlinedInput-root': {
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            height: '40px',
            boxShadow: 'var(--shadow-lg)'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            // border: '1px solid rgba(255, 255, 255, 0.4) !important',
            border: 'none',
            boxShadow: 'var(--shadow-xl)'
        },
    }

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
    }

    const {
        header,
        selectQ, setSelectQ,
        typeCF, selectTypeCF, setSelectTypeCF,
        icons,
        selectSrecip, setSelectSrecip,
        selectWind, setSelectWind,
        selectPressure, setSelectPressure,
        selectVis, setSelectVis,
        selectAir, setSelectAir,
        listSrecip, listWind, listPressure, listVis, listAir,
    } = useGlobal()
    const [listQ, setListQ] = useState<ListCity[]>([])

    const Api_findLocate = async () => {
        try {
            const response = await axios.get("https://provinces.open-api.vn/api/v2/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            setListQ(response.data)

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
        Api_findLocate()
    }, [])

    const removeVietnameseTones = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    const [anchorElSetting, setAnchorElSetting] = useState<null | HTMLElement>(null);
    const openSetting = Boolean(anchorElSetting);
    const handleClickSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSetting(event.currentTarget);
    };
    const handleCloseSetting = () => {
        setAnchorElSetting(null);
    };

    return (
        <>
            <header className='top-0 sticky z-100 backdrop-blur-[10px] border-b-[1px] border-b-white/40 px-[20px]'>
                <div className='max-w-[1350px] mx-auto py-[20px] grid md:grid-cols-2 gap-4 items-center '>
                    <div className='flex items-center gap-4 justify-between'>
                        <span className='text-3xl font-bold text-white'>{header.title}</span>
                        <button className="md:hidden w-[40px] h-[40px] bg-white/5 rounded-full text-white text-xl font-700 backdrop-blur-[10px] border-[1px] border-solid border-white/10 shadow-lg css-icon hover:shadow-2xl transition-all duration-300 ease"
                            onClick={handleClickSetting}
                        >
                            {openSetting ? icons.iconClose : icons.iconSetting}
                        </button>
                    </div>
                    <div className='flex gap-2 justity-self-end'>
                        <FormControl className="w-full" sx={sxFormControl} size="small">
                            <Autocomplete
                                disableClearable
                                noOptionsText="Không có trong danh sách"
                                options={listQ}
                                componentsProps={componentsProps}
                                getOptionLabel={(option) => option.name}
                                filterOptions={(options, { inputValue }) =>
                                    options.filter((option) =>
                                        removeVietnameseTones(option.name).toLowerCase().includes(
                                            removeVietnameseTones(inputValue).toLowerCase()
                                        )
                                    )
                                }
                                value={
                                    selectQ
                                        ? listQ.find((c) => c.name === selectQ) ?? undefined
                                        : undefined
                                }
                                onChange={(_, newValue) => {
                                    setSelectQ(newValue ? newValue.name : undefined);
                                }}
                                renderInput={(params) => (
                                    <TextField  {...params}
                                        type="search"
                                        placeholder="Tìm kiếm tỉnh thành..."
                                        sx={sxText}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <InputAdornment position="end" sx={{ marginRight: '-20px', color: 'white' }}>
                                                    <button className='btn-merge'>
                                                        {header.iconSearch}
                                                    </button>
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                )}
                            />
                        </FormControl>

                        <button className="max-md:hidden w-[40px] h-[40px] bg-white/5 rounded-full text-white text-xl font-700 backdrop-blur-[10px] border-[1px] border-solid border-white/10 shadow-lg css-icon hover:shadow-2xl transition-all duration-300 ease"
                            onClick={handleClickSetting}
                        >
                            {openSetting ? icons.iconClose : icons.iconSetting}
                        </button>
                        <Menu
                            anchorEl={anchorElSetting}
                            open={openSetting}
                            onClose={handleCloseSetting}
                            PaperProps={PaperProps}
                            MenuListProps={MenuListProps}
                        >
                            <MenuItem sx={sxMenuItem}>
                                <div className='flex justify-between w-full items-center gap-3'>Nhiệt độ
                                    <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg'>
                                        {typeCF.map((type, index) => (
                                            <button key={index}
                                                className={`px-[12px] py-[2px] rounded-[50px] transition-all duration-300 ease text-white ${index === selectTypeCF ? "bg-white/30" : ""}`}
                                                onClick={() => {
                                                    setSelectTypeCF(type.id)
                                                }}
                                            >{type.title}</button>
                                        ))}
                                    </div>
                                </div>
                            </MenuItem>
                            <MenuItem sx={sxMenuItem}>
                                <div className='flex justify-between w-full items-center gap-3'>Gió
                                    <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg'>
                                        {listWind.map((wind, index) => (
                                            <button key={index}
                                                className={`px-[12px] py-[2px] rounded-[15px] transition-all duration-300 ease text-white ${selectWind === wind ? "bg-white/30" : ""}`}
                                                onClick={() => {
                                                    setSelectWind(wind)
                                                }}
                                            >{wind}</button>
                                        ))}
                                    </div>
                                </div>
                            </MenuItem>
                            <MenuItem sx={sxMenuItem}>
                                <div className='flex justify-between w-full items-center gap-3'>Lượng mưa
                                    <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg'>
                                        {listSrecip.map((srecip, index) => (
                                            <button key={index}
                                                className={`px-[12px] py-[2px] rounded-[15px] transition-all duration-300 ease text-white ${selectSrecip === srecip ? "bg-white/30" : ""}`}
                                                onClick={() => {
                                                    setSelectSrecip(srecip)
                                                }}
                                            >{srecip}</button>
                                        ))}
                                    </div>
                                </div>
                            </MenuItem>
                            <MenuItem sx={sxMenuItem}>
                                <div className='flex justify-between w-full items-center gap-3'>Tầm Nhìn
                                    <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg'>
                                        {listVis.map((vis, index) => (
                                            <button key={index}
                                                className={`px-[12px] py-[2px] rounded-[15px] transition-all duration-300 ease text-white ${selectVis === vis ? "bg-white/30" : ""}`}
                                                onClick={() => {
                                                    setSelectVis(vis)
                                                }}
                                            >{vis}</button>
                                        ))}
                                    </div>
                                </div>
                            </MenuItem>
                            <MenuItem sx={sxMenuItem}>
                                <div className='flex justify-between w-full items-center gap-3'>Áp Suất
                                    <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg'>
                                        {listPressure.map((pressure, index) => (
                                            <button key={index}
                                                className={`px-[12px] py-[2px] rounded-[15px] transition-all duration-300 ease text-white ${selectPressure === pressure ? "bg-white/30" : ""}`}
                                                onClick={() => {
                                                    setSelectPressure(pressure)
                                                }}
                                            >{pressure}</button>
                                        ))}
                                    </div>
                                </div>
                            </MenuItem>
                            <MenuItem sx={sxMenuItem}>
                                <div className='flex justify-between w-full items-center gap-3'>Chất lượng không khí
                                    <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg'>
                                        {listAir.map((air, index) => (
                                            <button key={index}
                                                className={`px-[12px] py-[2px] rounded-[15px] transition-all duration-300 ease text-white ${selectAir === air ? "bg-white/30" : ""}`}
                                                onClick={() => {
                                                    setSelectAir(air)
                                                }}
                                            >{air}</button>
                                        ))}
                                    </div>
                                </div>
                            </MenuItem>
                        </Menu>

                    </div>
                </div>
            </header>
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Header