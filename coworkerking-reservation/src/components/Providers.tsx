"use client";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16" // Add margin top to avoid navbar overlay
      />
    </>
  );
}