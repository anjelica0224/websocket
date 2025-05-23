import { useRef, useState } from "react";

export default function Input ({ maxRows = 5, ...props }) {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    setValue(e.target.value);

    textarea.style.height = "auto"; 
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
    const rows = Math.floor(textarea.scrollHeight / lineHeight);

    if (rows <= maxRows) {
      textarea.style.overflowY = "hidden";
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.overflowY = "auto";
      textarea.style.height = `${lineHeight * maxRows}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      className="text-sm md:text-lg text-[whitesmoke]/50 grow outline-none self-center ml-2"
      style={{ lineHeight: "1.5rem", maxHeight: `${1.5 * maxRows}rem` }} // 1.5rem is approx 24px
      placeholder="Type something..."
      {...props}
    />
  );
};

