import OpenAI from "openai";

let client;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY não foi configurada no .env."
    );
  }

  if (!client) {
    client = new OpenAI({ apiKey });
  }

  return client;
}

export async function generateHdcResponse({
  message,
  instructions = "Você é a HDC Intelligence, assistente oficial do House de Countryballs. Responda em português brasileiro, com linguagem formal, clara, imparcial e profissional. Não invente acontecimentos ou dados do RPG."
}) {
  if (!message || typeof message !== "string" || !message.trim()) {
    throw new Error("A mensagem enviada está vazia.");
  }

  const model = process.env.OPENAI_MODEL || "gpt-6.2-sol";

  const response = await getOpenAIClient().responses.create({
    model,
    instructions,
    input: message.trim(),
    max_output_tokens: 800
  });

  const answer = response.output_text?.trim();

  if (!answer) {
    throw new Error(
      "A OpenAI não retornou uma resposta em texto."
    );
  }

  return answer;
}
