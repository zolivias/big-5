import type { Metadata } from "next";
import { HomePage } from "./components/HomePage";

export const metadata: Metadata = { title: "Path Five — Five traits. Your path forward.", description: "Explore your Big Five personality traits and get practical, personalized self-growth ideas." };
export default function Home() { return <HomePage />; }
