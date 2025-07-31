import * as React from "react";

const GoogleButton = () => (
    <div className="w-full flex justify-center">
        <div className="h-[46px] cursor-pointer border bolder-blue-100 flex items-center gap-2 px-3 rounded-sm my-2 bg-[rgba(210, 227, 252, 0.3)]">
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 7v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S5.61 3.58 8 3.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C11.47 1.69 9.89 1 8 1 4.13 1 1 4.13 1 8s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H8z"
      fill="#000000"
    />
  </svg>
  <span className="text-[16px] opacity-[0.8] font-poppins">Sign-in with Google</span>
        </div>
    </div>
);
export default GoogleButton;
