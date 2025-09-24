import React from 'react';
import { useGlobal } from '../context/GlobalContext';

const Footer: React.FC = () => {
    const { footerContent, header } = useGlobal()
    return (
        <footer className='text-center p-[20px] text-white'>
            <p>&copy; {footerContent.yearFull}{' '}{header.title}. {footerContent.footerText}</p>
        </footer>
    )
}

export default Footer;