const WebsiteIntro = () => {
  return (
    <div className="bg-main dark:bg-maindark text-white flex flex-col lg:flex-row gap-2 lg:py-10 px-5">
      <div className="lg-full w-full lg:w-1/2 text-center py-4 relative flex flex-col gap-4">
        <h2 className="font-extrabold text-4xl">About us</h2>
        <div className="Descr flex flex-col gap-3">
          <p>
            Air2d2 is a website made by an aerial lover for all the aerial
            lovers out there.
          </p>
          <p>
            The website is designed to accompany you in your aerial journey, by
            allowing you to keep track of your progress.
          </p>
          <p>
            It is also community-based, so inputs from yourself or other users
            are more than welcome, they are highly encouraged!
          </p>
        </div>
        <h3 className="font-bold">Mobile friendly!</h3>
        <div>
          Take Air2d2 with you during your practices, the website is mobile
          responsive.
        </div>
      </div>

      <div className="hidden lg:block w-full lg:w-1/2 relative">
        <div className="absolute right-10 top-20">
          <div className="relative mx-auto border-bgmainlight dark:border-darkgray dark:bg-darkgray bg-bgmainlight border-[6px] rounded-t-xl h-[129px] max-w-[226px] md:h-[220px] md:max-w-[384px]">
            <div className="rounded-lg overflow-hidden h-[117px] md:h-[208px] bg-white dark:border-darkgray dark:bg-darkgray">
              <img
                src="pcscreenshot.png"
                className="dark:hidden h-[117px] md:h-[208px] w-full rounded-xl"
                alt=""
              />
              <img
                src="pcscreenshotdark.png"
                className="hidden dark:block h-[117px] md:h-[208px] w-full rounded-lg"
                alt=""
              />
            </div>
          </div>
          <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[13px] max-w-[263px] md:h-[16px] md:max-w-[448px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[42px] h-[4px] md:w-[72px] md:h-[6px] bg-bgmainlight dark:bg-darkgray"></div>
          </div>
        </div>
        <div className="absolute top-0 left-20 z-9">
          <div className="relative mx-auto border-bgmainlight dark:border-darkgray bg-darkgray border-[11px] rounded-[1.875rem] h-[225px] w-[150px]">
            <div className="rounded-[0.75rem] overflow-hidden w-[129px] h-[205px] bg-white dark:bg-darkgray">
              <img
                src="mobilescreenshot.png"
                className="dark:hidden w-[129px] h-[205px]"
                alt=""
              />
              <img
                src="mobilescreenshotdark.png"
                className="hidden dark:block w-[129px] h-[205px]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteIntro;
