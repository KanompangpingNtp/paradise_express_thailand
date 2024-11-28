// components/Footer.js
export default function Footer() {
  return (
    <footer
      className="w-auto h-auto p-20"
      style={{ backgroundImage: "url(/images/footer.jpg)" }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 border-2">
        {/* logo ด้านซ้าย */}
        <div>

        </div>
        {/* กลาง */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
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
        </div>

        {/* ด้านขวา */}
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Follow Us
          </h4>
          <div className="flex justify-center md:justify-start gap-4 mb-4">
            <a
              href="https://web.facebook.com/paradiseexpress56/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/facebook-qr-code.png"
                alt="Facebook QR Code"
                className="w-24"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/line-qr-code.png"
                alt="LINE QR Code"
                className="w-24"
              />
            </a>
          </div>
          <p className="text-gray-600 mb-2">@paradiseexpress</p>
          <p className="text-gray-400">© copy by GM Sky</p>
        </div>
      </div>
    </footer>
  );
}
