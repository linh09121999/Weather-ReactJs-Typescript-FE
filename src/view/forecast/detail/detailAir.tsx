import React from "react";
import { useGlobal } from '../../../context/GlobalContext';
import ChartMultiLine from "../../../charts/chartMultiLine";
import ChartLineBase from "../../../charts/chartLineBase";

const DetailAir: React.FC = () => {
  const {
    selectDetailDay,
    resForecast,
    isBorderDash,
    isMobile,
    typeAir,
    selectTypeAir, setSelectTypeAir
  } = useGlobal()

  const hours = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => {
      const date = new Date(h.time);
      return `${date.getHours()}:00`; // hiển thị 0h, 1h, 2h...
    }
  ) ?? [];

  const dataDetail = [
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.["us-epa-index"] ?? 0
    ) ?? [],
    resForecast?.forecast.forecastday[selectDetailDay].hour.map(
      (h) => h.air_quality?.["gb-defra-index"] ?? 0
    ) ?? [],
  ]

  const label = ["Us-epa", "Gb-defra"]

  const co = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => h.air_quality?.co ?? 0
  ) ?? []
  const no2 = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => h.air_quality?.no2 ?? 0
  ) ?? []
  const o3 = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => h.air_quality?.o3 ?? 0
  ) ?? []
  const so2 = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => h.air_quality?.so2 ?? 0
  ) ?? []
  const pm2_5 = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => h.air_quality?.pm2_5 ?? 0
  ) ?? []
  const pm10 = resForecast?.forecast.forecastday[selectDetailDay].hour.map(
    (h) => h.air_quality?.pm10 ?? 0
  ) ?? []

  const dvAir = isMobile ? "" : "μg/m³"

  return (
    <div className='grid gap-6'>
      <div className="w-full p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px] grid gap-4">
        <ChartMultiLine
          stepSize={0.5}
          label={label}
          hours={hours}
          dataDetail={dataDetail}
          border={["red", "blue"]}
          background={[
            "rgba(255,0,0,0.2)",
            "rgba(0,0,255,0.2)",
          ]}
          currentIndex={isBorderDash} donvi={""} />
      </div>

      <div className='grid grid-cols-2 gap-6 max-lg:hidden'>
        <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
          <ChartLineBase stepSize={100} title={typeAir[0].title} currentIndex={isBorderDash} hours={hours} dataDetail={co} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
        </div>
        <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
          <ChartLineBase stepSize={10} title={typeAir[1].title} currentIndex={isBorderDash} hours={hours} dataDetail={no2} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
        </div>
        <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
          <ChartLineBase stepSize={10} title={typeAir[2].title} currentIndex={isBorderDash} hours={hours} dataDetail={o3} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
        </div>
        <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
          <ChartLineBase stepSize={10} title={typeAir[3].title} currentIndex={isBorderDash} hours={hours} dataDetail={so2} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
        </div>
        <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
          <ChartLineBase stepSize={10} title={typeAir[4].title} currentIndex={isBorderDash} hours={hours} dataDetail={pm2_5} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
        </div>
        <div className="w-full p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
          <ChartLineBase stepSize={10} title={typeAir[5].title} currentIndex={isBorderDash} hours={hours} dataDetail={pm10} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
        </div>
      </div>
      <div className='grid gap-4 lg:hidden'>
        {/* bieu do theo selectTypeTemp_Fellslike */}
        {selectTypeAir === 0 &&
          <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
            <ChartLineBase stepSize={100} currentIndex={isBorderDash} hours={hours} dataDetail={co} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
          </div>
        }
        {selectTypeAir === 1 &&
          <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
            <ChartLineBase stepSize={10} currentIndex={isBorderDash} hours={hours} dataDetail={no2} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
          </div>
        }
        {selectTypeAir === 2 &&
          <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
            <ChartLineBase stepSize={10} currentIndex={isBorderDash} hours={hours} dataDetail={o3} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
          </div>
        }
        {selectTypeAir === 3 &&
          <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
            <ChartLineBase stepSize={10} currentIndex={isBorderDash} hours={hours} dataDetail={so2} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
          </div>
        }
        {selectTypeAir === 4 &&
          <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
            <ChartLineBase stepSize={10} currentIndex={isBorderDash} hours={hours} dataDetail={pm2_5} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
          </div>
        }
        {selectTypeAir === 5 &&
          <div className="w-full max-sm:p-[15px] p-[25px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]">
            <ChartLineBase stepSize={10} currentIndex={isBorderDash} hours={hours} dataDetail={pm10} borderColor="white" backgroundColor="rgb(255,255,255,0.5)" donvi={dvAir} />
          </div>
        }

        <div className='flex bg-white/5 rounded-[15px] backdrop-blur-[10px] border-[1px] border-solid border-white/10 px-[5px] py-[5px] shadow-lg text-lg '>
          {typeAir.map((type) => (
            <>
              <button key={type.id}
                className={`px-[6px] w-1/2 py-[2px] rounded-[10px] transition-all duration-300 ease  ${selectTypeAir === type.id ? "bg-white font-bold text-[#2B32B2]" : "text-white"}`}
                onClick={() => {
                  setSelectTypeAir(type.id)
                }}
              >{type.title.toLowerCase()}</button>
            </>
          ))}
        </div>
      </div>

      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về khí CO</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            "Khí CO" thường đề cập đến khí Carbon monoxide (CO), một loại khí không màu, không mùi, không vị, có độc tính cao và có thể gây tử vong. Khí CO được sinh ra từ sự đốt cháy không hoàn toàn các nhiên liệu chứa carbon như gas, xăng, dầu, củi, than, đặc biệt là trong điều kiện thiếu oxy.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về khí NO2</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            Khí NO₂ (Nitơ đioxit) là một khí độc màu nâu đỏ, có mùi hăng đặc trưng, được tạo ra từ quá trình đốt cháy nhiên liệu, đặc biệt từ hoạt động giao thông và công nghiệp. NO₂ là một chất gây ô nhiễm không khí, có thể gây kích ứng đường hô hấp, làm trầm trọng thêm bệnh hen suyễn và góp phần tạo ra sương mù quang hóa, mưa axit, cũng như các hạt bụi mịn. Khí này cũng là thành phần quan trọng trong sản xuất axit nitric và có ứng dụng trong ngành thực phẩm để ức chế vi khuẩn.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về khí O3</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            Khí "03" mà bạn nhắc đến là Ozone (O3), một dạng thù hình của oxy, bao gồm ba nguyên tử oxy liên kết với nhau. Ozone có màu xanh nhạt và mùi tanh đặc trưng. Nó đóng vai trò quan trọng trong việc bảo vệ Trái Đất khỏi tia cực tím có hại trong tầng bình lưu, nhưng ở nồng độ cao tại mặt đất lại gây hại cho sức khỏe con người.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về khí S02</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            Khí SO₂ là lưu huỳnh đioxit (sulfur dioxide), một chất khí không màu, nặng hơn không khí, có mùi hăng, khó chịu và độc hại. Nó là một trong những nguyên nhân chính gây ô nhiễm môi trường và tác động tiêu cực đến sức khỏe con người, đặc biệt là hệ hô hấp. SO₂ được phát thải chủ yếu từ việc đốt nhiên liệu hóa thạch chứa lưu huỳnh (than đá, dầu mỏ), hoạt động núi lửa và công nghiệp luyện kim.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về khí MP2.5</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            Khí PM2.5 (Bụi mịn PM2.5) là những hạt vật chất cực nhỏ có đường kính khí động học dưới 2,5 micromet (μm), có thể xâm nhập sâu vào phổi và máu, gây ra các bệnh về tim mạch, hô hấp, ung thư phổi và các vấn đề sức khỏe nghiêm trọng khác. Các nguồn phổ biến bao gồm khí thải giao thông, nhà máy điện, hoạt động công nghiệp, cháy rừng, và cả các hoạt động trong nhà như nấu nướng.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về khí MP10</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            "Khí MP10" có thể đề cập đến Khí P10, một loại khí trộn công nghiệp được sử dụng trong hàn cắt, luyện kim, và các ứng dụng bảo quản khác, có thành phần gồm 10% CH₄ và 90% Ar, không màu, không mùi và rất dễ cháy. Ngoài ra, "MP10" còn có thể là tên viết tắt của một khu dân cư như Mizuki Park MP10 thuộc dự án Mizuki Park, một khu đô thị tích hợp với nhiều tiện ích xanh.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về chỉ số US-EPA</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            "Chỉ số US-EPA" là thuật ngữ chung để chỉ các tiêu chuẩn và phương pháp do Cơ quan Bảo vệ Môi trường Hoa Kỳ (United States Environmental Protection Agency - EPA) đặt ra để đánh giá và kiểm soát các vấn đề môi trường như ô nhiễm không khí, chất lượng nước hoặc các hóa chất độc hại. Ví dụ phổ biến là chỉ số chất lượng không khí AQI (do EPA sử dụng) để thông báo mức độ ô nhiễm không khí, hoặc các chỉ số TDS (tổng chất rắn hòa tan) trong nước uống.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <p className='text-white text-xl font-bold '>Giới thiệu về chỉ số GB-DEFRA</p>
        <div className='p-[25px] max-sm:p-[15px] bg-white/5 border-[1px] border-solid border-white/10 backdrop-blur-[10px] shadow-lg rounded-[10px]'>
          <p className='text-white text-lg '>
            Chỉ số DEFRA (Department for Environment, Food & Rural Affairs) là các hệ số phát thải và chuyển đổi do chính phủ Vương quốc Anh ban hành, chủ yếu dùng để tính toán và báo cáo lượng khí thải carbon trong các hoạt động kinh doanh và sinh hoạt, đặc biệt là trong bối cảnh làm việc tại nhà hoặc sử dụng năng lượng.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DetailAir