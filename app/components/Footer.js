// components/Footer.js
export default function Footer() {
  return (
    <footer className="hidden">
      <div
        className="w-[118.9rem] h-[67rem]"
        style={{ backgroundImage: "url(/images/yuk.jpg)" }}
      >
      </div>
      <div id="footer"
        className="w-auto h-auto p-10"
        style={{ backgroundImage: "url(/images/footer.jpg)" }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* logo ด้านซ้าย */}
        <div className="flex justify-center md:justify-center items-center">
          <img
            src="/images/logo_edited.avif" // ใส่พาธของรูปโลโก้ที่ต้องการ
            alt="Logo"
            className="w-[15rem] h-auto" // ปรับขนาดของโลโก้ตามที่ต้องการ
          />
        </div>
        {/* กลาง */}
        <div className="py-5">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 ">
            Paradise Express
          </h3>
          <p className="text-gray-600 mb-4">
            41/147 Moo 6, Sainoi Sub-district,
            <br />
            Sainoi District, Nonthaburi province
            <br />
            11150 THAILAND
          </p>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h4>
          <p className="text-gray-600">
            <strong>Telephone:</strong> 098-459-6582 (Within Thailand)
            <br />
            <strong>Oversea Call:</strong> +66 98-459-6582
            <br />
            <strong>WhatsApp:</strong> 098-459-6582
          </p>
          <h4 className="text-xl font-semibold text-gray-800 mt-8">About Us</h4>
        </div>

        {/* ด้านขวา */}
        <div className="flex flex-col items-center text-center md:text-left">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <img
              src="/images/QR_Fb-removebg-preview.png"
              alt="Facebook QR Code"
              className="w-[10rem]"
            />
            <p className="text-gray-600 text-sm mb-2">
              FB : https://web.facebook.com/paradiseexpress56/
            </p>
            <img src="/images/46.jpg" alt="LINE QR Code" className="w-[7rem]" />
          </div>
          <p className="text-gray-600 mb-2">@paradiseexpress</p>
          <p className="text-gray-400 text-right ml-auto">© copy by GM Sky</p>
        </div>
      </div>
      </div>

    </footer>
  );
}
