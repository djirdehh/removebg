import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "./Modal";

function Header({ resetApp }) {
  const [top, setTop] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <div>
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top && "bg-white backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0 cursor-pointer" onClick={resetApp}>
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            </div>

            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <button
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                    onClick={() => setModalOpen(true)}
                  >
                    {"What's this?"}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Modal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
}

export default Header;
