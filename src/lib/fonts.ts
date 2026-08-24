import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Source_Serif_4 } from "next/font/google";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-source-serif",
  axes: ["opsz"],
});

export const fontClassName = `${GeistSans.variable} ${GeistMono.variable} ${sourceSerif.variable}`;
