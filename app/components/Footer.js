import React from "react";

function Footer() {
  return (
    <div>
      <div
        className=" w-auto h-[100vh] "
        style={{ backgroundImage: "url(/images/yuk.jpg)" }}
      ></div>
      <div
        className=" w-auto h-auto "
        style={{ backgroundImage: "url(/images/footer.jpg)" }}
      >
          <div className="container mx-auto px-8 py-10">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              {/* โลโก้ */}
              <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
                <img
                  src="/images/footerlogo.png"
                  alt="Logo"
                  className="w-80 mx-auto md:mx-0"
                />
              </div>

              {/* ข้อความ */}
              <div className="w-full md:w-1/3 text-start">
                <p className="text-gray-700">
                  Paradise Express
                </p>
                <p className="text-gray-600">
                  41/147 Moo 6, Sainoi Sub-district, <br/>
                  Sainoi District, Nonthaburi province <br/>
                  1150 THAILAND
                </p>
                <p className="text-gray-600">Contact Us</p>
              </div>

              {/* QR Code */}
              <div className="w-full md:w-1/3 text-center md:text-right">
                <img
                  src="/path-to-your-qr-code.png"
                  alt="QR Code"
                  className="w-32 h-32 mx-auto md:mx-0"
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Footer;
