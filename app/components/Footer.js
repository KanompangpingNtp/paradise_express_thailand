import Image from "next/image";

export default function Footer() {
  return (
    <footer className="">
      {/* Background Image Section */}
      <div className="w-full h-auto">
        <Image
          src="/images/yuk.jpg"
          alt="Background Image"
          layout="responsive" // ให้ภาพปรับตามคอนเทนเนอร์
          width={1920} // ความกว้างดั้งเดิมของภาพ
          height={1080} // ความสูงดั้งเดิมของภาพ
          className="object-cover "
        />
      </div>

      {/* Footer Section */}
      <div
        id="footer"
        className="w-auto h-auto p-10"
        style={{ backgroundImage: "url(/images/footer.jpg)" }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-center items-center">
            <Image
              src="/images/logo_edited.avif"
              alt="Logo"
              width={150} // ปรับขนาดภาพตามความต้องการ
              height={150}
              className="sm:w-[7rem] md:w-[17rem] h-auto"
            />
          </div>

          {/* Contact Section */}
          <div className="sm:py-2 md:py-5">
            <h3 className="sm:text-md sm:text-center md:text-left md:text-lg lg:text-2xl font-semibold text-gray-800 md:mb-2 lg:mb-4 ">
              Paradise Express
            </h3>
            <p className="sm:text-md sm:text-center md:text-left md:text-sm lg:text-lg text-gray-600 md:mb-2 lg:mb-4">
              41/147 Moo 6, Sainoi Sub-district,
              <br />
              Sainoi District, Nonthaburi province
              <br />
              11150 THAILAND
            </p>
            <h4 className="sm:text-md sm:text-center md:text-left text-lg lg:text-2xl font-semibold text-gray-800 md:mb-1 lg:mb-2">
              Contact Us
            </h4>
            <p className="sm:text-md sm:text-center md:text-left md:text-sm lg:text-lg text-gray-600">
              <strong>Telephone:</strong> 098-459-6582 (Within Thailand)
              <br />
              <strong>Oversea Call:</strong> +66 98-459-6582
              <br />
              <strong>WhatsApp:</strong> 098-459-6582
            </p>
            <h4 className="sm:text-md sm:text-center md:text-left md:text-lg lg:text-2xl font-semibold text-gray-800 sm:mt-3 md:mt-8">
              About Us
            </h4>
          </div>

          {/* QR and Social Media Section */}
          <div className="flex flex-col items-center text-center md:text-left">
            <div className="flex sm:flex-row md:flex-col items-center justify-center gap-4 mb-4">
              <Image
                src="/images/QR_Fb-removebg-preview.png"
                alt="Facebook QR Code"
                width={100} // ปรับความกว้างของ QR
                height={100}
                className="sm:w-[8rem] md:w-[7rem] lg:w-[10rem]"
              />
              <p className=" text-gray-600 md:text-xs text-sm mb-2 hidden md:block">
                FB : <span className="hidden lg:block"> https://web.facebook.com/</span>paradiseexpress56/
              </p>
              <Image
                src="/images/46.jpg"
                alt="LINE QR Code"
                width={70} // ปรับขนาด QR Code
                height={70}
                className="sm:w-[6rem] md:w-[7rem] lg:w-[7rem]"
              />
            </div>
            <p className="hidden md:block text-gray-600 md:text-xs text-sm mb-2">@paradiseexpress</p>
            <p className=" text-gray-400 text-xs text-right ml-auto">© copy by GM Sky</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
