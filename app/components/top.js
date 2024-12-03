function Top({ title }) {
  return (
    <div
      className="w-full h-screen bg-center bg-cover flex items-center justify-center "
      style={{
        backgroundImage: "url('/images/HeroSection/toppic.png')", // กำหนดรูปภาพเป็นพื้นหลัง
      }}
    >
      {/* แสดงค่าจาก prop ในตำแหน่งกลาง */}
      <h1 className="text-4xl text-white font-bold text-shadow uppercase" style={{ textShadow: '4px 4px 6px rgba(0, 0, 0, 0.6)' }}>
  {title}
</h1>


    </div>
  );
}

export default Top;
