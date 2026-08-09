import type { Metadata } from "next";
import { ToolkitClient } from "../components/ToolkitClient";
export const metadata: Metadata = { title: "Your toolkit | Path Five", description: "Small self-growth experiments shaped around your personality patterns." };
export default function ToolkitPage() { return <ToolkitClient />; }
