export const dropDownTheme = {
  floating: {
    animation: "transition-opacity",
    base: "z-11 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
    divider: "my-1 h-px dark:bg-bgmaindark",
    header: "block px-4 py-2 text-sm text-text dark:text-white",
    hidden: "invisible opacity-0",
    style: {
      auto: " bg-white text-text dark:border-textdark dark:bg-bgmaindark dark:text-textdark active:text-white z-10",
    },
    target: "w-fit border-none",
  },
  inlineWrapper: "flex items-center",
};

export const avatarTheme = {
  root: {
    base: "flex items-center justify-center space-x-4 rounded z-11",
    bordered: "p-1 ring-2",
    rounded: "rounded-full",
    color: {
      dark: "ring-white",
    },
    img: {
      base: "rounded",
      off: "relative overflow-hidden bg-white",
      on: "",
      placeholder: "absolute -bottom-1 h-auto w-auto bg-white text-text",
    },
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-20 w-20",
      xl: "h-36 w-36",
    },
    stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
    statusPosition: {
      "bottom-left": "-bottom-1 -left-1",
      "bottom-center": "-bottom-1",
      "bottom-right": "-bottom-1 -right-1",
      "top-left": "-left-1 -top-1",
      "top-center": "-top-1",
      "top-right": "-right-1 -top-1",
      "center-right": "-right-1",
      center: "",
      "center-left": "-left-1",
    },
    status: {
      away: "bg-yellow-400",
      base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
      busy: "bg-red-400",
      offline: "bg-gray-400",
      online: "bg-green-400",
    },
    initials: {
      text: "font-medium text-text",
      base: "relative inline-flex items-center justify-center overflow-hidden bg-white",
    },
  },
};
