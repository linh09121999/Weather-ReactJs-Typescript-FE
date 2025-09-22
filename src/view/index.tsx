import React from "react";
import { useGlobal } from '../context/GlobalContext';

const Home: React.FC = () => {

    const {  } = useGlobal();
    return (
        <div className="text-3xl font-bold underline flex items-center justify-center h-full" > {}
        </div>
    )
}

export default Home;