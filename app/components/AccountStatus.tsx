"use client";

import { useEffect, useState } from "react";

export function AccountStatus({ warning = false }: { warning?: boolean }) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => { fetch("/api/account").then((response) => setSignedIn(response.ok)).catch(() => setSignedIn(false)); }, []);
  if (signedIn === null) return null;
  if (warning && !signedIn) return <aside className="browser-data-warning"><strong>Your progress is only in this browser.</strong><span>Clearing browser data, losing this device, or switching browsers can erase it.</span><a href="/account">Create an account or sign in</a></aside>;
  if (warning) return null;
  return <a className="account-nav" href="/account">{signedIn ? "My Account" : "Sign In"}</a>;
}
