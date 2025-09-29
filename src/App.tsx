import React, { Suspense } from 'react';
import { Route, Routes, Navigate, Outlet, BrowserRouter } from 'react-router-dom';
import { useGlobal } from './context/GlobalContext';

import { Footer, Header, Nav, BackToTop } from './components';

const Home = React.lazy(() => import('./view/forecast/index'));
const DetailForecast = React.lazy(() => import('./view/forecast/detail'));
const Page404 = React.lazy(() => import('./view/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./view/pages/page500/Page500'));

const ProtectedRoute: React.FC = () => {
  const { resForecast, currentHour, img_Rain, img_Day, img_Night } = useGlobal();

  const bgImg = resForecast?.forecast.forecastday[0].hour[currentHour].will_it_rain === 0 ?
    (
      resForecast?.current.is_day === 0 ? img_Night : img_Day
    )
    : img_Rain

  return (
    <div className="flex flex-col w-full h-full" >
      <img src={bgImg} alt="Background" className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"></img>
      {/* <!-- Header --> */}
      <div className='text-center p-[5px] bg-white text-red-900 font-[600] max-sm:text-sm'>! Địa điểm có thể chưa chính xác vì api của quốc tế</div>
      <BackToTop />
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </div>

  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/trang-chu" replace />} />
            <Route path="/trang-chu" element={<Home />} />
            <Route path="/chi-tiet-theo-ngay" element={<DetailForecast />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
};

export default App
