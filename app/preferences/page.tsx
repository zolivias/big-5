import type { Metadata } from "next";
import { PreferencesClient } from "../components/PreferencesClient";

export const metadata: Metadata = { title: "Activity Preferences | Path Five", description: "Tell Path Five which activities are realistic and appealing to you." };

export default function PreferencesPage() { return <PreferencesClient />; }
