import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

function Modal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white border-2 border-purple-500 text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-6 sm:p-4 sm:pb-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
                      <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={60}
                        height={60}
                        className="m-auto pb-2"
                      />
                      <Dialog.Title
                        as="h3"
                        className="text-base text-center font-semibold leading-6 text-gray-900"
                      >
                        removebg.dev
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-700">
                          removebg.dev (
                          <a
                            href="https://github.com/djirdehh/removebg"
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-600"
                          >
                            github
                          </a>
                          ) is an app designed to quickly and easily remove
                          image backgrounds for free. The app is built with the
                          help of:
                        </p>
                        <ul className="text-sm text-gray-700 mt-4">
                          <li>
                            -{" The "}
                            <a
                              href="https://github.com/danielgatis/rembg"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              rembg
                            </a>{" "}
                            ML model built by{" "}
                            <a
                              href="https://github.com/danielgatis"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Daniel Gatis
                            </a>
                            .
                          </li>
                          <li className="mt-1">
                            -{" "}
                            <a
                              href="https://replicate.com/"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Replicate
                            </a>{" "}
                            to interact with the ML model through an API.
                          </li>
                          <li className="mt-1">
                            -{" "}
                            <a
                              href="https://upload.io/"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Upload
                            </a>{" "}
                            to handle file uploads.
                          </li>
                          <li className="mt-1">
                            -{" "}
                            <a
                              href="https://tailwindcss.com/docs/"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Tailwind
                            </a>{" "}
                            for styling and mimics the{" "}
                            <a
                              href="https://github.com/cruip/tailwind-landing-page-template"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Cruip Simple Light
                            </a>{" "}
                            langing page template.
                          </li>
                          <li className="mt-1">
                            -{" "}
                            <a
                              href="https://nextjs.org/"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Next.js
                            </a>{" "}
                            for building the app and{" "}
                            <a
                              href="https://vercel.com/"
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600"
                            >
                              Vercel
                            </a>{" "}
                            for deployment.
                          </li>
                        </ul>
                        <p className="text-sm text-gray-700 mt-4">
                          The app is inspired by the{" "}
                          <a
                            href="https://restorephotos.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-600"
                          >
                            restorephotos.io
                          </a>{" "}
                          app built by{" "}
                          <a
                            href="https://twitter.com/nutlope"
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-600"
                          >
                            Hassan El Mghari
                          </a>
                          .
                        </p>
                        <p className="text-sm text-gray-700 mt-4">
                          Have any questions/thoughts? Feel free to tweet me @{" "}
                          <a
                            href="https://twitter.com/djirdehh"
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-600"
                          >
                            djirdehh
                          </a>{" "}
                          or email me @{" "}
                          <a
                            href="mailto:hassan.djirdeh@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-600"
                          >
                            hassan.djirdeh@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
