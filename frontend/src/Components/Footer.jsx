import React from "react";
import { Instagram, Facebook, Twitter, Youtube, Globe } from "lucide-react";

const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    handle: "@strikers_pariyapuram",
    icon: <Instagram className="w-8 h-8" />,
    url: "https://www.instagram.com/strikers_pariyapuram",
  },
  {
    id: 2,
    name: "Facebook",
    handle: "@Strikers-Club",
    icon: <Facebook className="w-8 h-8" />,
    url: "https://facebook.com/strikers_pariyapuram",
  },
  {
    id: 4,
    name: "Youtube",
    handle: "@strikerspariyapuram",
    icon: <Youtube className="w-8 h-8" />,
    url: "https://www.youtube.com/@STRIKERSPARIYAPURAM",
  },
  {
    id: 5,
    name: "Instagram",
    handle: "@storiesofmillumpadiiii",
    icon: <Instagram className="w-8 h-8" />, // Using Globe as placeholder since Lucide doesn't have TikTok
    url: "https://www.instagram.com/storiesofmillumpadiiii",
  },
];

const footerLinks = [
  { id: 1, name: "Contact Us", url: "#" },
  { id: 2, name: "Terms of Service", url: "#" },
  { id: 3, name: "Privacy policy", url: "#" },
  { id: 4, name: "About Us", url: "#" },
  { id: 5, name: "FAQ", url: "#" },
  { id: 6, name: "Support", url: "#" },
  { id: 7, name: "Betting", url: "#" },
];

const Footer = () => {
  return (
    <footer className='bg-[#1a1a1a] text-white z-50 relative'>
      {/* Social Media Section */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <h2 className='text-2xl font-bold mb-8 text-textColor'>
          Follow strikers club pariyapuram
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#2a2a2a] p-6 rounded-lg hover:bg-[#3a3a3a] transition-colors'
            >
              <div className='flex flex-col items-center text-center'>
                {social.icon}
                <span className='mt-2 text-base text-gray-400'>
                  {social.name}
                </span>
                <span className='mt-1 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis'>
                  {social.handle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='bg-black'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          {/* Logo */}
          <div className='flex justify-center mb-8'>
            <img
              src='../src/assets/LogoText.png'
              alt='psl.com'
              className='h-8'
            />
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-wrap justify-center gap-4 mb-6'>
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className='text-sm hover:text-gray-300 transition-colors'
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Country Selector */}
          <div className='flex justify-center items-center gap-2 mb-6'>
            <img
              src='https://flagcdn.com/w20/in.png'
              alt='India flag'
              className='w-5'
            />
            <span className='text-sm'>India</span>
          </div>

          {/* Copyright */}
          <div className='text-center text-sm text-gray-400'>
            <p>
              Copyright © {new Date().getFullYear()} PSL All rights reserved.
            </p>
            <p className='mt-2'>
              The information contained in this website may not be published,
              broadcast, rewritten, or redistributed without the prior written
              authority of Strikers Club
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
