import type { Metadata } from "next";
import { ToolkitClient } from "../components/ToolkitClient";
export const metadata: Metadata = { title: "Your Toolkit | Path Five", description: "Evidence-reviewed self-growth activities shaped around your preferences and feedback." };
export default function ToolkitPage() { return <ToolkitClient />; }
