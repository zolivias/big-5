import type { Metadata } from "next";
import { AccountClient } from "../components/AccountClient";
import { PageShell } from "../components/Shell";

export const metadata: Metadata = { title: "My Account", description: "Protect and restore your Path Five progress." };
export const dynamic = "force-dynamic";
export default function AccountPage() { return <PageShell><AccountClient /></PageShell>; }
