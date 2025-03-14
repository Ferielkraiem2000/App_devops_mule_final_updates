import { FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";
// import Logo from "./logo";
// import Image from "next/image";
// import FooterIllustration from "@/public/images/footer-illustration.svg";


const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-900 to-blue-500 text-white py-10 overflow-hidden">
      {/* Animated Gradient Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm animate-fadeIn"></div>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 z-10">
        {/* Contact Title */}
        <h3 className="text-3xl font-bold text-white drop-shadow-lg mb-6">Contact</h3>

        {/* Contact Links */}
        <ul className="space-y-4 text-lg">
          <li className="flex items-center space-x-3 transition-transform transform hover:scale-105">
            <FaGlobe className="text-teal-300 text-xl" />
            <a className="text-white hover:text-gray-300" href="https://www.cweave.fr/" target="_blank" rel="noopener noreferrer">
              www.cweave.fr
            </a>
          </li>
          <li className="flex items-center space-x-3 transition-transform transform hover:scale-105">
            <FaEnvelope className="text-teal-300 text-xl" />
            <a className="text-white hover:text-gray-300" href="mailto:contact@cweave.fr">
              contact@cweave.fr
            </a>
          </li>
          <li className="flex items-center space-x-3 transition-transform transform hover:scale-105">
            <FaLinkedin className="text-teal-300 text-xl" />
            <a className="text-white hover:text-gray-300" href="https://www.linkedin.com/company/comweave/" target="_blank" rel="noopener noreferrer">
              linkedin.com/company/comweave
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-sm text-gray-300 mt-8">&copy; 2025 Comweave • All Rights Reserved</p>
      </div>

      {/* Background Animation */}
      <div className="absolute -top-10 left-0 w-full h-40 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-moveWave"></div>
    </footer>
  );
};

export default Footer;
