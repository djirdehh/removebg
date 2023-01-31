import { useState } from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import Head from "next/head";
import {
  Header,
  HeroHome,
  Features,
  DownloadPhoto,
  Footer,
} from "../components";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const uploader = Uploader({
  apiKey: process.env.UPLOAD_API_TOKEN ? process.env.UPLOAD_API_TOKEN : "free",
});

export default function Home() {
  const [photoName, setPhotoName] = useState(null);
  const [originalPhoto, setOriginalPhoto] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timeOfRequest, setTimeOfRequest] = useState(undefined);

  const handleSubmit = async (image) => {
    const start = Date.now();
    setTimeOfRequest(undefined);

    setLoading(true);

    const response = await fetch("/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });
    let result = await response.json();
    if (response.status !== 201) {
      setError(result.detail);
      setLoading(false);
      return;
    }
    setResult(result);

    while (result.status !== "succeeded" && result.status !== "failed") {
      await sleep(1000);
      const response = await fetch("/api/remove/" + result.id);
      result = await response.json();
      if (response.status !== 200) {
        setError(result.detail);
        setLoading(false);
        return;
      }

      setResult(result);
    }

    if (result.status === "failed") {
      setError(true);
    }

    if (result.status === "succeeded" || result.status === "failed") {
      setLoading(false);
    }

    const end = Date.now();
    setTimeOfRequest((end - start) / 1000);
  };

  const resetApp = () => {
    setPhotoName(null);
    setOriginalPhoto(null);
    setResult(null);
    setLoading(false);
    setError(null);
  };

  let content = (
    <>
      <Header resetApp={resetApp} />
      <main className="flex-grow">
        <HeroHome
          uploadButtonElement={(btnText) => {
            return (
              <UploadButton
                uploader={uploader}
                onComplete={(file) => {
                  if (file.length !== 0) {
                    setPhotoName(file[0].originalFile.originalFileName);
                    setOriginalPhoto(
                      file[0].fileUrl.replace("raw", "thumbnail")
                    );
                    handleSubmit(file[0].fileUrl.replace("raw", "thumbnail"));
                  }
                }}
                options={{
                  styles: { colors: { primary: "#A855F7" } },
                  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
                }}
              >
                {({ onClick }) => (
                  <button
                    onClick={onClick}
                    className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"
                  >
                    {btnText ? btnText : "Upload"}
                  </button>
                )}
              </UploadButton>
            );
          }}
          originalPhoto={originalPhoto}
          outputPhoto={result?.output ? result.output : null}
        />
        <Features />
      </main>
      <Footer />
    </>
  );

  if (error) {
    content = (
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header resetApp={resetApp} />
        <div className="flex flex-col justify-center min-h-screen overflow-hidden">
          <main className="justify-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-28 pb-12 md:pt-28 md:pb-20">
                <div className="max-w-3xl mx-auto text-center justify-self-center	pb-6 md:pb-6">
                  <h4 className="text-2xl md:text-3xl text-red-600 font-extrabold leading-tighter tracking-tighter mb-4">
                    Uh oh. Something went wrong :(
                  </h4>
                  <p className="text-md text-gray-600 mb-8">
                    Sorry! It looks like something went wrong. If this continues
                    to happen, feel free to message me @{" "}
                    <span className="font-bold">hassan.djirdeh@gmail.com</span>.
                  </p>
                  <button
                    onClick={resetApp}
                    className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"
                  >
                    Go back home
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || (originalPhoto && result?.output)) {
    content = (
      <>
        <Header resetApp={resetApp} />
        <DownloadPhoto
          originalPhoto={originalPhoto}
          outputPhoto={result?.output}
          photoName={photoName}
          loading={loading}
          timeOfRequest={timeOfRequest}
          uploadButtonElement={() => {
            return (
              <UploadButton
                uploader={uploader}
                onComplete={(file) => {
                  if (file.length !== 0) {
                    setPhotoName(file[0].originalFile.originalFileName);
                    setOriginalPhoto(
                      file[0].fileUrl.replace("raw", "thumbnail")
                    );
                    handleSubmit(file[0].fileUrl.replace("raw", "thumbnail"));
                  }
                }}
                options={{
                  styles: { colors: { primary: "#A855F7" } },
                  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
                }}
              >
                {({ onClick }) => (
                  <button
                    onClick={onClick}
                    className="transition duration-150 border-b-2 border-transparent hover:border-purple-600"
                  >
                    Try another photo
                  </button>
                )}
              </UploadButton>
            );
          }}
        />
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>RemoveBG | Remove Image Backgrounds For Free</title>

        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>

      <div className="flex flex-col min-h-screen overflow-hidden">
        {content}
      </div>
    </div>
  );
}
