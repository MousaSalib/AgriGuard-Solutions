import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-customBrown text-white w-full py-2">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row md:items-center">
          <span className="text-lg font-bold mb-4 md:mb-0">
            © 2024{" "}
            <Link href="/" className="hover:underline text-yellow-400">
              AgriGuard Solutions™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link
            href="https://www.facebook.com"
            aria-label="Facebook"
            className="hover:text-yellow-400"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            href="https://www.twitter.com"
            aria-label="Twitter"
            className="hover:text-yellow-400"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="https://www.instagram.com"
            aria-label="Instagram"
            className="hover:text-yellow-400"
          >
            <FaInstagram size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
