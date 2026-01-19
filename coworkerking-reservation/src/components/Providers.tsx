"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import 'dayjs/locale/fr';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      {children}
      <ToastContainer position="top-right" autoClose={6000} />
    </LocalizationProvider>
  );
}