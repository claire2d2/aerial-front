import React from "react";
import { useNavigate } from "react-router-dom";

type FeatureButtonProps = {
  title: string;
  children: React.ReactNode;
  link: string;
};

const FeatureButton: React.FC<FeatureButtonProps> = ({
  title,
  children,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(link)}
      className="group hover:basis-3/4 basis-1/3 bg-white my-1 ml-1 transition-all"
    >
      <div className="text-xl">{title}</div>
      <div className="lg:hidden lg:group-hover:block">{children}</div>
    </button>
  );
};

export default FeatureButton;
