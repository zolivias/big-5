"use client";

import { useEffect, useState } from "react";
import { CLOUD_SYNC_KEY, loadProfile, saveProfile } from "../../lib/storage";
import type { LocalProfile } from "../../lib/types";

type AccountState = { signedIn: boolean; email?: string; profile?: LocalProfile | null };

export function AccountClient() {
  const [account, setAccount] = useState<AccountState | null>(null);
  const [notice, setNotice] = useState("");
  useEffect(() => { fetch("/api/account").then(async (response) => setAccount(response.ok ? await response.json() : { signedIn: false })).catch(() => setAccount({ signedIn: false })); }, []);
  if (!account) return <div className="loading-state">Checking your account…</div>;
  if (!account.signedIn) return <section className="account-card"><p className="eyebrow">Optional account</p><h1>Protect your progress.</h1><div className="browser-risk"><strong>Without an account, your data exists only in this browser.</strong><p>It may be lost if browser data is cleared, the device is lost or reset, or you use another browser or device.</p></div><a className="button" href="/signin-with-chatgpt?return_to=%2Faccount">Register or sign in with ChatGPT →</a><p className="account-fineprint">You can continue using Path Five without an account.</p></section>;
  const activeAccount = account;
  async function backUp() {
    localStorage.setItem(CLOUD_SYNC_KEY, "1");
    const response = await fetch("/api/account", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profile: loadProfile() }) });
    setNotice(response.ok ? "This device is backed up. Future changes will sync automatically." : "We could not save right now. Please try again.");
  }
  function restore() {
    if (!activeAccount.profile) return;
    localStorage.setItem(CLOUD_SYNC_KEY, "1"); saveProfile(activeAccount.profile); setNotice("Cloud progress restored. Opening your toolkit…"); setTimeout(() => { window.location.href = "/toolkit"; }, 600);
  }
  async function deleteCloudBackup() {
    if (!window.confirm("Delete your Path Five cloud backup? Your progress in this browser will stay here.")) return;
    const response = await fetch("/api/account", { method: "DELETE" });
    if (response.ok) {
      localStorage.removeItem(CLOUD_SYNC_KEY);
      setAccount({ ...activeAccount, profile: null });
      setNotice("Cloud backup deleted. Your progress is still stored in this browser.");
    } else {
      setNotice("We could not delete the cloud backup right now. Please try again.");
    }
  }
  return <section className="account-card"><p className="eyebrow">My Account</p><h1>Your progress, protected.</h1><p>Signed in as <strong>{activeAccount.email}</strong></p><div className="account-actions"><button className="button" onClick={backUp}>Back up this device</button>{activeAccount.profile && <button className="ghost-button" onClick={restore}>Restore cloud progress</button>}{activeAccount.profile && <button className="danger-button" onClick={deleteCloudBackup}>Delete cloud backup</button>}</div><p aria-live="polite">{notice || (activeAccount.profile ? "A cloud backup is available for this account." : "No cloud backup yet. Back up this device to create one.")}</p><a className="text-link" href="/signout-with-chatgpt?return_to=%2F">Sign out</a></section>;
}
