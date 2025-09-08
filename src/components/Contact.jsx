import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaViber,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";

const Contact = () => {
  return (
    <section id="contact" className="py-5 px-4 border-t-1 border-[#555]">
      <div className="mx-auto container">
        <h2 className="text-3xl font-bold text-center text-neutral-300 mb-3">
          Get in <span className="text-outline">Touch</span>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-5">
          I'm open to new opportunities and collaborations. Feel free to reach
          out to me via the contact form below or through my social media
          channels.
        </p>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 border border-white/20">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-3 bg-white/10 text-red-400 backdrop-blur-lg rounded-full mr-4 border border-white/20">
                  <FaLocationArrow />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className=" text-neutral-400">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-white/10 text-white backdrop-blur-lg rounded-full mr-4 border border-white/20">
                  <MdEmail />
                </div>
                <div>
                  <h4 className="font-semibold text-white">E-mail</h4>
                  <p className=" text-neutral-400">
                    dharmendraram7852@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-white/10 text-red-400 backdrop-blur-lg rounded-full mr-4 border border-white/20">
                  <PiPhone />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className=" text-neutral-400">
                    +977-9819745073, +977-9764632928
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className=" font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4 text-white/60">
                <a
                  href=""
                  className="p-2 border border-[#0A63BC] text-[#298bec]  backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
                >
                  {" "}
                  <FaFacebook />
                </a>
                <a
                  href=""
                  className="p-2 border border-gray-600 text-[#298bec]  backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
                >
                  {" "}
                  <FaGithub />
                </a>

                <a
                  href=""
                  className="p-2 border border-[#E1306C] text-[#E1306C] backdrop-blur-md rounded-full hover:bg-[#E1306C] transition-colors cursor-pointer hover:text-white"
                >
                  <FaInstagram />
                </a>

                <a
                  href=""
                  className="p-2 border border-[#0A63BC] text-[#298bec] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
                >
                  {" "}
                  <FaLinkedin />
                </a>

                <a
                  href=""
                  className="p-2 border border-[#46C254] text-[#46C254] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
                >
                  {" "}
                  <BsWhatsapp />
                </a>

                <a
                  href=""
                  className="p-2 border border-[#7360F2] text-[#7360F2] backdrop-blur-md rounded-full hover:bg-[#7360F2] transition-colors cursor-pointer hover:text-white"
                >
                  <FaViber />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Send me a message
            </h3>
            <form action="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Your Name"
                  className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-700 transition md:w-[50%]"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-700 transition md:w-[50%]"
                />
              </div>

              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Your Subject"
                className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-700 transition"
              />
              <textarea
                rows="5"
                id="message"
                name="message"
                placeholder="Your Message"
                className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-700 transition"
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-full bg-teal-600 text-white text-sm cursor-pointer border border-teal-600 hover:bg-teal-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
