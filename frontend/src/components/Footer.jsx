
import { FaFacebook,  FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 py-4 px-3 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold mb-4">© {new Date().getFullYear()} TCC KASBA. All rights reserved.</p>
                <div className="flex justify-center space-x-6">
                    <a href="https://www.facebook.com/tcckasba/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <FaFacebook size={24} />
                    </a>
                  
                    <a href="https://www.instagram.com/tcc_kasba/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                        <FaInstagram size={24} />
                    </a>
                  
                </div>
                <p className="mt-4 text-sm">Designed & Developed by Ankit Jha</p>
            </div>
        </footer>
    );
};

export default Footer;
