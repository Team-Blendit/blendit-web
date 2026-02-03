export default function HomeBanner() {
  return (
    <section
      className="w-full h-[400px] relative overflow-hidden"
      style={{
        background:
          'linear-gradient(117.36deg, #DCECFF 40.39%, #E3FAFF 76.79%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto h-full relative">
        {/* Text Content */}
        <div className="pt-[83px] flex flex-col gap-[12px]">
          <h2 className="text-[36px] font-semibold text-[#121212] leading-[1.5]">
            IT 직종을 위한 블렌딩 사용법
          </h2>
          <p className="text-[28px] font-medium text-[#004085] leading-[1.5]">
            블렌딩 사용 가이드 살펴보기
          </p>
        </div>

        {/* Background Decorative Ellipses */}
        <div className="absolute right-[-200px] top-[-300px] w-[800px] h-[600px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-white/20 blur-[100px]" />
        </div>
        <div className="absolute right-[0px] bottom-[-200px] w-[600px] h-[600px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-white/20 blur-[100px]" />
        </div>

        {/* 3D Paper */}
        <img
          src="/images/3d-paper.png"
          alt="3D Paper"
          className="absolute right-[57px] bottom-[61px]"
        />

        {/* 3D Pen */}
        <img
          src="/images/3d-pen.png"
          alt="3D Pen"
          className="absolute right-0 bottom-[30px]"
        />
      </div>
    </section>
  );
}
