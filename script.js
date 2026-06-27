// bar & ドリンクジャッジ
// ゲーム時間、判定時間、ダメージ量はこの定数で調整できます。

const GAME_SECONDS = 60;
const MAX_HP = 100;
const MAX_HEARTS = 5;
const HEART_HP_VALUE = MAX_HP / MAX_HEARTS;
const MAX_METER = 100;
const MAX_LEVEL = 15;
const FOCUS_MODE_SECONDS = 5;
const FOCUS_JUDGE_BONUS_SECONDS = 0.6;
const MAX_FOCUS_JUDGE_SECONDS = 3.6;
const MYSTERY_REVEAL_SECONDS = 0.7;
const DRUNK_MODE_THRESHOLD = 70;
const RANKING_KEY = "barDrinkJudgeRanking";
const ONLINE_RANKING_ENDPOINT = "/.netlify/functions/get-ranking";
const ONLINE_SCORE_ENDPOINT = "/.netlify/functions/submit-score";
const START_JUDGE_SECONDS = 3;
const MIN_JUDGE_SECONDS = 1.2;
const WRONG_HP_DAMAGE = 18;
const FAST_TIME_BONUS_SECONDS = 5;
const NORMAL_TIME_BONUS_SECONDS = 3;
const FOCUS_FAST_TIME_BONUS_SECONDS = 3;
const FOCUS_NORMAL_TIME_BONUS_SECONDS = 2;
const WRONG_TIME_PENALTY_SECONDS = 5;
const WRONG_ALCOHOL_TIME_PENALTY_SECONDS = 7;
const FAST_BONUS_RATIO = 0.55;
const BASE_FAKEOUT_CHANCE = 0.18;
const MAX_FAKEOUT_CHANCE = 0.48;
const SCREEN_BGM_SRC = "assets/title-result-bgm.mp3";
const GAME_BGM_SRC = "assets/game-bgm.mp3";
const GAME_BGM_VOLUME = 0.18;
const GAME_CLICK_SOUND_SRC = "assets/game-click.mp3";
const CORRECT_SOUND_SRC = "assets/correct.mp3";
const INCORRECT_SOUND_SRC = "assets/incorrect.mp3";
const PERFECT_SOUND_SRC = "assets/perfect.mp3";
const LEVEL_UP_SOUND_SRC = "assets/level-up.mp3";
const GAME_OVER_SOUND_SRC = "assets/game-over.mp3";
const FOCUS_READY_SOUND_SRC = "assets/focus-ready.mp3";
const DRUNK_MODE_SOUND_SRC = "assets/drunk-mode.mp3";
const SERVE_GLASS_SOUND_SRC = "assets/serve-glass.mp3";

const NON_ALCOHOLIC_DRINKS = [
  { name: "Water", jpName: "水", type: "nonAlcohol", action: "drink", level: 1, icon: "💧", fakePair: null, rarity: "common", tags: ["water", "basic"] },
  { name: "Ice Water", jpName: "アイスウォーター", type: "nonAlcohol", action: "drink", level: 1, icon: "🧊", fakePair: null, rarity: "common", tags: ["water", "basic"] },
  { name: "Oolong Tea", jpName: "烏龍茶", type: "nonAlcohol", action: "drink", level: 1, icon: "🍵", fakePair: "Oolong High", rarity: "common", tags: ["tea", "fakeout"] },
  { name: "Green Tea", jpName: "緑茶", type: "nonAlcohol", action: "drink", level: 1, icon: "🍵", fakePair: "Green Tea High", rarity: "common", tags: ["tea", "fakeout"] },
  { name: "Sparkling Water", jpName: "炭酸水", type: "nonAlcohol", action: "drink", level: 2, icon: "🫧", fakePair: "Highball", rarity: "common", tags: ["water", "carbonated", "fakeout"] },
  { name: "Lemon Water", jpName: "レモンウォーター", type: "nonAlcohol", action: "drink", level: 2, icon: "🍋", fakePair: "Lemon Sour", rarity: "common", tags: ["water", "citrus", "fakeout"] },
  { name: "Electrolyte Drink", jpName: "電解質ドリンク", type: "nonAlcohol", action: "drink", level: 2, icon: "⚡", fakePair: "Tequila Sunrise", rarity: "common", tags: ["chaser", "sports", "fakeout"] },
  { name: "Tomato Juice", jpName: "トマトジュース", type: "nonAlcohol", action: "drink", level: 3, icon: "🍅", fakePair: "Bloody Mary", rarity: "uncommon", tags: ["juice", "fakeout"] },
  { name: "Ginger Ale", jpName: "ジンジャーエール", type: "nonAlcohol", action: "drink", level: 3, icon: "🫚", fakePair: "Gin Buck", rarity: "uncommon", tags: ["soda", "fakeout"] },
  { name: "Coffee", jpName: "コーヒー", type: "nonAlcohol", action: "drink", level: 3, icon: "☕", fakePair: null, rarity: "common", tags: ["coffee"] },
  { name: "Cola", jpName: "コーラ", type: "nonAlcohol", action: "drink", level: 4, icon: "🥤", fakePair: "Coke Highball", rarity: "uncommon", tags: ["soda", "fakeout"] },
  { name: "Orange Juice", jpName: "オレンジジュース", type: "nonAlcohol", action: "drink", level: 4, icon: "🍊", fakePair: "Screwdriver", rarity: "uncommon", tags: ["juice", "fakeout"] },
  { name: "Grapefruit Juice", jpName: "グレープフルーツジュース", type: "nonAlcohol", action: "drink", level: 4, icon: "🍊", fakePair: "Salty Dog", rarity: "uncommon", tags: ["juice", "fakeout"] },
  { name: "Iced Coffee", jpName: "アイスコーヒー", type: "nonAlcohol", action: "drink", level: 4, icon: "☕", fakePair: null, rarity: "uncommon", tags: ["coffee"] },
  { name: "Cafe Latte", jpName: "カフェラテ", type: "nonAlcohol", action: "drink", level: 5, icon: "☕", fakePair: "Kahlua Milk", rarity: "uncommon", tags: ["coffee", "milk", "fakeout"] },
  { name: "Cranberry Juice", jpName: "クランベリージュース", type: "nonAlcohol", action: "drink", level: 5, icon: "🍒", fakePair: "Cosmopolitan", rarity: "rare", tags: ["juice", "cocktail-like", "fakeout"] },
  { name: "Pineapple Juice", jpName: "パイナップルジュース", type: "nonAlcohol", action: "drink", level: 5, icon: "🍍", fakePair: "Pina Colada", rarity: "rare", tags: ["juice", "tropical", "fakeout"] },
  { name: "Tonic Water", jpName: "トニックウォーター", type: "nonAlcohol", action: "drink", level: 5, icon: "🫧", fakePair: "Gin and Tonic", rarity: "rare", tags: ["carbonated", "bitter", "fakeout"] },
  { name: "Lime Soda", jpName: "ライムソーダ", type: "nonAlcohol", action: "drink", level: 6, icon: "🍋", fakePair: "Gin Lime", rarity: "rare", tags: ["soda", "citrus", "fakeout"] },
  { name: "Iced Tea", jpName: "アイスティー", type: "nonAlcohol", action: "drink", level: 6, icon: "🫖", fakePair: "Long Island Iced Tea", rarity: "rare", tags: ["tea", "fakeout"] },
  { name: "Non-Alcoholic Beer", jpName: "ノンアルコールビール", type: "nonAlcohol", action: "drink", level: 6, icon: "🍺", fakePair: "Beer", rarity: "rare", tags: ["non-alcoholic", "beer-like", "fakeout"] },
  { name: "Non-Alcoholic Mojito", jpName: "ノンアルモヒート", type: "nonAlcohol", action: "drink", level: 6, icon: "🌿", fakePair: "Mojito", rarity: "rare", tags: ["mocktail", "mint", "fakeout"] },
  { name: "Non-Alcoholic Cassis Soda", jpName: "ノンアルカシスソーダ", type: "nonAlcohol", action: "drink", level: 7, icon: "🍇", fakePair: "Cassis Soda", rarity: "rare", tags: ["mocktail", "soda", "fakeout"] },
  { name: "Chanmery", jpName: "シャンメリー", type: "nonAlcohol", action: "drink", level: 7, icon: "🍾", fakePair: "Champagne", rarity: "rare", tags: ["sparkling", "fakeout"] },
  { name: "Virgin Pina Colada", jpName: "ヴァージンピニャコラーダ", type: "nonAlcohol", action: "drink", level: 7, icon: "🍍", fakePair: "Pina Colada", rarity: "expert", tags: ["mocktail", "tropical"] },
  { name: "Shirley Temple", jpName: "シャーリーテンプル", type: "nonAlcohol", action: "drink", level: 8, icon: "🍒", fakePair: null, rarity: "expert", tags: ["mocktail", "classic"] },
  { name: "Yuzu Soda", jpName: "柚子ソーダ", type: "nonAlcohol", action: "drink", level: 8, icon: "🍋", fakePair: null, rarity: "rare", tags: ["soda", "japanese"] },
  { name: "Apple Juice", jpName: "アップルジュース", type: "nonAlcohol", action: "drink", level: 8, icon: "🍎", fakePair: null, rarity: "common", tags: ["juice"] },
  { name: "Mineral Water", jpName: "ミネラルウォーター", type: "nonAlcohol", action: "drink", level: 9, icon: "💧", fakePair: null, rarity: "common", tags: ["water", "chaser"] },
  { name: "Chaser Water", jpName: "チェイサーウォーター", type: "nonAlcohol", action: "drink", level: 9, icon: "🥛", fakePair: null, rarity: "expert", tags: ["water", "chaser"] }
];

const ALCOHOLIC_DRINKS = [
  { name: "Beer", jpName: "ビール", type: "alcohol", action: "avoid", level: 1, icon: "🍺", fakePair: "Non-Alcoholic Beer", rarity: "common", tags: ["beer", "basic", "fakeout"] },
  { name: "Tequila Shot", jpName: "テキーラショット", type: "alcohol", action: "avoid", level: 1, icon: "🥃", fakePair: null, rarity: "common", tags: ["shot", "basic"] },
  { name: "Whiskey", jpName: "ウイスキー", type: "alcohol", action: "avoid", level: 1, icon: "🥃", fakePair: null, rarity: "common", tags: ["whiskey", "basic"] },
  { name: "Champagne", jpName: "シャンパン", type: "alcohol", action: "avoid", level: 2, icon: "🍾", fakePair: "Chanmery", rarity: "common", tags: ["sparkling", "fakeout"] },
  { name: "Highball", jpName: "ハイボール", type: "alcohol", action: "avoid", level: 3, icon: "🥃", fakePair: "Sparkling Water", rarity: "common", tags: ["whiskey", "carbonated", "fakeout"] },
  { name: "Oolong High", jpName: "烏龍ハイ", type: "alcohol", action: "avoid", level: 3, icon: "🍵", fakePair: "Oolong Tea", rarity: "uncommon", tags: ["tea", "fakeout"] },
  { name: "Green Tea High", jpName: "緑茶ハイ", type: "alcohol", action: "avoid", level: 3, icon: "🍵", fakePair: "Green Tea", rarity: "uncommon", tags: ["tea", "fakeout"] },
  { name: "Lemon Sour", jpName: "レモンサワー", type: "alcohol", action: "avoid", level: 3, icon: "🍋", fakePair: "Lemon Water", rarity: "uncommon", tags: ["sour", "citrus", "fakeout"] },
  { name: "Bloody Mary", jpName: "ブラッディメアリー", type: "alcohol", action: "avoid", level: 4, icon: "🍅", fakePair: "Tomato Juice", rarity: "uncommon", tags: ["cocktail", "juice", "fakeout"] },
  { name: "Gin Buck", jpName: "ジンバック", type: "alcohol", action: "avoid", level: 4, icon: "🫚", fakePair: "Ginger Ale", rarity: "uncommon", tags: ["gin", "fakeout"] },
  { name: "Coke Highball", jpName: "コークハイ", type: "alcohol", action: "avoid", level: 4, icon: "🥤", fakePair: "Cola", rarity: "uncommon", tags: ["whiskey", "fakeout"] },
  { name: "Screwdriver", jpName: "スクリュードライバー", type: "alcohol", action: "avoid", level: 5, icon: "🍊", fakePair: "Orange Juice", rarity: "rare", tags: ["vodka", "juice", "fakeout"] },
  { name: "Salty Dog", jpName: "ソルティドッグ", type: "alcohol", action: "avoid", level: 5, icon: "🍊", fakePair: "Grapefruit Juice", rarity: "rare", tags: ["vodka", "juice", "fakeout"] },
  { name: "Kahlua Milk", jpName: "カルーアミルク", type: "alcohol", action: "avoid", level: 5, icon: "☕", fakePair: "Cafe Latte", rarity: "rare", tags: ["coffee", "milk", "fakeout"] },
  { name: "Cosmopolitan", jpName: "コスモポリタン", type: "alcohol", action: "avoid", level: 5, icon: "🍸", fakePair: "Cranberry Juice", rarity: "rare", tags: ["cocktail", "cranberry", "fakeout"] },
  { name: "Pina Colada", jpName: "ピニャコラーダ", type: "alcohol", action: "avoid", level: 6, icon: "🍍", fakePair: "Pineapple Juice", rarity: "rare", tags: ["cocktail", "tropical", "fakeout"] },
  { name: "Mojito", jpName: "モヒート", type: "alcohol", action: "avoid", level: 6, icon: "🌿", fakePair: "Non-Alcoholic Mojito", rarity: "rare", tags: ["rum", "mint", "fakeout"] },
  { name: "Cassis Soda", jpName: "カシスソーダ", type: "alcohol", action: "avoid", level: 6, icon: "🍇", fakePair: "Non-Alcoholic Cassis Soda", rarity: "rare", tags: ["liqueur", "soda", "fakeout"] },
  { name: "Long Island Iced Tea", jpName: "ロングアイランドアイスティー", type: "alcohol", action: "avoid", level: 6, icon: "🫖", fakePair: "Iced Tea", rarity: "expert", tags: ["cocktail", "tea-name", "fakeout"] },
  { name: "Gin and Tonic", jpName: "ジントニック", type: "alcohol", action: "avoid", level: 7, icon: "🍸", fakePair: "Tonic Water", rarity: "rare", tags: ["gin", "bar", "fakeout"] },
  { name: "Gin Lime", jpName: "ジンライム", type: "alcohol", action: "avoid", level: 7, icon: "🍋", fakePair: "Lime Soda", rarity: "rare", tags: ["gin", "citrus", "fakeout"] },
  { name: "Moscow Mule", jpName: "モスコミュール", type: "alcohol", action: "avoid", level: 7, icon: "🫚", fakePair: null, rarity: "rare", tags: ["vodka", "bar"] },
  { name: "Martini", jpName: "マティーニ", type: "alcohol", action: "avoid", level: 7, icon: "🍸", fakePair: null, rarity: "expert", tags: ["gin", "classic"] },
  { name: "Negroni", jpName: "ネグローニ", type: "alcohol", action: "avoid", level: 8, icon: "🥃", fakePair: null, rarity: "expert", tags: ["bitter", "classic"] },
  { name: "Manhattan", jpName: "マンハッタン", type: "alcohol", action: "avoid", level: 9, icon: "🥃", fakePair: null, rarity: "expert", tags: ["whiskey", "classic"] },
  { name: "Sidecar", jpName: "サイドカー", type: "alcohol", action: "avoid", level: 9, icon: "🍸", fakePair: null, rarity: "expert", tags: ["brandy", "classic"] },
  { name: "Absinthe", jpName: "アブサン", type: "alcohol", action: "avoid", level: 9, icon: "🟢", fakePair: null, rarity: "expert", tags: ["herbal", "strong"] },
  { name: "Islay Malt", jpName: "アイラモルト", type: "alcohol", action: "avoid", level: 9, icon: "🥃", fakePair: null, rarity: "expert", tags: ["whiskey", "smoky"] },
  { name: "XYZ", jpName: "XYZ", type: "alcohol", action: "avoid", level: 10, icon: "🍸", fakePair: null, rarity: "expert", tags: ["cocktail", "classic"] },
  { name: "Tequila Sunrise", jpName: "テキーラサンライズ", type: "alcohol", action: "avoid", level: 6, icon: "🌅", fakePair: "Electrolyte Drink", rarity: "rare", tags: ["tequila", "juice", "fakeout"] }
];

// 似た名前や見た目の「飲む/避ける」を混ぜるひっかけ問題です。
const FAKEOUT_DRINK_PAIRS = [
  { safe: "Sparkling Water", trap: "Highball" },
  { safe: "Lemon Water", trap: "Lemon Sour" },
  { safe: "Oolong Tea", trap: "Oolong High" },
  { safe: "Green Tea", trap: "Green Tea High" },
  { safe: "Tomato Juice", trap: "Bloody Mary" },
  { safe: "Orange Juice", trap: "Screwdriver" },
  { safe: "Grapefruit Juice", trap: "Salty Dog" },
  { safe: "Ginger Ale", trap: "Gin Buck" },
  { safe: "Cola", trap: "Coke Highball" },
  { safe: "Cafe Latte", trap: "Kahlua Milk" },
  { safe: "Cranberry Juice", trap: "Cosmopolitan" },
  { safe: "Pineapple Juice", trap: "Pina Colada" },
  { safe: "Non-Alcoholic Mojito", trap: "Mojito" },
  { safe: "Non-Alcoholic Cassis Soda", trap: "Cassis Soda" },
  { safe: "Iced Tea", trap: "Long Island Iced Tea" },
  { safe: "Tonic Water", trap: "Gin and Tonic" },
  { safe: "Lime Soda", trap: "Gin Lime" },
  { safe: "Non-Alcoholic Beer", trap: "Beer" },
  { safe: "Chanmery", trap: "Champagne" },
  { safe: "Electrolyte Drink", trap: "Tequila Sunrise" }
];

const ACTIONS = {
  drink: "drink",
  avoid: "avoid"
};

const SPECIAL_DRINKS = [
  {
    name: "Chaser",
    jpName: "チェイサー",
    type: "nonAlcohol",
    action: ACTIONS.drink,
    level: 3,
    icon: "🥤",
    fakePair: null,
    rarity: "uncommon",
    specialType: "chaser",
    tags: ["special", "heal", "safe", "water", "chaser"]
  },
  {
    name: "Golden Water",
    jpName: "ゴールデンウォーター",
    type: "nonAlcohol",
    action: ACTIONS.drink,
    level: 4,
    icon: "✨",
    fakePair: null,
    rarity: "rare",
    specialType: "goldenWater",
    tags: ["special", "bonus", "safe", "water"]
  },
  {
    name: "Mystery Glass",
    jpName: "ミステリーグラス",
    type: "mystery",
    action: null,
    level: 5,
    icon: "❔",
    fakePair: null,
    rarity: "rare",
    specialType: "mystery",
    tags: ["special", "mystery"]
  },
  {
    name: "Trap Shot",
    jpName: "トラップショット",
    type: "alcohol",
    action: ACTIONS.avoid,
    level: 6,
    icon: "💎",
    fakePair: null,
    rarity: "rare",
    specialType: "trapShot",
    tags: ["special", "trap", "alcohol"]
  }
];

const MYSTERY_DRINK_CANDIDATES = [
  "Water",
  "Sparkling Water",
  "Oolong Tea",
  "Highball",
  "Tequila Shot",
  "Lemon Sour",
  "Martini",
  "Champagne"
];

const ALL_DRINKS = [...NON_ALCOHOLIC_DRINKS, ...ALCOHOLIC_DRINKS, ...SPECIAL_DRINKS];

const BARTENDER_LINES = {
  serve: [
    "次の一杯、見極めてください。",
    "これは飲めますか？",
    "焦らず、よく見てください。",
    "一瞬の判断が大事です。",
    "見た目に騙されないでください。",
    "グラスの中身、ちゃんと見えてますか？",
    "bar &の夜は、判断力が大事です。",
    "次は少し難しいですよ。",
    "これは簡単そうに見えますね。",
    "さあ、次のオーダーです。"
  ],
  correct: [
    "いい判断です。",
    "さすがです。",
    "完璧です。",
    "冷静ですね。",
    "ナイスジャッジです。",
    "今のは綺麗でした。",
    "見極め力ありますね。",
    "その調子です。",
    "お見事です。",
    "夜を楽しむ才能がありますね。"
  ],
  wrong: [
    "それは飲んだらあかんやつです。",
    "判断ミスです。",
    "見た目に騙されましたね。",
    "焦りは禁物です。",
    "まだ取り返せます。",
    "それは避けるべき一杯でした。",
    "次で立て直しましょう。",
    "ちょっと酔いが回ってきましたね。",
    "落ち着いていきましょう。",
    "今のは危なかったですね。"
  ],
  combo: [
    "ノってきましたね。",
    "かなり冴えてます。",
    "連続正解、いい流れです。",
    "水を制する者が夜を制します。",
    "このペースなら高得点いけます。",
    "完璧なリズムです。",
    "今、完全に流れが来てます。",
    "bar &の常連みたいな判断です。",
    "その集中力、素晴らしいです。",
    "まだまだ伸びますよ。"
  ],
  levelUp: [
    "レベルアップです。",
    "ここから少し難しくなります。",
    "次からテンポが上がります。",
    "ここからが本番です。",
    "判断スピードを上げていきましょう。",
    "bar &の夜はここからです。",
    "集中していきましょう。",
    "難易度、上げていきます。",
    "いい感じに温まってきましたね。",
    "まだついて来れますか？"
  ],
  lowHp: [
    "少し危ないですね。",
    "ここから慎重にいきましょう。",
    "あと少しで限界です。",
    "落ち着いて見極めてください。",
    "ここでミスると危険です。",
    "焦らなければまだいけます。",
    "今こそ冷静さが大事です。",
    "最後まで諦めないでください。",
    "一杯一杯、丁寧にいきましょう。",
    "無理せず水を選びましょう。"
  ],
  highDrunk: [
    "ちょっと酔いが回ってきてますね。",
    "そろそろ水が欲しいところです。",
    "判断が鈍ってきてますよ。",
    "ここで水を選べる人が強いです。",
    "無理は禁物です。",
    "いったん落ち着きましょう。",
    "チェイサー、欲しくなってきましたね。",
    "飲みすぎ注意です。",
    "まだ見極められますか？",
    "視界、大丈夫ですか？"
  ],
  focus: [
    "集中モードです。",
    "今なら全部見えますね。",
    "冴えてます。",
    "この流れ、逃さないでください。",
    "判断力が研ぎ澄まされています。",
    "今が稼ぎ時です。",
    "完璧な集中です。",
    "ここで一気に伸ばしましょう。",
    "夜の主役になってきましたね。",
    "そのまま駆け抜けてください。"
  ],
  special: [
    "これは少し怪しいですね。",
    "よく見た方がいいですよ。",
    "名前に注目です。",
    "見た目だけで判断しないでください。",
    "これは引っかけかもしれません。",
    "慎重にいきましょう。",
    "焦ると危ない一杯です。",
    "グラスの中身がポイントです。",
    "さて、これはどうしますか？",
    "今の判断力が試されます。"
  ],
  gameOver: [
    "お疲れさまでした。",
    "今夜の判断力、見せてもらいました。",
    "また挑戦してください。",
    "次はもっと上を狙えます。",
    "いい夜でしたね。",
    "bar &でまたお待ちしています。",
    "水を選べる人は強いです。",
    "最後までよく見極めました。",
    "次回は伝説の常連を目指しましょう。",
    "今夜の結果をランキングで確認しましょう。"
  ]
};

const COMBO_MILESTONES = [
  { combo: 10, title: "10 COMBO", subtitle: "いい流れです。", rank: "good", effect: "smallGlow" },
  { combo: 20, title: "20 COMBO", subtitle: "ノってきましたね。", rank: "good", effect: "smallGlow" },
  { combo: 30, title: "30 COMBO", subtitle: "判断力、冴えてます。", rank: "great", effect: "goldBurst" },
  { combo: 50, title: "50 COMBO", subtitle: "bar & 常連クラス。", rank: "great", effect: "goldBurst" },
  { combo: 75, title: "75 COMBO", subtitle: "完璧なリズムです。", rank: "great", effect: "goldBurst" },
  { combo: 100, title: "100 COMBO", subtitle: "NIGHT MASTER", rank: "excellent", effect: "screenFlash" },
  { combo: 150, title: "150 COMBO", subtitle: "水を制する者が夜を制す。", rank: "excellent", effect: "screenFlash" },
  { combo: 200, title: "200 COMBO", subtitle: "LEGENDARY GUEST", rank: "legend", effect: "legendGlow" },
  { combo: 300, title: "300 COMBO", subtitle: "もう誰にも止められません。", rank: "legend", effect: "legendGlow" },
  { combo: 500, title: "500 COMBO", subtitle: "bar & VIP", rank: "mythic", effect: "mythicBurst" },
  { combo: 777, title: "777 COMBO", subtitle: "LUCKY NIGHT FEVER", rank: "fever", effect: "fever" },
  { combo: 1000, title: "1000 COMBO", subtitle: "伝説の常連", rank: "god", effect: "ultimate" }
];

const COMBO_EFFECT_CLASSES = [
  "combo-effect-smallGlow",
  "combo-effect-goldBurst",
  "combo-effect-screenFlash",
  "combo-effect-legendGlow",
  "combo-effect-mythicBurst",
  "combo-effect-fever",
  "combo-effect-ultimate"
];

const BARTENDER_LINE_PRIORITY = {
  serve: 1,
  lowHp: 2,
  highDrunk: 3,
  special: 4,
  correct: 5,
  wrong: 6,
  combo: 7,
  levelUp: 8,
  gameOver: 9,
  focus: 10
};

let lastBartenderLine = "";

const state = {
  running: false,
  paused: false,
  acceptingInput: false,
  score: 0,
  combo: 0,
  bestCombo: 0,
  finalRank: "Dランク：酔いすぎ注意",
  finalRankCode: "D",
  finalRankBadges: [],
  hp: MAX_HP,
  level: 1,
  maxTime: GAME_SECONDS,
  timeLeft: GAME_SECONDS,
  elapsed: 0,
  drunkMeter: 0,
  focusMeter: 0,
  focusMode: false,
  focusModeTimeLeft: 0,
  focusModeCount: 0,
  judgeTime: START_JUDGE_SECONDS,
  judgeLeft: START_JUDGE_SECONDS,
  currentDrink: null,
  currentResolvedDrink: null,
  mysteryRevealTimer: null,
  mysteryRevealed: false,
  specialMessageTimer: null,
  recentDrinkNames: [],
  lastSpecialDrinkName: null,
  lastDrinkType: null,
  typeStreak: 0,
  nextDrinkDelay: 0,
  lastFrame: 0,
  animationId: 0,
  audio: null,
  screenBgm: null,
  gameBgm: null,
  gameClickSound: null,
  correctSound: null,
  incorrectSound: null,
  perfectSound: null,
  levelUpSound: null,
  gameOverSound: null,
  focusReadySound: null,
  drunkModeSound: null,
  serveGlassSound: null,
  drunkModeActive: false,
  screenBgmUnlocked: false,
  gameBgmEnabled: true,
  quitByMenu: false,
  bartenderSpeechTimer: null,
  bartenderSpeechPriority: 0,
  comboMilestoneTimer: null,
  beatTimer: 0,
  beatStep: 0,
  scoreSaved: false,
  rankingMode: "local",
  onlineRanking: [],
  onlineRankingLoaded: false,
  onlineRankingLoading: false
};

// 画面とHUDの要素。IDは index.html と対応しています。
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const titleBgmButton = document.getElementById("titleBgmButton");
const restartButton = document.getElementById("restartButton");
const pauseButton = document.getElementById("pauseButton");
const barStage = document.getElementById("barStage");
const bartenderSpeech = document.getElementById("bartenderSpeech");
const comboMilestone = document.getElementById("comboMilestone");
const bartender = document.getElementById("bartender");
const bartenderImage = document.getElementById("bartenderImage");
const drinkButton = document.getElementById("drinkButton");
const avoidButton = document.getElementById("avoidButton");
const drinkCard = document.getElementById("drinkCard");
const drinkIcon = document.getElementById("drinkIcon");
const drinkName = document.getElementById("drinkName");
const drinkCategory = document.getElementById("drinkCategory");
const judgeBarFill = document.getElementById("judgeBarFill");
const feedback = document.getElementById("feedback");
const specialMessage = document.getElementById("specialMessage");
const statusMessage = document.getElementById("statusMessage");

const scoreText = document.getElementById("scoreText");
const comboText = document.getElementById("comboText");
const hpText = document.getElementById("hpText");
const timerText = document.getElementById("timerText");
const levelText = document.getElementById("levelText");
const drunkMeterBox = document.getElementById("drunkMeterBox");
const drunkMeterText = document.getElementById("drunkMeterText");
const drunkMeterFill = document.getElementById("drunkMeterFill");
const focusMeterBox = document.getElementById("focusMeterBox");
const focusMeterText = document.getElementById("focusMeterText");
const focusMeterFill = document.getElementById("focusMeterFill");
const focusModeStatus = document.getElementById("focusModeStatus");
const finalScore = document.getElementById("finalScore");
const bestCombo = document.getElementById("bestCombo");
const finalLevel = document.getElementById("finalLevel");
const finalDrunkMeter = document.getElementById("finalDrunkMeter");
const finalFocusCount = document.getElementById("finalFocusCount");
const finalRank = document.getElementById("finalRank");
const finalBadges = document.getElementById("finalBadges");
const resultMessage = document.getElementById("resultMessage");
const titleRanking = document.getElementById("titleRanking");
const resultRanking = document.getElementById("resultRanking");
const rankingTabs = document.querySelectorAll(".ranking-tab");
const playerNameInput = document.getElementById("playerNameInput");
const saveScoreButton = document.getElementById("saveScoreButton");
const saveScoreMessage = document.getElementById("saveScoreMessage");
const gameMenuOverlay = document.getElementById("gameMenuOverlay");
const resumeButton = document.getElementById("resumeButton");
const gameBgmToggleButton = document.getElementById("gameBgmToggleButton");
const quitGameButton = document.getElementById("quitGameButton");

let touchStartX = 0;
let touchStartY = 0;

// 入力設定。ボタン、キーボード、スワイプをまとめて扱います。
startButton.addEventListener("click", startGame);
if (titleBgmButton) {
  titleBgmButton.addEventListener("click", startTitleBgm);
}
restartButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);
resumeButton.addEventListener("click", resumeGameFromMenu);
gameBgmToggleButton.addEventListener("click", toggleGameBgmSetting);
quitGameButton.addEventListener("click", quitGameFromMenu);
drinkButton.addEventListener("click", () => judge(ACTIONS.drink));
avoidButton.addEventListener("click", () => judge(ACTIONS.avoid));
saveScoreButton.addEventListener("click", saveCurrentResult);
playerNameInput.addEventListener("keydown", handleNameInputKeydown);
rankingTabs.forEach((button) => {
  button.addEventListener("click", () => setRankingMode(button.dataset.rankingMode || "local"));
});
document.addEventListener("keydown", handleKeyboard);
document.addEventListener("pointerdown", unlockScreenBgm, { once: true });
barStage.addEventListener("touchstart", handleTouchStart, { passive: true });
barStage.addEventListener("touchend", handleTouchEnd, { passive: true });

renderRanking();
prepareOptionalImages();
initScreenBgm();
initGameBgm();
initGameClickSound();
initJudgeSounds();
initSpecialSounds();
playScreenBgm();

// ゲーム状態を初期化して、判定画面を開始します。
function startGame() {
  clearBartenderSpeechTimer();
  clearComboMilestoneTimer();
  clearSpecialTimers();
  Object.assign(state, {
    running: true,
    paused: false,
    acceptingInput: false,
    score: 0,
    combo: 0,
    bestCombo: 0,
    finalRank: "Dランク：酔いすぎ注意",
    finalRankCode: "D",
    finalRankBadges: [],
    hp: MAX_HP,
    level: 1,
    maxTime: GAME_SECONDS,
    timeLeft: GAME_SECONDS,
    elapsed: 0,
    drunkMeter: 0,
    focusMeter: 0,
    focusMode: false,
    focusModeTimeLeft: 0,
    focusModeCount: 0,
    drunkModeActive: false,
    judgeTime: START_JUDGE_SECONDS,
    judgeLeft: START_JUDGE_SECONDS,
    currentDrink: null,
    currentResolvedDrink: null,
    mysteryRevealTimer: null,
    mysteryRevealed: false,
    specialMessageTimer: null,
    recentDrinkNames: [],
    lastSpecialDrinkName: null,
    lastDrinkType: null,
    typeStreak: 0,
    nextDrinkDelay: 0,
    lastFrame: performance.now(),
    beatTimer: 0,
    beatStep: 0,
    quitByMenu: false,
    bartenderSpeechTimer: null,
    bartenderSpeechPriority: 0,
    comboMilestoneTimer: null,
    scoreSaved: false
  });

  showScreen(gameScreen);
  closeGameMenu(false);
  hideBartenderLine();
  stopScreenBgm();
  playGameBgm();
  statusMessage.textContent = "バーテンダーの一杯を見極めてください。";
  updateGameBgmButton();
  updateHud();
  updateMetersHud();
  updateDrunkVisualEffects();
  initAudio();
  playStartSound();
  serveNextDrink();
  state.animationId = requestAnimationFrame(gameLoop);
}

function showScreen(screen) {
  [titleScreen, gameScreen, resultScreen].forEach((item) => {
    item.classList.toggle("screen-active", item === screen);
  });

  if (screen === titleScreen || screen === resultScreen) {
    playScreenBgm();
  } else {
    stopScreenBgm();
  }
  updateScreenBgmButton();
}

// assets/bartender.png がある場合は画像を使い、ない場合はCSSシルエットを表示します。
function prepareOptionalImages() {
  if (bartenderImage.complete && bartenderImage.naturalWidth > 0) {
    bartender.classList.add("has-image");
  }

  bartenderImage.addEventListener("load", () => {
    bartender.classList.add("has-image");
  });

  bartenderImage.addEventListener("error", () => {
    bartender.classList.remove("has-image");
  });
}

// メインループ。全体タイマー、判定タイマー、BGMの拍を同期します。
function gameLoop(now) {
  if (!state.running) return;

  const delta = Math.min((now - state.lastFrame) / 1000, 0.05);
  state.lastFrame = now;

  if (!state.paused) {
    state.elapsed += delta;
    subtractTime(delta);
    updateLevel();
    state.judgeTime = getCurrentJudgeTime();

    updateFocusMode(delta);
    updateMysteryReveal(delta);
    runBeat(delta);
    updateDrinkTimer(delta);
    updateHud();
    updateMetersHud();
    updateDrunkVisualEffects();

    if (shouldEndGame()) {
      endGame();
      return;
    }
  }

  state.animationId = requestAnimationFrame(gameLoop);
}

function getJudgeSeconds() {
  return getCurrentJudgeTime();
}

function getRandomBartenderLine(type) {
  const lines = BARTENDER_LINES[type] || BARTENDER_LINES.serve;
  if (!lines.length) return "";

  let line = lines[Math.floor(Math.random() * lines.length)];

  if (lines.length > 1) {
    let safety = 0;
    while (line === lastBartenderLine && safety < 8) {
      line = lines[Math.floor(Math.random() * lines.length)];
      safety += 1;
    }
  }

  lastBartenderLine = line;
  return line;
}

function showBartenderLine(type = "serve", options = {}) {
  if (!bartenderSpeech) return;
  if (state.paused && type !== "gameOver") return;
  if (!state.running && type !== "gameOver") return;

  const priority = BARTENDER_LINE_PRIORITY[type] || BARTENDER_LINE_PRIORITY.serve;
  if (state.bartenderSpeechPriority > priority) return;

  const line = options.text || getRandomBartenderLine(type);
  const duration = options.duration || 2600;

  bartenderSpeech.textContent = line;
  bartenderSpeech.className = `bartender-speech show ${type}`;
  state.bartenderSpeechPriority = priority;

  clearBartenderSpeechTimer();
  state.bartenderSpeechTimer = window.setTimeout(() => {
    bartenderSpeech.classList.remove("show");
    bartenderSpeech.classList.add("hide");
    state.bartenderSpeechPriority = 0;
  }, duration);
}

function clearBartenderSpeechTimer() {
  if (state.bartenderSpeechTimer) {
    if (typeof window.clearTimeout === "function") {
      window.clearTimeout(state.bartenderSpeechTimer);
    } else if (typeof clearTimeout === "function") {
      clearTimeout(state.bartenderSpeechTimer);
    }
    state.bartenderSpeechTimer = null;
  }
}

function hideBartenderLine() {
  clearBartenderSpeechTimer();
  state.bartenderSpeechPriority = 0;
  if (!bartenderSpeech) return;
  bartenderSpeech.className = "bartender-speech hide";
}

function updateLevel() {
  const nextLevel = Math.min(MAX_LEVEL, 1 + Math.floor(state.elapsed / 8));
  if (nextLevel > state.level) {
    state.level = nextLevel;
    playLevelUpSound();
    showBartenderLine("levelUp");
    return;
  }

  state.level = nextLevel;
}

// 一杯ずつ表示し、バーテンダーから差し出される演出を再生します。
function serveNextDrink() {
  if (!state.running || state.paused) return;
  clearSpecialTimers();
  state.currentDrink = pickDrink();
  state.currentResolvedDrink = isMysteryDrink(state.currentDrink) ? null : state.currentDrink;
  state.mysteryRevealTimer = isMysteryDrink(state.currentDrink) ? MYSTERY_REVEAL_SECONDS : null;
  state.mysteryRevealed = !isMysteryDrink(state.currentDrink);
  state.judgeTime = getCurrentJudgeTime();
  state.judgeLeft = state.judgeTime;
  state.acceptingInput = true;
  updateDrinkCard(state.currentDrink);
  triggerServeAnimation();
  playServeGlassSound();
  updateJudgeBar();
  showServeBartenderLine(state.currentDrink);
}

function pickDrink() {
  const specialDrink = pickSpecialDrink();
  if (specialDrink) return finalizeDrinkChoice(specialDrink);

  const forcedType = getForcedDrinkType();
  const targetType = forcedType || (Math.random() < getAlcoholChance() ? "alcohol" : "nonAlcohol");
  const shouldUseFakeout = Math.random() < getFakeoutChance();
  const drink = shouldUseFakeout
    ? pickFakeoutDrink(targetType)
    : pickWeightedDrink(targetType);

  return finalizeDrinkChoice(drink || pickWeightedDrink(targetType) || pickWeightedDrink());
}

function pickSpecialDrink() {
  const chance = getSpecialDrinkChance();
  if (Math.random() >= chance) return null;

  let candidates = SPECIAL_DRINKS.filter((drink) => drink.level <= state.level);
  candidates = candidates.filter((drink) => drink.name !== state.lastSpecialDrinkName);
  if (!candidates.length) return null;

  const selected = weightedPick(candidates, (drink) => getRarityWeight(drink.rarity));
  return selected ? { ...selected } : null;
}

function getSpecialDrinkChance() {
  if (state.level < 3) return 0;
  if (state.level <= 4) return 0.08;
  if (state.level <= 6) return 0.12;
  return 0.15;
}

function getAlcoholChance() {
  return Math.min(0.52, 0.34 + state.level * 0.018);
}

function getForcedDrinkType() {
  if (state.typeStreak < 2) return null;
  return state.lastDrinkType === "alcohol" ? "nonAlcohol" : "alcohol";
}

function getAvailableDrinks(type) {
  return ALL_DRINKS.filter((drink) => {
    const matchesType = !type || drink.type === type;
    return matchesType && !drink.specialType && drink.level <= state.level;
  });
}

function pickWeightedDrink(type) {
  let candidates = getAvailableDrinks(type);
  const withoutRecent = candidates.filter((drink) => !state.recentDrinkNames.includes(drink.name));
  if (withoutRecent.length >= 3) candidates = withoutRecent;

  return weightedPick(candidates, (drink) => getRarityWeight(drink.rarity));
}

function getRarityWeight(rarity) {
  const level = state.level;
  const weights = {
    common: Math.max(1.6, 5.6 - level * 0.3),
    uncommon: level >= 3 ? 2.4 + level * 0.08 : 0.5,
    rare: level >= 5 ? 1.1 + level * 0.16 : 0.16,
    expert: level >= 7 ? 0.4 + level * 0.18 : 0.04
  };
  return weights[rarity] || 1;
}

function weightedPick(items, getWeight) {
  if (!items.length) return null;
  const totalWeight = items.reduce((sum, item) => sum + getWeight(item), 0);
  let roll = Math.random() * totalWeight;

  for (const item of items) {
    roll -= getWeight(item);
    if (roll <= 0) return item;
  }

  return items[items.length - 1];
}

function getFakeoutChance() {
  return Math.min(MAX_FAKEOUT_CHANCE, BASE_FAKEOUT_CHANCE + (state.level - 1) * 0.04);
}

function pickFakeoutDrink(targetType) {
  const eligiblePairs = FAKEOUT_DRINK_PAIRS
    .map((pair) => ({
      safe: findDrinkByName(pair.safe),
      trap: findDrinkByName(pair.trap)
    }))
    .filter((pair) => pair.safe && pair.trap && pair.safe.level <= state.level && pair.trap.level <= state.level);

  if (!eligiblePairs.length) return null;

  const filteredPairs = eligiblePairs.filter((pair) => {
    const selected = targetType === "alcohol" ? pair.trap : pair.safe;
    return !state.recentDrinkNames.includes(selected.name);
  });
  const pair = (filteredPairs.length ? filteredPairs : eligiblePairs)[Math.floor(Math.random() * (filteredPairs.length || eligiblePairs.length))];
  const useTrap = targetType ? targetType === "alcohol" : Math.random() < getFakeoutTrapChance();

  return {
    ...(useTrap ? pair.trap : pair.safe),
    fakeout: true
  };
}

function getFakeoutTrapChance() {
  return Math.min(0.62, 0.42 + state.level * 0.018);
}

function findDrinkByName(name) {
  return ALL_DRINKS.find((drink) => drink.name === name);
}

function finalizeDrinkChoice(drink) {
  const selected = {
    ...drink,
    correctAction: drink.action
  };

  state.recentDrinkNames.push(selected.name);
  state.recentDrinkNames = state.recentDrinkNames.slice(-4);
  if (isSpecialDrink(selected)) {
    state.lastSpecialDrinkName = selected.name;
  }

  const streakType = selected.type === "mystery" ? "special" : selected.type;
  if (state.lastDrinkType === streakType) {
    state.typeStreak += 1;
  } else {
    state.lastDrinkType = streakType;
    state.typeStreak = 1;
  }

  return selected;
}

function showServeBartenderLine(drink) {
  if (!drink) return;
  const filledHearts = Math.ceil((state.hp / MAX_HP) * MAX_HEARTS);
  if (isMysteryDrink(drink)) {
    showBartenderLine("special", { text: "これは少し怪しいですね。" });
    return;
  }
  if (isSpecialDrink(drink)) {
    showBartenderLine("special");
    return;
  }
  if (drink.fakeout || drink.rarity === "rare" || drink.rarity === "expert") {
    showBartenderLine("special");
    return;
  }
  if (state.drunkMeter >= DRUNK_MODE_THRESHOLD) {
    showBartenderLine("highDrunk");
    return;
  }
  if (filledHearts <= 1) {
    showBartenderLine("lowHp");
    return;
  }
  showBartenderLine("serve");
}

function updateDrinkCard() {
  const drink = arguments[0] || state.currentDrink;
  const options = arguments[1] || {};
  if (!drink) return;

  const shouldMask = options.masked || (isMysteryDrink(drink) && !state.mysteryRevealed);
  const displayDrink = shouldMask
    ? { icon: "❔", jpName: "???", name: "???", specialType: "mystery" }
    : drink;
  drinkIcon.textContent = displayDrink.icon;
  drinkName.textContent = displayDrink.jpName || displayDrink.name;
  drinkCategory.textContent = getDrinkCategoryLabel(displayDrink, { ...options, masked: shouldMask });
  drinkCard.className = getDrinkCardClass(displayDrink, { ...options, masked: shouldMask });
  statusMessage.textContent = getDrinkStatusMessage(displayDrink, { ...options, masked: shouldMask });
}

function isSpecialDrink(drink) {
  return Boolean(drink && drink.specialType);
}

function isMysteryDrink(drink) {
  return drink && drink.specialType === "mystery";
}

function getDrinkForJudgment() {
  if (!state.currentDrink) return null;
  if (isMysteryDrink(state.currentDrink)) {
    return state.currentResolvedDrink;
  }
  return state.currentDrink;
}

function resolveMysteryDrink() {
  const candidates = MYSTERY_DRINK_CANDIDATES
    .map((name) => findDrinkByName(name))
    .filter((drink) => drink && drink.level <= state.level);
  const pool = candidates.length ? candidates : MYSTERY_DRINK_CANDIDATES.map((name) => findDrinkByName(name)).filter(Boolean);
  const selected = pool[Math.floor(Math.random() * pool.length)];
  if (!selected) return null;
  return {
    ...selected,
    correctAction: selected.action,
    mysterySource: true
  };
}

function updateMysteryReveal(delta) {
  if (!state.acceptingInput || !isMysteryDrink(state.currentDrink) || state.mysteryRevealed) return;
  if (state.mysteryRevealTimer === null) return;

  state.mysteryRevealTimer = Math.max(0, state.mysteryRevealTimer - delta);
  if (state.mysteryRevealTimer <= 0) {
    revealMysteryDrink();
  }
}

function revealMysteryDrink() {
  if (!state.running || state.paused || !isMysteryDrink(state.currentDrink) || state.mysteryRevealed) return;

  state.currentResolvedDrink = resolveMysteryDrink();
  state.mysteryRevealed = true;
  state.mysteryRevealTimer = null;
  updateDrinkCard(state.currentResolvedDrink, { revealed: true, mysteryResolved: true });
  drinkCard.classList.remove("mystery-reveal");
  drinkCard.offsetHeight;
  drinkCard.classList.add("mystery-reveal");
  showSpecialMessage("正体が見えました", "mystery");
  playServeGlassSound();
}

function getDrinkCategoryLabel(drink, options = {}) {
  if (options.masked || drink.specialType === "mystery") return "MYSTERY GLASS";
  if (drink.specialType === "chaser") return "SPECIAL CHASER";
  if (drink.specialType === "goldenWater") return "GOLDEN SPECIAL";
  if (drink.specialType === "trapShot") return "危険な香り";
  if (options.mysteryResolved) return "REVEALED GLASS";
  return "提供された一杯";
}

function getDrinkCardClass(drink, options = {}) {
  const classes = ["drink-card", "neutral"];
  if (drink.specialType) classes.push(`special-${drink.specialType}`);
  if (options.masked || drink.specialType === "mystery") classes.push("special-mystery");
  if (options.mysteryResolved) classes.push("mystery-resolved");
  return classes.join(" ");
}

function getDrinkStatusMessage(drink, options = {}) {
  if (options.masked || drink.specialType === "mystery") return "正体不明の一杯です...";
  if (drink.specialType === "chaser") return "回復できる一杯です。";
  if (drink.specialType === "goldenWater") return "黄金に光る特別な一杯です。";
  if (drink.specialType === "trapShot") return "綺麗ですが、危険な香りがします。";
  if (options.mysteryResolved) return "正体が見えました。判断してください。";
  return "飲む？ それとも避ける？";
}

function addScoreBonus(points) {
  const finalPoints = state.focusMode ? points * 2 : points;
  state.score += finalPoints;
  return finalPoints;
}

function applySpecialDrinkEffect(drink, action, isCorrect) {
  if (!isSpecialDrink(drink)) return;

  switch (drink.specialType) {
    case "chaser":
      if (isCorrect) {
        state.hp = Math.min(MAX_HP, state.hp + HEART_HP_VALUE);
        decreaseDrunkMeter(15);
        increaseFocusMeter(10);
        addScoreBonus(150);
        showSpecialMessage("HP +1 / 酔い -15", "heal");
        playCatchSound(false);
      }
      break;

    case "goldenWater":
      if (isCorrect) {
        addScoreBonus(500);
        increaseFocusMeter(25);
        decreaseDrunkMeter(10);
        showSpecialMessage("BONUS +500", "bonus");
        playCatchSound(true);
        flashGoldParticles();
      }
      break;

    case "trapShot":
      if (isCorrect) {
        addScoreBonus(300);
        showSpecialMessage("DANGER AVOIDED +300", "dangerAvoided");
        playCatchSound(true);
      } else if (action === ACTIONS.drink) {
        increaseDrunkMeter(10);
        subtractTime(2);
        showSpecialMessage("危険な一杯でした...", "danger");
        playBadSound();
      }
      break;

    default:
      break;
  }
}

function showSpecialMessage(text, className = "") {
  if (!specialMessage) return;

  specialMessage.textContent = text;
  specialMessage.className = `special-message show ${className}`;
  if (state.specialMessageTimer) window.clearTimeout(state.specialMessageTimer);
  state.specialMessageTimer = window.setTimeout(() => {
    specialMessage.classList.remove("show");
    state.specialMessageTimer = null;
  }, 1500);
}

function clearSpecialTimers(shouldClearMessage = true) {
  state.mysteryRevealTimer = null;
  state.mysteryRevealed = false;

  if (shouldClearMessage && state.specialMessageTimer) {
    window.clearTimeout(state.specialMessageTimer);
    state.specialMessageTimer = null;
  }

  if (shouldClearMessage && specialMessage) {
    specialMessage.textContent = "";
    specialMessage.className = "special-message";
  }
}

function flashGoldParticles() {
  drinkCard.classList.remove("gold-burst");
  drinkCard.offsetHeight;
  drinkCard.classList.add("gold-burst");
  window.setTimeout(() => drinkCard.classList.remove("gold-burst"), 620);
}

function triggerServeAnimation() {
  bartender.classList.remove("serving");
  drinkCard.classList.remove("served");
  bartender.offsetHeight;
  drinkCard.offsetHeight;
  bartender.classList.add("serving");
  drinkCard.classList.add("served");
}

function updateDrinkTimer(delta) {
  if (!state.acceptingInput) {
    state.nextDrinkDelay -= delta;
    if (state.nextDrinkDelay <= 0 && state.running) {
      serveNextDrink();
    }
    return;
  }

  state.judgeLeft = Math.max(0, state.judgeLeft - delta);
  updateJudgeBar();

  if (state.judgeLeft <= 0) {
    judge(null);
  }
}

function updateJudgeBar() {
  const ratio = Math.max(0, state.judgeLeft / state.judgeTime);
  judgeBarFill.style.transform = `scaleX(${ratio})`;
}

// プレイヤーの選択を判定します。正解ならスコアとコンボ、不正解ならHPが変化します。
function judge(action) {
  if (!state.running || state.paused || !state.acceptingInput) return;

  const drink = getDrinkForJudgment();
  if (!drink) {
    if (action) playGameClickSound();
    showFeedback("早すぎます", "miss");
    showSpecialMessage("まだ中身が見えていません", "mystery");
    showBartenderLine("special", { text: "まだ中身が見えていません。" });
    statusMessage.textContent = "正体が見えてから判断してください。";
    return;
  }

  const correct = action === drink.correctAction;
  state.acceptingInput = false;
  if (action) playGameClickSound();

  if (correct) {
    const fast = state.judgeLeft / state.judgeTime > FAST_BONUS_RATIO;
    const points = fast ? 160 : 110;
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    const showedComboMilestone = checkComboMilestone();
    let earnedPoints = points + state.combo * 10;
    if (state.focusMode) earnedPoints *= 2;
    state.score += earnedPoints;
    applyDrinkEffects(drink, action, true);
    applyTimeReward(true, fast, drink, action, "answer");
    applySpecialDrinkEffect(drink, action, true);
    statusMessage.textContent = getCorrectMessage(action, fast, drink);
    showFeedback(fast ? "PERFECT" : "GOOD", fast ? "perfect" : "good");
    flashStage("correct-flash");
    playCatchSound(fast);
    if (!showedComboMilestone) {
      showBartenderLine(state.combo > 0 && state.combo % 10 === 0 ? "combo" : "correct");
    }
  } else {
    state.combo = 0;
    state.hp = Math.max(0, state.hp - WRONG_HP_DAMAGE);
    applyDrinkEffects(drink, action, false);
    applyTimeReward(false, false, drink, action, action === null ? "timeout" : "answer");
    applySpecialDrinkEffect(drink, action, false);
    statusMessage.textContent = getMissMessage(action, drink);
    showFeedback("MISS", "miss");
    flashStage("wrong-flash");
    playBadSound();
    showBartenderLine("wrong");
    if (Math.ceil((state.hp / MAX_HP) * MAX_HEARTS) <= 1) {
      showBartenderLine("lowHp");
    }
  }

  updateHud();
  updateMetersHud();
  updateDrunkVisualEffects();
  clearSpecialTimers(false);
  state.nextDrinkDelay = correct ? 0.55 : 0.75;
}

function getCorrectMessage(action, fast, drink = state.currentDrink) {
  const baseMessage = action === ACTIONS.drink ? "いい判断です。" : "鋭い見極めです。";
  const seconds = getTimeRewardSeconds(true, fast, drink, action, "answer");
  return seconds > 0 ? `${baseMessage} +${seconds}秒` : baseMessage;
}

function getMissMessage(action, drink) {
  if (action === null) return "時間切れです...";
  if (action === ACTIONS.drink && drink.type === "alcohol") return `飲みすぎ注意... -${WRONG_ALCOHOL_TIME_PENALTY_SECONDS}秒`;
  return `今の一杯は飲めました。 -${WRONG_TIME_PENALTY_SECONDS}秒`;
}

function flashStage(className) {
  barStage.classList.remove("correct-flash", "wrong-flash");
  barStage.offsetHeight;
  barStage.classList.add(className);
  window.setTimeout(() => barStage.classList.remove(className), 430);
}

// PC操作: F または ← で「飲む」、J または → で「避ける」。Space/Pで一時停止。
function handleKeyboard(event) {
  unlockScreenBgm();
  const key = event.key.toLowerCase();
  if (key === "f" || key === "arrowleft") {
    event.preventDefault();
    judge(ACTIONS.drink);
  }

  if (key === "j" || key === "arrowright") {
    event.preventDefault();
    judge(ACTIONS.avoid);
  }

  if (key === "p" || key === " ") {
    event.preventDefault();
    if (state.running) togglePause();
  }
}

// スマホ操作: 右スワイプで「飲む」、左スワイプで「避ける」。
function handleTouchStart(event) {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleTouchEnd(event) {
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy)) {
    judge(dx > 0 ? ACTIONS.drink : ACTIONS.avoid);
  }
}

function togglePause() {
  if (!state.running) return;
  if (gameMenuOverlay && !gameMenuOverlay.hidden) {
    resumeGameFromMenu();
    return;
  }
  openGameMenu();
}

function openGameMenu() {
  if (!state.running) return;
  state.paused = true;
  state.lastFrame = performance.now();
  statusMessage.textContent = "一時停止中";
  pauseGameBgm();
  if (gameMenuOverlay) {
    gameMenuOverlay.hidden = false;
  }
  updateGameBgmButton();
  showFeedback("PAUSE", "miss");
}

function closeGameMenu(shouldResume) {
  if (gameMenuOverlay) {
    gameMenuOverlay.hidden = true;
  }
  if (!shouldResume) return;

  state.paused = false;
  state.lastFrame = performance.now();
  statusMessage.textContent = "次の一杯を見極めてください。";
  playGameBgm();
  showFeedback("RESUME", "good");
}

function resumeGameFromMenu() {
  if (!state.running) return;
  closeGameMenu(true);
}

function toggleGameBgmSetting() {
  state.gameBgmEnabled = !state.gameBgmEnabled;
  if (state.gameBgmEnabled && state.running && !state.paused) {
    playGameBgm();
  } else {
    pauseGameBgm();
  }
  updateGameBgmButton();
}

function updateGameBgmButton() {
  if (!gameBgmToggleButton) return;
  gameBgmToggleButton.textContent = state.gameBgmEnabled ? "BGM ON" : "BGM OFF";
  if (typeof gameBgmToggleButton.setAttribute === "function") {
    gameBgmToggleButton.setAttribute("aria-pressed", String(state.gameBgmEnabled));
  }
}

function quitGameFromMenu() {
  if (!state.running) return;
  state.quitByMenu = true;
  closeGameMenu(false);
  endGame();
}

function updateHud() {
  scoreText.textContent = state.score;
  comboText.textContent = state.combo;
  updateHpHearts();
  timerText.textContent = Math.ceil(state.timeLeft);
  levelText.textContent = state.level;
}

function updateHpHearts() {
  const filledHearts = Math.ceil((state.hp / MAX_HP) * MAX_HEARTS);
  if (typeof hpText.setAttribute === "function") {
    hpText.setAttribute("aria-label", `ライフ ${filledHearts}/${MAX_HEARTS}`);
  }
  if (typeof document.createElement !== "function" || typeof hpText.appendChild !== "function") {
    hpText.textContent = "♥".repeat(filledHearts) + "♡".repeat(MAX_HEARTS - filledHearts);
    return;
  }
  hpText.innerHTML = "";

  for (let index = 0; index < MAX_HEARTS; index += 1) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    if (index >= filledHearts) {
      heart.className = "heart-empty";
    }
    hpText.appendChild(heart);
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function addTime(seconds) {
  state.timeLeft = clamp(state.timeLeft + seconds, 0, state.maxTime || GAME_SECONDS);
}

function subtractTime(seconds) {
  state.timeLeft = clamp(state.timeLeft - seconds, 0, state.maxTime || GAME_SECONDS);
}

function getTimeRewardSeconds(isCorrect, isPerfect, drink, action, reason) {
  if (!isCorrect) {
    if (reason === "timeout") return 0;
    return action === ACTIONS.drink && drink.type === "alcohol"
      ? -WRONG_ALCOHOL_TIME_PENALTY_SECONDS
      : -WRONG_TIME_PENALTY_SECONDS;
  }

  if (state.focusMode) {
    return isPerfect ? FOCUS_FAST_TIME_BONUS_SECONDS : FOCUS_NORMAL_TIME_BONUS_SECONDS;
  }

  return isPerfect ? FAST_TIME_BONUS_SECONDS : NORMAL_TIME_BONUS_SECONDS;
}

function applyTimeReward(isCorrect, isPerfect, drink, action, reason) {
  const seconds = getTimeRewardSeconds(isCorrect, isPerfect, drink, action, reason);
  if (seconds > 0) addTime(seconds);
  if (seconds < 0) subtractTime(Math.abs(seconds));
}

function updateMetersHud() {
  if (!drunkMeterText || !focusMeterText) return;
  drunkMeterText.textContent = `${Math.round(state.drunkMeter)}%`;
  focusMeterText.textContent = state.focusMode ? "ACTIVE" : `${Math.round(state.focusMeter)}%`;
  drunkMeterFill.style.transform = `scaleX(${clamp(state.drunkMeter, 0, MAX_METER) / MAX_METER})`;
  focusMeterFill.style.transform = `scaleX(${clamp(state.focusMeter, 0, MAX_METER) / MAX_METER})`;
  drunkMeterBox.classList.toggle("warning", state.drunkMeter >= 70);
  focusMeterBox.classList.toggle("ready", state.focusMeter >= MAX_METER);
  focusModeStatus.hidden = !state.focusMode;
  focusModeStatus.textContent = state.focusMode ? `FOCUS MODE ${state.focusModeTimeLeft.toFixed(1)}s` : "";
}

function increaseDrunkMeter(amount) {
  const wasDrunkMode = state.drunkMeter >= DRUNK_MODE_THRESHOLD;
  state.drunkMeter = clamp(state.drunkMeter + amount, 0, MAX_METER);
  const isDrunkMode = state.drunkMeter >= DRUNK_MODE_THRESHOLD;

  if (!wasDrunkMode && isDrunkMode && !state.drunkModeActive) {
    state.drunkModeActive = true;
    playDrunkModeSound();
    showBartenderLine("highDrunk");
  }
}

function decreaseDrunkMeter(amount) {
  state.drunkMeter = clamp(state.drunkMeter - amount, 0, MAX_METER);
  if (state.drunkMeter < DRUNK_MODE_THRESHOLD) {
    state.drunkModeActive = false;
  }
}

function increaseFocusMeter(amount) {
  if (state.focusMode) return;
  state.focusMeter = clamp(state.focusMeter + amount, 0, MAX_METER);
  if (state.focusMeter >= MAX_METER) activateFocusMode();
}

function decreaseFocusMeter(amount) {
  state.focusMeter = clamp(state.focusMeter - amount, 0, MAX_METER);
}

function activateFocusMode() {
  state.focusMeter = 0;
  state.focusMode = true;
  state.focusModeTimeLeft = FOCUS_MODE_SECONDS;
  state.focusModeCount += 1;
  showFeedback("FOCUS MODE", "perfect");
  showBartenderLine("focus", { duration: 3000 });
  playFocusReadySound();
  updateMetersHud();
  updateDrunkVisualEffects();
}

function updateFocusMode(delta) {
  if (!state.focusMode) return;
  state.focusModeTimeLeft = Math.max(0, state.focusModeTimeLeft - delta);
  if (state.focusModeTimeLeft <= 0) {
    state.focusMode = false;
    state.focusModeTimeLeft = 0;
    showFeedback("FOCUS END", "good");
  }
}

function getCurrentJudgeTime() {
  const baseJudgeTime = Math.max(MIN_JUDGE_SECONDS, START_JUDGE_SECONDS - (state.level - 1) * 0.2);
  const focusedJudgeTime = state.focusMode
    ? Math.min(MAX_FOCUS_JUDGE_SECONDS, baseJudgeTime + FOCUS_JUDGE_BONUS_SECONDS)
    : baseJudgeTime;
  return clamp(focusedJudgeTime, MIN_JUDGE_SECONDS, MAX_FOCUS_JUDGE_SECONDS);
}

function applyDrinkEffects(drink, action, isCorrect) {
  if (isCorrect) {
    if (drink.specialType === "chaser" || drink.specialType === "goldenWater") {
      return;
    }

    if (action === ACTIONS.drink && drink.type === "nonAlcohol") {
      increaseFocusMeter(isWaterOrTeaDrink(drink) ? 15 : 12);
      if (isWaterOrTeaDrink(drink)) decreaseDrunkMeter(8);
    }

    if (action === ACTIONS.avoid && drink.type === "alcohol") {
      increaseFocusMeter(4);
    }

    return;
  }

  decreaseFocusMeter(10);
  if (action === ACTIONS.drink && drink.type === "alcohol") {
    increaseDrunkMeter(25);
  }
}

function isWaterOrTeaDrink(drink) {
  const name = `${drink.name || ""} ${drink.jpName || ""}`;
  return [
    "水",
    "ウォーター",
    "炭酸水",
    "茶",
    "チェイサー",
    "Water",
    "Sparkling",
    "Tea",
    "Oolong",
    "Green Tea",
    "Chaser"
  ].some((keyword) => name.includes(keyword));
}

function updateDrunkVisualEffects() {
  barStage.classList.toggle("drunk-blur", state.drunkMeter >= 40);
  barStage.classList.toggle("drunk-sway", state.drunkMeter >= 70);
  barStage.classList.toggle("drunk-warning", state.drunkMeter >= 90);
  barStage.classList.toggle("focus-mode-active", state.focusMode);
}

function shouldEndGame() {
  return state.hp <= 0 || state.drunkMeter >= MAX_METER || state.timeLeft <= 0;
}

function showFeedback(text, className) {
  feedback.textContent = text;
  feedback.className = `feedback ${className}`;
  feedback.offsetHeight;
  feedback.classList.add("show");
}

function checkComboMilestone() {
  if (state.paused || !state.running || state.combo <= 0) return false;
  const milestone = COMBO_MILESTONES.find((item) => item.combo === state.combo);
  if (!milestone) return false;

  showComboMilestone(milestone);
  triggerComboEffect(milestone);
  return true;
}

function showComboMilestone(milestone) {
  if (!comboMilestone) return;
  const title = comboMilestone.querySelector(".combo-milestone-title");
  const subtitle = comboMilestone.querySelector(".combo-milestone-subtitle");
  if (!title || !subtitle) return;

  title.textContent = milestone.title;
  subtitle.textContent = milestone.subtitle;
  comboMilestone.className = `combo-milestone show ${milestone.rank}`;

  clearComboMilestoneTimer(false);
  state.comboMilestoneTimer = window.setTimeout(() => {
    comboMilestone.classList.remove("show");
    state.comboMilestoneTimer = null;
  }, 1400);
}

function triggerComboEffect(milestone) {
  if (!document.body) return;
  document.body.classList.remove(...COMBO_EFFECT_CLASSES);
  const effectClass = `combo-effect-${milestone.effect}`;
  document.body.classList.add(effectClass);

  window.setTimeout(() => {
    document.body.classList.remove(effectClass);
  }, 900);

  showBartenderLine("combo", { text: milestone.subtitle });
  playLevelUpSound();
}

function clearComboMilestoneTimer(shouldHide = true) {
  if (state.comboMilestoneTimer) {
    window.clearTimeout(state.comboMilestoneTimer);
    state.comboMilestoneTimer = null;
  }

  if (document.body) {
    document.body.classList.remove(...COMBO_EFFECT_CLASSES);
  }

  if (shouldHide && comboMilestone) {
    comboMilestone.classList.remove("show");
  }
}

function endGame() {
  clearBartenderSpeechTimer();
  clearComboMilestoneTimer();
  clearSpecialTimers();
  state.running = false;
  state.paused = false;
  state.acceptingInput = false;
  state.focusMode = false;
  state.focusModeTimeLeft = 0;
  closeGameMenu(false);
  stopGameBgm();
  cancelAnimationFrame(state.animationId);
  showBartenderLine("gameOver", { duration: 1800 });
  const rankResult = calculatePlayerRank(
    state.score,
    state.bestCombo,
    state.level,
    Math.round(state.drunkMeter),
    state.focusModeCount
  );
  state.finalRank = rankResult.label;
  state.finalRankCode = rankResult.code;
  state.finalRankBadges = rankResult.badges;
  updateResultRankDisplay(rankResult);
  finalScore.textContent = state.score;
  bestCombo.textContent = state.bestCombo;
  finalLevel.textContent = state.level;
  finalDrunkMeter.textContent = `${Math.round(state.drunkMeter)}%`;
  finalFocusCount.textContent = state.focusModeCount;
  resultMessage.textContent = state.quitByMenu
    ? "ゲームを終了しました。ここまでのスコアを保存できます。"
    : state.hp <= 0
    ? "ゲーム終了。次はもっと鋭く見極めましょう。"
    : state.drunkMeter >= MAX_METER
      ? "酔いが限界です。次はもっと慎重に。"
    : "時間切れ。冴えた判断でした。";
  updateMetersHud();
  updateDrunkVisualEffects();
  prepareScoreSave();
  renderRanking();
  playGameOverSound();
  showScreen(resultScreen);
}

function getRanking() {
  try {
    return JSON.parse(localStorage.getItem(RANKING_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function prepareScoreSave() {
  state.scoreSaved = false;
  playerNameInput.value = localStorage.getItem("barDrinkJudgePlayerName") || "";
  playerNameInput.disabled = false;
  saveScoreButton.disabled = false;
  saveScoreMessage.textContent = "名前を入れてランキングに保存できます。";
}

function handleNameInputKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveCurrentResult();
  }
}

async function saveCurrentResult() {
  if (state.scoreSaved) return;
  const name = normalizePlayerName(playerNameInput.value);
  localStorage.setItem("barDrinkJudgePlayerName", name);
  saveScore(state.score, name, {
    bestCombo: state.bestCombo,
    level: state.level,
    rank: state.finalRank,
    rankCode: state.finalRankCode,
    badges: state.finalRankBadges,
    drunkMeter: Math.round(state.drunkMeter),
    focusCount: state.focusModeCount,
    playTime: Math.round(state.elapsed)
  });
  state.scoreSaved = true;
  playerNameInput.disabled = true;
  saveScoreButton.disabled = true;
  saveScoreMessage.textContent = `${name} のスコアを保存しました。`;
  renderRanking();
  saveScoreMessage.textContent = "全体ランキングに保存中...";

  const onlineSaved = await submitOnlineScore(name);
  if (onlineSaved) {
    saveScoreMessage.textContent = "全体ランキングに保存しました";
    state.onlineRankingLoaded = false;
    if (state.rankingMode === "online") fetchOnlineRanking();
  } else {
    saveScoreMessage.textContent = "オンライン保存に失敗しました。ローカルには保存済みです";
  }
}

function normalizePlayerName(name) {
  const trimmed = name.trim().replace(/\s+/g, " ");
  return trimmed || "NO NAME";
}

// このブラウザ内に上位5件だけ保存します。
function saveScore(score, name, details = {}) {
  const ranking = getRanking();
  ranking.push({ name, score, date: new Date().toLocaleDateString(), ...details });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem(RANKING_KEY, JSON.stringify(ranking.slice(0, 5)));
}

function renderRanking() {
  if (state.rankingMode === "online") {
    renderOnlineRanking(state.onlineRanking);
    return;
  }

  const ranking = getRanking();
  renderRankingLists((list) => {
    list.innerHTML = "";
    if (!ranking.length) {
      const empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = "まだ記録がありません";
      list.appendChild(empty);
      return;
    }

    ranking.forEach((entry, index) => {
      const item = document.createElement("li");
      const rankText = entry.rank ? ` / ${sanitizeDisplayText(entry.rank)}` : "";
      item.textContent = `${index + 1}位 ${sanitizeDisplayText(entry.name || "NO NAME")} / ${entry.score}点 / ${entry.bestCombo || 0} COMBO / Lv${entry.level || 1}${rankText}`;
      list.appendChild(item);
    });
  });
}

function renderRankingLists(renderList) {
  [titleRanking, resultRanking].forEach((list) => renderList(list));
}

async function submitOnlineScore(playerName) {
  try {
    const response = await fetch(ONLINE_SCORE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerName,
        score: state.score,
        bestCombo: state.bestCombo,
        level: state.level,
        rank: state.finalRank,
        drunkMeter: Math.round(state.drunkMeter),
        focusCount: state.focusModeCount,
        playTime: Math.round(state.elapsed)
      })
    });
    const data = await response.json().catch(() => ({}));
    return response.ok && data.success;
  } catch (error) {
    return false;
  }
}

async function fetchOnlineRanking() {
  if (state.onlineRankingLoading) return;
  state.onlineRankingLoading = true;
  renderRankingLists((list) => {
    list.innerHTML = "";
    const item = document.createElement("li");
    item.className = "empty";
    item.textContent = "全体ランキングを読み込み中...";
    list.appendChild(item);
  });

  try {
    const response = await fetch(ONLINE_RANKING_ENDPOINT);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      throw new Error(data.error || "全体ランキングを読み込めませんでした");
    }
    state.onlineRanking = Array.isArray(data.ranking) ? data.ranking : [];
    state.onlineRankingLoaded = true;
    renderOnlineRanking(state.onlineRanking);
  } catch (error) {
    renderRankingLists((list) => {
      list.innerHTML = "";
      const item = document.createElement("li");
      item.className = "empty";
      item.textContent = error.message === "全体ランキングは現在準備中です"
        ? "全体ランキングは現在準備中です"
        : "全体ランキングを読み込めませんでした";
      list.appendChild(item);
    });
  } finally {
    state.onlineRankingLoading = false;
  }
}

function renderOnlineRanking(ranking) {
  renderRankingLists((list) => {
    list.innerHTML = "";
    if (!ranking.length) {
      const empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = state.onlineRankingLoaded ? "まだ記録がありません" : "全体ランキングを読み込めませんでした";
      list.appendChild(empty);
      return;
    }

    ranking.slice(0, 50).forEach((entry, index) => {
      const item = document.createElement("li");
      const rankText = entry.rank ? ` / ${sanitizeDisplayText(entry.rank)}` : "";
      item.textContent = `${index + 1}位 ${sanitizeDisplayText(entry.playerName || "NO NAME")} / ${Number(entry.score) || 0}点 / ${Number(entry.bestCombo) || 0} COMBO / Lv${Number(entry.level) || 1}${rankText}`;
      item.title = formatRankingDate(entry.createdAt);
      list.appendChild(item);
    });
  });
}

function setRankingMode(mode) {
  state.rankingMode = mode === "online" ? "online" : "local";
  rankingTabs.forEach((button) => {
    const active = button.dataset.rankingMode === state.rankingMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  if (state.rankingMode === "online") {
    if (state.onlineRankingLoaded) {
      renderOnlineRanking(state.onlineRanking);
    } else {
      fetchOnlineRanking();
    }
    return;
  }

  renderRanking();
}

function formatRankingDate(date) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString();
}

function sanitizeDisplayText(text) {
  return String(text || "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

function calculatePlayerRank(score, bestCombo, level, drunkMeter, focusCount) {
  const badges = [];

  if (drunkMeter <= 20 && score >= 25000) badges.push("清醒ボーナス");
  if (focusCount >= 5) badges.push("覚醒マスター");
  if (bestCombo >= 300) badges.push("コンボ職人");
  if (bestCombo >= 777) badges.push("FEVER達成");
  if (bestCombo >= 1000) badges.push("1000 COMBO達成");
  if (drunkMeter >= 90) badges.push("飲みすぎ注意");

  if (score >= 180000 && bestCombo >= 1000 && level >= 15) {
    return { code: "LEGEND", label: "LEGEND：夜の支配者", badges };
  }

  if (score >= 120000 && bestCombo >= 777 && level >= 13) {
    return { code: "SSS", label: "SSSランク：LUCKY NIGHT FEVER", badges };
  }

  if (score >= 75000 && bestCombo >= 500 && level >= 11) {
    return { code: "SS", label: "SSランク：bar & VIP", badges };
  }

  if (score >= 45000 && bestCombo >= 300 && level >= 9) {
    return { code: "S", label: "Sランク：伝説の常連", badges };
  }

  if (score >= 25000 && bestCombo >= 200 && level >= 7) {
    return { code: "A", label: "Aランク：夜を制する者", badges };
  }

  if (score >= 12000 && bestCombo >= 100 && level >= 5) {
    return { code: "B", label: "Bランク：冷静なお客さん", badges };
  }

  if (score >= 5000 && bestCombo >= 50) {
    return { code: "C", label: "Cランク：まだ飲まされがち", badges };
  }

  return { code: "D", label: "Dランク：酔いすぎ注意", badges };
}

function updateResultRankDisplay(rankResult) {
  if (finalRank) finalRank.textContent = rankResult.label;
  if (!finalBadges) return;

  finalBadges.textContent = rankResult.badges.length
    ? rankResult.badges.join(" / ")
    : "バッジなし";
}

// タイトル/リザルト用BGM。ブラウザ制限に合わせて、最初の操作後に再生します。
function initScreenBgm() {
  if (state.screenBgm) return;
  if (typeof Audio === "undefined") return;

  const bgm = new Audio(SCREEN_BGM_SRC);
  bgm.loop = true;
  bgm.preload = "auto";
  bgm.volume = 0.44;
  state.screenBgm = bgm;
}

function unlockScreenBgm() {
  state.screenBgmUnlocked = true;
  if (titleScreen.classList.contains("screen-active") || resultScreen.classList.contains("screen-active")) {
    playScreenBgm();
  }
}

function startTitleBgm() {
  state.screenBgmUnlocked = true;
  playScreenBgm();
}

function playScreenBgm() {
  initScreenBgm();
  if (!state.screenBgm || gameScreen.classList.contains("screen-active")) return;

  const playPromise = state.screenBgm.play();
  if (playPromise) {
    playPromise
      .then(() => {
        state.screenBgmUnlocked = true;
        updateScreenBgmButton();
      })
      .catch(() => {
        // 自動再生が止められた場合は、次のタップ/キー入力で再試行します。
        updateScreenBgmButton();
      });
  }
}

function stopScreenBgm() {
  if (!state.screenBgm) return;
  state.screenBgm.pause();
  updateScreenBgmButton();
}

function updateScreenBgmButton() {
  if (!titleBgmButton) return;
  const isPlaying = Boolean(state.screenBgm && !state.screenBgm.paused && titleScreen.classList.contains("screen-active"));
  titleBgmButton.textContent = isPlaying ? "BGM PLAYING" : "BGM ON";
  if (typeof titleBgmButton.setAttribute === "function") {
    titleBgmButton.setAttribute("aria-pressed", String(isPlaying));
  }
}

// ゲーム画面用BGM。静かなバー音源を小さめにループ再生します。
function initGameBgm() {
  if (state.gameBgm) return;
  if (typeof Audio === "undefined") return;

  const bgm = new Audio(GAME_BGM_SRC);
  bgm.loop = true;
  bgm.preload = "auto";
  bgm.volume = GAME_BGM_VOLUME;
  state.gameBgm = bgm;
}

function playGameBgm() {
  initGameBgm();
  if (!state.gameBgmEnabled) return;
  if (!state.gameBgm || !gameScreen.classList.contains("screen-active")) return;

  const playPromise = state.gameBgm.play();
  if (playPromise) {
    playPromise.catch(() => {
      // 自動再生が止められてもゲーム進行は止めません。次の操作で再試行されます。
    });
  }
}

function pauseGameBgm() {
  if (!state.gameBgm) return;
  state.gameBgm.pause();
}

function stopGameBgm() {
  if (!state.gameBgm) return;
  state.gameBgm.pause();
  state.gameBgm.currentTime = 0;
}

// ゲーム中の判断操作に使うクリック音です。ボタン、キー、スワイプで共通再生します。
function initGameClickSound() {
  if (state.gameClickSound) return;
  if (typeof Audio === "undefined") return;

  const clickSound = new Audio(GAME_CLICK_SOUND_SRC);
  clickSound.preload = "auto";
  clickSound.volume = 0.72;
  state.gameClickSound = clickSound;
}

function playGameClickSound() {
  initGameClickSound();
  if (!state.gameClickSound) return;

  state.gameClickSound.currentTime = 0;
  const playPromise = state.gameClickSound.play();
  if (playPromise) {
    playPromise.catch(() => {
      // 音声再生がブラウザに止められた場合でも、ゲーム進行は止めません。
    });
  }
}

// 正解/不正解の判定音です。MP3が使えない場合はWeb Audioの簡易音に戻します。
function initJudgeSounds() {
  if (state.correctSound || typeof Audio === "undefined") return;

  state.correctSound = createEffectAudio(CORRECT_SOUND_SRC, 0.78);
  state.incorrectSound = createEffectAudio(INCORRECT_SOUND_SRC, 0.82);
}

function initSpecialSounds() {
  if (state.perfectSound || typeof Audio === "undefined") return;

  state.perfectSound = createEffectAudio(PERFECT_SOUND_SRC, 0.84);
  state.levelUpSound = createEffectAudio(LEVEL_UP_SOUND_SRC, 0.78);
  state.gameOverSound = createEffectAudio(GAME_OVER_SOUND_SRC, 0.86);
  state.focusReadySound = createEffectAudio(FOCUS_READY_SOUND_SRC, 0.82);
  state.drunkModeSound = createEffectAudio(DRUNK_MODE_SOUND_SRC, 0.84);
  state.serveGlassSound = createEffectAudio(SERVE_GLASS_SOUND_SRC, 0.68);
}

function createEffectAudio(src, volume) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = volume;
  return audio;
}

function playEffectAudio(audio) {
  if (!audio) return false;

  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      // 音声再生がブラウザに止められた場合は、呼び出し元のフォールバック音を使います。
    });
  }
  return true;
}

// Web Audioはスタート後に作成します。スマホブラウザの自動再生制限対策です。
function initAudio() {
  if (state.audio) {
    state.audio.context.resume();
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.14;
  master.connect(context.destination);
  state.audio = { context, master };
}

// レベルが上がるほど少しテンポが詰まる、控えめなバー風ビートです。
function runBeat(delta) {
  if (!state.audio) return;
  state.beatTimer -= delta;
  if (state.beatTimer > 0) return;

  const interval = Math.max(0.2, 0.42 - state.level * 0.01);
  playBarBeatStep(state.beatStep);
  state.beatStep += 1;
  state.beatTimer = interval;
}

function playBarBeatStep(step) {
  const patternStep = step % 16;

  if (patternStep === 0 || patternStep === 8) {
    playTone(62, 0.12, "sine", 0.24);
  }

  if (patternStep === 4 || patternStep === 12) {
    playTone(148, 0.045, "triangle", 0.08);
  }

  if (patternStep % 2 === 1) {
    playTone(5600, 0.018, "square", 0.018);
  }

  if (patternStep === 2 || patternStep === 10) {
    playTone(patternStep === 2 ? 196 : 220, 0.08, "triangle", 0.06);
  }
}

// 効果音とビート用の小さなシンセヘルパーです。
function playTone(frequency, duration, type, volume) {
  if (!state.audio) return;

  const { context, master } = state.audio;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(master);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

function playStartSound() {
  playTone(392, 0.08, "triangle", 0.26);
  window.setTimeout(() => playTone(587, 0.08, "triangle", 0.22), 90);
}

function playCatchSound(perfect) {
  initJudgeSounds();
  initSpecialSounds();
  if (perfect && playEffectAudio(state.perfectSound)) return;
  if (playEffectAudio(state.correctSound)) return;

  playTone(perfect ? 784 : 622, 0.08, "triangle", perfect ? 0.28 : 0.2);
}

function playBadSound() {
  initJudgeSounds();
  if (playEffectAudio(state.incorrectSound)) return;

  playTone(92, 0.14, "sawtooth", 0.24);
}

function playFocusReadySound() {
  initSpecialSounds();
  if (playEffectAudio(state.focusReadySound)) return;

  playTone(523, 0.08, "triangle", 0.26);
  window.setTimeout(() => playTone(784, 0.1, "triangle", 0.24), 90);
  window.setTimeout(() => playTone(1046, 0.12, "sine", 0.18), 185);
}

function playDrunkModeSound() {
  initSpecialSounds();
  if (playEffectAudio(state.drunkModeSound)) return;

  playTone(120, 0.16, "sawtooth", 0.2);
  window.setTimeout(() => playTone(86, 0.18, "sawtooth", 0.16), 120);
}

function playServeGlassSound() {
  initSpecialSounds();
  if (playEffectAudio(state.serveGlassSound)) return;

  playTone(880, 0.04, "triangle", 0.12);
}

function playLevelUpSound() {
  initSpecialSounds();
  if (playEffectAudio(state.levelUpSound)) return;

  playTone(440, 0.08, "triangle", 0.24);
  window.setTimeout(() => playTone(660, 0.08, "triangle", 0.22), 90);
}

function playGameOverSound() {
  initSpecialSounds();
  if (playEffectAudio(state.gameOverSound)) return;

  playEndSound();
}

function playEndSound() {
  playTone(330, 0.12, "triangle", 0.2);
  window.setTimeout(() => playTone(196, 0.16, "triangle", 0.18), 140);
}
