const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body)
  };
}

function sanitizeText(value, maxLength) {
  const text = typeof value === "string" ? value : "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function toFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
}

function normalizeSupabaseRestUrl(url) {
  if (!url) return "";
  const trimmed = url.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/rest/v1") ? trimmed : `${trimmed}/rest/v1`;
}

function getSupabaseConfig() {
  const url = normalizeSupabaseRestUrl(process.env.SUPABASE_URL);
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, key };
}

function validatePayload(payload) {
  const playerName = sanitizeText(payload.playerName, 20) || "NO NAME";
  const rank = sanitizeText(payload.rank, 80);
  const score = toFiniteNumber(payload.score);
  const bestCombo = toFiniteNumber(payload.bestCombo);
  const level = toFiniteNumber(payload.level);
  const drunkMeter = toFiniteNumber(payload.drunkMeter);
  const focusCount = toFiniteNumber(payload.focusCount);
  const playTime = toFiniteNumber(payload.playTime);

  if (!(score > 0 && score < 1000000)) throw new Error("スコアの値が正しくありません");
  if (!(bestCombo >= 0 && bestCombo <= 1000)) throw new Error("コンボの値が正しくありません");
  if (!(level >= 1 && level <= 99)) throw new Error("レベルの値が正しくありません");
  if (!(drunkMeter >= 0 && drunkMeter <= 100)) throw new Error("酔いゲージの値が正しくありません");
  if (!(focusCount >= 0)) throw new Error("集中回数の値が正しくありません");
  if (!(playTime >= 0 && playTime <= 3600)) throw new Error("プレイ時間の値が正しくありません");

  return {
    player_name: playerName,
    score: Math.round(score),
    best_combo: Math.round(bestCombo),
    level: Math.round(level),
    rank,
    drunk_meter: Math.round(drunkMeter),
    focus_count: Math.round(focusCount),
    play_time: Math.round(playTime)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { success: false, error: "POST only" });
  }

  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return json(503, { success: false, error: "全体ランキングは現在準備中です" });
  }

  try {
    const payload = validatePayload(JSON.parse(event.body || "{}"));
    const response = await fetch(`${url}/scores`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const message = await response.text();
      return json(502, { success: false, error: message || "Supabaseへの保存に失敗しました" });
    }

    return json(200, { success: true });
  } catch (error) {
    return json(400, { success: false, error: error.message || "保存に失敗しました" });
  }
};
