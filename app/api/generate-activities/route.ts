const allowedGoals = new Set(["studying", "relationships", "stress", "confidence", "reflection"]);
const blocked = /diagnos|disorder|therapy|treatment|medicat|self-harm|suicid|trauma|panic attack/i;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) return Response.json({ error: "generation_unavailable" }, { status: 503 });
  try {
    const body = await request.json();
    if (!allowedGoals.has(body.goal) || !body.feedback || !Array.isArray(body.existingTitles)) return Response.json({ error: "invalid_request" }, { status: 400 });
    const context = {
      goal: body.goal,
      activityPreferences: body.preferences || null,
      personalityBands: Array.isArray(body.scores) ? body.scores.map((score: { label?: string; band?: string }) => ({ trait: String(score.label || "").slice(0, 30), band: String(score.band || "").slice(0, 10) })) : [],
      completedActivity: String(body.completedTitle || "").slice(0, 100),
      feedback: body.feedback,
      activitiesAlreadySeen: body.existingTitles.slice(0, 30).map((title: unknown) => String(title).slice(0, 100)),
    };
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        store: false,
        max_output_tokens: 1200,
        instructions: "Create exactly 3 practical, age-appropriate self-growth activities for ages 13-24. They are educational, not mental-health treatment. Never diagnose, mention disorders, recommend therapy techniques, exposure, medication, supplements, dieting, punishment, risky physical activity, secrecy, or contacting strangers. Do not ask for sensitive journaling. Each activity must be concrete, low-risk, possible without professional supervision, and meaningfully different from titles already seen. Adapt strongly to the completion feedback, especially whether the user wants similar, easier, same-level, or harder activities. Use plain, non-AI-sounding language.",
        input: JSON.stringify(context),
        text: { format: {
          type: "json_schema",
          name: "path_five_activities",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: { activities: {
              type: "array",
              minItems: 3,
              maxItems: 3,
              items: {
                type: "object",
                additionalProperties: false,
                properties: { title: { type: "string" }, description: { type: "string" }, action: { type: "string" }, duration: { type: "string" }, feedbackReason: { type: "string" } },
                required: ["title", "description", "action", "duration", "feedbackReason"],
              },
            } },
            required: ["activities"],
          },
        } },
      }),
    });
    if (!response.ok) return Response.json({ error: "generation_unavailable" }, { status: 502 });
    const result = await response.json();
    const text = result.output?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || []).find((item: { type?: string }) => item.type === "output_text")?.text;
    const parsed = JSON.parse(text || "{}");
    const activities = Array.isArray(parsed.activities) ? parsed.activities.filter((item: Record<string,string>) => item.title && item.description && item.action && !blocked.test(Object.values(item).join(" "))).slice(0, 3) : [];
    if (activities.length !== 3) return Response.json({ error: "generation_unavailable" }, { status: 502 });
    return Response.json({ activities });
  } catch {
    return Response.json({ error: "generation_unavailable" }, { status: 500 });
  }
}
