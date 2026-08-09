"use client";
import { useState } from "react";
import { clearProfile, loadProfile } from "../../lib/storage";

export function PrivacyControls() {
  const [message, setMessage] = useState("");
  function download() { const data = JSON.stringify(loadProfile(), null, 2); const url = URL.createObjectURL(new Blob([data], { type: "application/json" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "path-five-data.json"; anchor.click(); URL.revokeObjectURL(url); setMessage("A copy of your data was downloaded."); }
  function erase() { clearProfile(); setMessage("Your Path Five data has been removed from this browser."); }
  return <div className="privacy-controls"><button className="ghost-button" onClick={download}>Download my data</button><button className="danger-button" onClick={erase}>Delete my local data</button><p aria-live="polite">{message}</p></div>;
}
