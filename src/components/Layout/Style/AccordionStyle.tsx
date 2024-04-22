//styling
export const customTheme = {
  root: {
    base: "border-transparent",
    flush: {
      off: "",
      on: "",
    },
  },
  base: "border-transparent w-full",
  content: {
    base: "border-transparent",
  },
  flush: {
    off: "hover:border-transparent",
  },
  open: {
    off: "",
    on: "border-transparent",
  },
};

export const titleTheme = {
  arrow: {
    base: "h-6 w-6 shrink-0",
    open: {
      off: "",
      on: "rotate-180",
    },
  },
  base: "flex w-full items-center justify-between border-transparent text-left font-medium",
  flush: {
    off: "hover:bg-transparent",
    on: "bg-transparent dark:bg-transparent",
  },
  heading: "",
  open: {
    off: "",
    on: "",
  },
};

export const contentTheme = {
  base: "border-transparent px-2",
};

export const levelTheme =
  "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5 grid-flow-row lg:gap-5 py-3";
