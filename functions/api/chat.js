export async function onRequestPost(context) {
  const apiKey = context.env.GROQ_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing GROQ_API_KEY" }), { status: 500 });
  }

  const { message } = await context.request.json();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await res.json();
  return new Response(JSON.stringify(data));
}
