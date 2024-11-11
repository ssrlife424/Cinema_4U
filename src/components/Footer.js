import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 text-center bg-neutral-600 bg-opacity-35 text-neutral-400 ">
      <div className="flex items-center justify-center gap-4">
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p>Created by Sanjay Rawat</p>
    </footer>
  );
};

export default Footer;
