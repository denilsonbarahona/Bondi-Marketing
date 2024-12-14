"use client";

import { useRef, useCallback, FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import * as amplitude from "@amplitude/analytics-browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Wrapper } from "@/src/components";
import { setEmail } from "@/src/firebase/services";
import {
  initializeFirebaseClient,
  analytics,
  logEvent,
} from "@/src/firebase/client";

export default function HomeUI({
  firebaseConfig,
  amplitudeApiKey,
  authEmail,
  authPassword,
}: any) {
  const ref = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = useCallback(() => {
    ref.current?.showModal();
    handleTrackEvent("OPEN_MODAL", { BTN_NAME: "OPEN_MODAL" });
  }, [ref]);

  const handleSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      try {
        handleTrackEvent("SUBMIT_EMAIL", { BTN_NAME: "SUBMIT_EMAIL" });
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        await setEmail(email, authEmail, authPassword);
        if (emailRef.current) {
          emailRef.current.value = "";
        }
        ref.current?.close();
        toast.success(
          "Thank you for joining Bondi! We’ll notify you as soon as the platform is ready. Stay tuned for updates!",
          { position: "bottom-right" }
        );
      } catch (error) {
        console.log(error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        handleTrackEvent("ERROR_SUBMIT", { ERROR: errorMessage });
      } finally {
        setIsLoading(false);
      }
    },
    [emailRef, ref]
  );

  const handleTrackEvent = useCallback(
    (event: string, eventParams: Record<string, any>) => {
      if (analytics) {
        logEvent(analytics, event, eventParams);
      }

      amplitude.track(event, eventParams);
    },
    [analytics]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      amplitude.init(amplitudeApiKey, {
        autocapture: true,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeFirebaseClient(firebaseConfig);
    }
  }, []);

  useEffect(() => {
    handleTrackEvent("ENTER", { PAGE_LOAD: "ENTER PAGE" });
  }, [handleTrackEvent]);

  return (
    <div>
      <ToastContainer />
      <dialog ref={ref} className="bg-transparent">
        <div className="px-8 py-4 rounded-lg bg-modal max-w-[500px]">
          <div className="flex justify-end mb-10">
            <button
              onClick={() => ref.current?.close()}
              aria-label="close modal"
              className="font-dmSans"
            >
              <Image
                src="/cross-black.svg"
                alt="close icon"
                width={15}
                height={15}
                priority
              />
            </button>
          </div>
          <h2 className="font-poppins text-large text-left">
            Be the First to Access Bondi
          </h2>
          <h3 className="font-poppins text-2xl my-2">
            Register your email to get exclusive early access to Bondi. We'll
            notify you as soon as the platform is ready, so you can start
            buying, selling, or renting sustainable fashion.
          </h3>

          <form onSubmit={handleSubmitForm} className="grid mt-5 gap-4">
            <input
              className="rounded-lg p-2 border border-[#CCCCCC] text-base font-poppins"
              type="email"
              name="email"
              id="email"
              required
              ref={emailRef}
              placeholder="Email"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#CCEBD9] text-[#4F5E54] font-semibold rounded-[56px] py-4 mx-auto w-full md:w-[195px]"
            >
              {isLoading ? (
                <div className="grid place-content-center">
                  <div className="h-6 w-6 border-4 border-t-[#81be9b] border-r-transparent border-b-[#81be9b] border-l-transparent rounded-full animate-spin " />
                </div>
              ) : (
                "Get Early Access"
              )}
            </button>
          </form>
        </div>
      </dialog>
      <header className="bg-[#F9FDF4] py-[11px]">
        <Wrapper>
          <div className="flex items-center">
            <Image
              src="/Bondi.webp"
              alt="bondi logo"
              width={48}
              height={48}
              priority
            />
            <p className="font-inter text-2xl">Bondi</p>
          </div>
        </Wrapper>
      </header>
      <main>
        <section className="bg-[#c4d1c6] md:bg-hero bg-cover bg-no-repeat pt-[128px] md:pt-[149px] pb-[99px] md:pb-[206px]">
          <Wrapper>
            <div className="grid place-content-center">
              <h1 className="font-agbalumo text-[32px] md:text-[68px] text-center text-[#131417]">
                Extend the Life of Clothes
              </h1>
              <p className="text-center max-w-[619px] mx-auto font-dmSans text-[#565E58] font-medium text-[16px] md:text-[21px]">
                Bondi is a sustainable ecommerce platform focused on the
                circular economy. Our mission is to empower buyers, sellers, and
                renters to extend the life of clothes, reduce textile waste, and
                create a greener future.
              </p>
              <button
                onClick={handleOpenModal}
                className="bg-[#F9B28C] text-[#885540] rounded-[56px] py-4 mx-auto w-full md:w-[195px] relative mt-[49px]"
              >
                Register Now
              </button>
            </div>
          </Wrapper>
        </section>
        <section className="bg-[#F7EFE6]">
          <Wrapper>
            <div className="pt-[79px] md:py-[119px] pb-[40px] gap-14 flex flex-col justify-between md:flex-row items-center">
              <div className="md:max-w-[700px]">
                <h2 className="font-agbalumo text-[#1E2023] text-[32px]">
                  Discover the Benefits of Sustainable Selling, Buying, and
                  Renting
                </h2>
                <p className="font-dmSans text-[#76706D] mt-5">
                  As a sustainable ecommerce platform, Bondi empowers sellers,
                  buyers, and renters to make a positive impact. For sellers,
                  Bondi provides an easy way to extend the life of their
                  clothes, reach a global audience, and contribute to a more
                  sustainable future. For buyers and renters, Bondi offers
                  access to unique, affordable fashion while reducing textile
                  waste and supporting the circular economy.
                </p>
                <button
                  onClick={handleOpenModal}
                  className="bg-[#F9B28C] text-[#885540] rounded-[56px] py-4 mx-auto w-full md:w-[195px] relative mt-[20px]"
                >
                  Register Now
                </button>
              </div>
              <Image
                src="/women-1.webp"
                alt="women 1 logo"
                width={529}
                height={601}
                priority
              />
            </div>
          </Wrapper>
        </section>
        <section className="py-10 md:py-32">
          <Wrapper>
            <div>
              <h2 className="font-agbalumo text-[#1E2023] text-[32px] text-center">
                Empowering a Sustainable Lifestyle
              </h2>
              <div className="mt-10 flex flex-col md:flex-row flex-wrap gap-5">
                <div className="px-5 py-10 bg-[#CAE3CF] flex-1 md:min-w-[313px]">
                  <h3 className="font-dmSans font-semibold text-[32px] text-[#282B28]">
                    Extend the Life of Clothes
                  </h3>
                  <p className="text-[#505A53] font-dmSans">
                    Bondi's mission is to create a more sustainable future by
                    empowering sellers, buyers, and renters to extend the life
                    of clothes.
                  </p>
                </div>
                <div className="px-5 py-10 bg-[#F2E0C2] flex-1 md:min-w-[313px]">
                  <h3 className="font-dmSans font-semibold text-[32px] text-[#595047]">
                    Discover New Possibilities
                  </h3>
                  <p className="text-[#756859] font-dmSans">
                    Bondi connects people globally, enabling them to buy, sell,
                    or rent clothes while reducing textile waste and supporting
                    sustainability.
                  </p>
                </div>
                <div className="px-5 py-10 bg-[#F6D3C4] flex-1 md:min-w-[313px]">
                  <h3 className="font-dmSans font-semibold text-[32px] text-[#3F3130]">
                    Simplified Renting Experience
                  </h3>
                  <p className="text-[#80675E] font-dmSans">
                    With Bondi, renting clothes is effortless. Find or lend
                    unique items for special occasions, reducing waste and
                    saving resources.
                  </p>
                </div>
                <div className="px-5 py-10 bg-[#CBE3D0] flex-1 md:min-w-[313px]">
                  <h3 className="font-dmSans font-semibold text-[32px] text-[#2A342A]">
                    Discover Unique, Sustainable Fashion
                  </h3>
                  <p className="text-[#505952] font-dmSans">
                    Explore affordable, one-of-a-kind pieces from around the
                    world and contribute to a more sustainable future with every
                    purchase.
                  </p>
                </div>
              </div>
            </div>
          </Wrapper>
        </section>
        <section className="bg-[#F7F0E7] py-10">
          <Wrapper>
            <div className="flex flex-col md:flex-row justify-between items-center md:gap-5 py-10">
              <Image
                src="/women-2.webp"
                alt="women 2 logo"
                width={529}
                height={601}
                priority
              />
              <div className="max-w-[700px]">
                <h2 className="font-agbalumo text-[#312E2E] text-[32px]">
                  Sustainable Selling
                </h2>
                <p className="text-[#807973] font-dmSans mt-5">
                  At Bondi, we believe that sustainable fashion is the key to a
                  better future. By empowering sellers and buyers to extend the
                  life of clothes, we are creating a circular economy that
                  reduces textile waste and promotes a more sustainable
                  lifestyle. Join us on this journey and be a part of the
                  solution
                </p>
                <button
                  onClick={handleOpenModal}
                  className="bg-[#F9B28C] text-[#885540] rounded-[56px] py-4 mx-auto w-full md:w-[195px] relative mt-[20px] md:mt-[58px]"
                >
                  Register Now
                </button>
              </div>
            </div>
          </Wrapper>
        </section>
        <section>
          <Wrapper>
            <div className="pt-[79px] md:py-[119px] pb-[40px] gap-14 flex flex-col justify-between md:flex-row items-center">
              <div className="md:max-w-[700px]">
                <h2 className="font-agbalumo text-[#1E2023] text-[32px]">
                  Discover the Power of Sustainable Selling
                </h2>
                <p className="font-dmSans text-[#76706D] mt-5">
                  Bondi's sustainable ecommerce platform offers a range of
                  benefits for sellers, including increased visibility, access
                  to a wider audience, and the opportunity to contribute to a
                  more sustainable future
                </p>
                <button
                  onClick={handleOpenModal}
                  className="bg-[#F9B28C] text-[#885540] rounded-[56px] py-4 mx-auto w-full md:w-[195px] relative mt-[20px]"
                >
                  Register Now
                </button>
              </div>
              <div className="hidden md:inline-block relative">
                <Image
                  src="/women-3.webp"
                  alt="women 3 logo"
                  width={529}
                  height={601}
                  priority
                />
                <div className="md:w-[50px] md:h-[50px] lg:w-[80px] lg:h-[80px] xl:w-[119px] xl:h-[119px] bg-[#F58E65] rounded-full absolute bottom-0 right-0 translate-y-1/2" />
              </div>
            </div>
          </Wrapper>
        </section>
        <section className="py-[84px] md:py-[122px]">
          <Wrapper>
            <div>
              <div className="md:max-w-[826px] mx-auto">
                <h2 className="text-center font-agbalumo text-[40px] text-[#272427]">
                  Buying with Purpose
                </h2>
                <p className="text-[#A7A5A7] mt-[14px] text-center">
                  As a buyer on Bondi, you can discover unique, high-quality
                  items while supporting a circular economy. Our platform
                  connects you with sustainable sellers, allowing you to make a
                  positive impact on the environment and your wardrobe
                </p>
              </div>
              <div className="mt-10 md:mt-[66px] grid grid-cols-3 gap-10 place-items-center">
                <Image
                  src="/icon-1.webp"
                  alt="decorator 1"
                  width={122}
                  height={122}
                  priority
                />
                <Image
                  src="/icon-2.webp"
                  alt="decorator 2 logo"
                  width={122}
                  height={122}
                  priority
                />
                <Image
                  src="/icon-3.webp"
                  alt="decorator 3 logo"
                  width={122}
                  height={122}
                  priority
                />
              </div>
              <div className="mt-10 flex flex-col md:flex-row flex-wrap gap-10 md:justify-between md:items-center">
                <div className="p-4 border flex flex-col justify-between border-[#747278] h-[689px] rounded-md flex-1">
                  <div>
                    <Image
                      src="/person-1.webp"
                      alt="person decorator 1"
                      width={373}
                      height={455}
                      priority
                    />
                    <h4 className="text-[#5E5B5C] font-dmSans font-semibold text-2xl mt-4">
                      Sustainable Fashion for All
                    </h4>
                    <h5 className="text-[#F7B18A] font-dmSans text-base">
                      Empowering Change
                    </h5>
                    <p className="text-[#8B898B] mt-4 font-dmSans">
                      Discover how Bondi connects buyers, sellers, and renters
                      to promote sustainable fashion and a circular economy.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenModal}
                    className="text-[#747278] font-dmSans place-self-start"
                  >
                    Join the Movement
                  </button>
                </div>
                <div className="p-4 border flex flex-col justify-between border-[#747278] h-[689px] rounded-md flex-1">
                  <div>
                    <Image
                      src="/person-3.webp"
                      alt="person decorator 3"
                      width={373}
                      height={455}
                      priority
                    />
                    <h4 className="text-[#5E5B5C] font-dmSans font-semibold text-2xl mt-4">
                      Sustainable Living
                    </h4>
                    <h5 className="text-[#F7B18A] font-dmSans text-base">
                      Discover Unique Finds
                    </h5>
                    <p className="text-[#8B898B] mt-4 font-dmSans">
                      Shop, sell, or rent unique, high-quality items while
                      contributing to a greener future.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenModal}
                    className="text-[#747278] font-dmSans place-self-start"
                  >
                    Join the Movement
                  </button>
                </div>
              </div>
            </div>
          </Wrapper>
        </section>
      </main>
      <footer className="bg-[#EED8C4] py-10">
        <Wrapper>
          <div>
            <div className="flex items-center">
              <Image
                src="/Bondi.webp"
                alt="bondi logo"
                width={48}
                height={48}
                priority
              />
              <p className="font-inter text-2xl">Bondi</p>
            </div>
            <p className="font-dmSans">
              © 2024 Bondi, Inc. All rights reserved.
            </p>
          </div>
        </Wrapper>
      </footer>
    </div>
  );
}
