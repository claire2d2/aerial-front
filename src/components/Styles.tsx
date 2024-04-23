export const toastTheme = {
  root: {
    base: "absolute top-4 right-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400",
    closed: "opacity-0 ease-out",
  },
  toggle: {
    base: "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
    icon: "h-5 w-5 shrink-0",
  },
};

// styling for accordions used throughout the site
export const panelTheme = {
  base: "bg-transparent w-full focus:ring-transparent",
};
export const customTheme = {
  root: {
    base: "bg-transparent border-transparent w-full focus:ring-transparent",
    button:
      "bg-transparent hover:bg-transparent border-0 p-2 w-full focus:ring-transparent",
  },
  flush: {
    off: "hover:bg-transparent focus:ring-0 focus:ring-transparent dark:hover:bg-transparent dark:focus:ring-transparent",
    on: "bg-transparent dark:bg-transparent",
  },
  base: "flex flex-col w-full items-center justify-between text-left font-medium border-transparent focus:ring-transparent focus:ring-0",
};

export const titleTheme = {
  arrow: {
    base: "h-6 w-6 shrink-0",
    open: {
      off: "",
      on: "rotate-180",
    },
  },
  flush: {
    off: "border-0 hover:bg-transparent  focus:ring-0 focus:ring-transparent dark:hover:bg-transparent dark:focus:ring-transparent",
    on: "border-0 bg-transparent dark:bg-transparent",
  },
  root: "border-0 focus:ring-transparent",
  base: "border-0 flex w-full items-center justify-between text-center focus:ring-transparent",
};
