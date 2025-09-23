import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    IconButton,
    FormControl,
    Autocomplete,
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

    const componentsProps = {
        paper: {
            sx: {
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '& .MuiAutocomplete-option': {
                    minHeight: '30px !important',
                    color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiAutocomplete-option:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
                    color: 'rgb(26,41,128) !important',
                },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
                    color: 'rgb(26,41,128) !important',
                    fontWeight: 600
                }
            }
        }
    }

    const sxText = {
        '& .MuiOutlinedInput-root': {
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            height: '40px'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid rgba(255, 255, 255, 0.4) !important',
            boxShadow: "0 0 0 0.25rem rgb(210, 134, 26, 0.2)"
        },
    }

    const { header, selectQ, setSelectQ, typeCF, selectTypeCF, setSelectTypeCF } = useGlobal()
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

    return (
        <>
            <header className='max-md:top-0 max-md:sticky z-100 backdrop-blur-[10px]'>
                <div className='max-w-[1350px] mx-auto py-[20px] justify-between flex items-center max-[1350px]:px-[20px]'>
                    <div className='flex items-center gap-4 max-md:grid max-md:gap-1'>
                        <span className='text-3xl font-bold text-white'>{header.title}</span>
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
                        <div className='flex bg-white/5 rounded-[50px] backdrop-blur-[10px] border-[1px] border-solid border-white/40 px-[5px] py-[5px]'>
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
                </div>
            </header>
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Header