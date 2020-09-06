import React from "react";

export default function Banner({ children, title, subtitle }) {
  return (
    <div className="banner">
      <h1>
        {title} <br />
        {subtitle}
      </h1>
      <div></div>
      {children}
    </div>
  );
}
