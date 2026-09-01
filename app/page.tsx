import type { Metadata } from "next";
import { HomePage } from "./components/HomePage";

export const metadata: Metadata = { title: "Personalized Self-Growth Toolkit", description: "Explore evidence-reviewed activities shaped by your goals, preferences, and feedback." };
export default function Home() { return <HomePage />; }
