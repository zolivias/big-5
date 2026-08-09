import type { Metadata } from "next";
import { AssessmentClient } from "../components/AssessmentClient";
export const metadata: Metadata = { title: "Assessment | Path Five", description: "Take the 50-item IPIP Big Five assessment." };
export default function AssessmentPage() { return <AssessmentClient />; }
