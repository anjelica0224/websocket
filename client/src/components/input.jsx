import { useRef, useState } from "react";

export default function Input ({ maxRows = 5, ...props }) {
  return (
    <textarea
      rows={1}
      className="text-sm block p-2.5 w-full md:text-lg leading-[1.2] text-[whitesmoke]/50 grow outline-none self-center ml-2 resize-none"
      placeholder="Type something..."
      {...props}
    />
  );
};

