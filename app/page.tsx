import type { Metadata } from "next";
import { HomePage } from "./components/HomePage";

export const metadata: Metadata = { title: "Personalized Self-Growth Toolkit", description: "Explore practical activities shaped by your goals, preferences, and personality." };
export default function Home() { return <HomePage />; }
