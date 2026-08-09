import type { Metadata } from "next";
import { ResultsClient } from "../components/ResultsClient";
export const metadata: Metadata = { title: "Your Results | Path Five", description: "Explore your five trait spectrums." };
export default function ResultsPage() { return <ResultsClient />; }
