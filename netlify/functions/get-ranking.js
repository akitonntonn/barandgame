const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body)
  };
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

function mapScoreRow(row) {
  return {
    playerName: row.player_name || "NO NAME",
    score: row.score || 0,
    bestCombo: row.best_combo || 0,
    level: row.level || 1,
    rank: row.rank || "",
    drunkMeter: row.drunk_meter || 0,
    focusCount: row.focus_count || 0,
    playTime: row.play_time || 0,
    createdAt: row.created_at || ""
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return json(405, { success: false, error: "GET only" });
  }

  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return json(503, { success: false, error: "全体ランキングは現在準備中です" });
  }

  const params = new URLSearchParams({
    select: "player_name,score,best_combo,level,rank,drunk_meter,focus_count,play_time,created_at",
    order: "score.desc,best_combo.desc,level.desc,created_at.asc",
    limit: "50"
  });

  try {
    const response = await fetch(`${url}/scores?${params.toString()}`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    });

    if (!response.ok) {
      const message = await response.text();
      return json(502, { success: false, error: message || "ランキングの取得に失敗しました" });
    }

    const rows = await response.json();
    return json(200, { success: true, ranking: rows.map(mapScoreRow) });
  } catch (error) {
    return json(500, { success: false, error: error.message || "ランキングの取得に失敗しました" });
  }
};
