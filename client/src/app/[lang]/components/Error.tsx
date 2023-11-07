import {Heading1, Heading2} from "@/utils/typography";

export default function Error() {
  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center mt-20">
        <div className="container relative pt-6 container-sm:pt-10 pb-16 container-lg:pt-20 container-lg:pb-28">
          <div className="p-5 mx-auto bg-white rounded-xl container-sm:rounded-3xl container-lg:rounded-[40px] shadow-lg container-sm:p-10 container-lg:p-16 ">
            <div className=" inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100 dark:bg-black dark:bg-opacity-20">
              <span className="sr-only hidden">bg</span>
            </div>
            <div className=" relative flex flex-col lg:flex-row items-center  ">
              <header className="text-center max-w-2xl mx-auto space-y-7">
                <Heading2 className="text-7xl md:text-8xl">👋</Heading2>
                <Heading1 className="text-8xl md:text-9xl font-semibold tracking-widest">
                  404
                </Heading1>
                <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                  THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.
                </span>
                <a
                  className="nc-Button flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-primary hover:bg-dark text-white text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 mt-4  "
                  href="/"
                >
                  Return Home
                </a>
              </header>
              {/* <div className="flex-grow">
                <img
                  src="https://ncmaz-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBecomeAnAuthorImg.fe618d37.png&w=1080&q=75"
                  alt="hero"
                  loading="lazy"
                  width="890"
                  height="694"
                  decoding="async"
                  data-nimg="1"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
