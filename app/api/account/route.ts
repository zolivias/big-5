import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { userProfiles } from "../../../db/schema";

function identity(request: Request) {
  const userId = request.headers.get("oai-authenticated-user-id");
  const email = request.headers.get("oai-authenticated-user-email");
  return userId && email ? { userId, email } : null;
}

export async function GET(request: Request) {
  const user = identity(request);
  if (!user) return Response.json({ signedIn: false }, { status: 401 });
  const [row] = await getDb().select().from(userProfiles).where(eq(userProfiles.userId, user.userId)).limit(1);
  return Response.json({ signedIn: true, email: user.email, profile: row ? JSON.parse(row.profileJson) : null, updatedAt: row?.updatedAt || null });
}

export async function PUT(request: Request) {
  const user = identity(request);
  if (!user) return Response.json({ error: "sign_in_required" }, { status: 401 });
  const body = await request.json();
  if (body?.profile?.version !== 1) return Response.json({ error: "invalid_profile" }, { status: 400 });
  const profileJson = JSON.stringify(body.profile);
  if (profileJson.length > 750_000) return Response.json({ error: "profile_too_large" }, { status: 413 });
  const updatedAt = Date.now();
  await getDb().insert(userProfiles).values({ userId: user.userId, email: user.email, profileJson, updatedAt }).onConflictDoUpdate({ target: userProfiles.userId, set: { email: user.email, profileJson, updatedAt } });
  return Response.json({ saved: true, updatedAt });
}

export async function DELETE(request: Request) {
  const user = identity(request);
  if (!user) return Response.json({ error: "sign_in_required" }, { status: 401 });
  await getDb().delete(userProfiles).where(eq(userProfiles.userId, user.userId));
  return Response.json({ deleted: true });
}
