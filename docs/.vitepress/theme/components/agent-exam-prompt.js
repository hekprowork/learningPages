export const AGENT_GUIDE_URL = 'https://hekprowork.github.io/learningPages/agent-guide.txt'
export const SUBJECT_OPTIONS = [
  { value: 'circuits', label: '電路學' },
  { value: 'electronics', label: '電子學' },
  { value: 'engineering-math', label: '工程數學' },
  { value: 'solid-state', label: '固態電子導論' },
  { value: 'mixed', label: '跨科（在範圍中指定）' }
]
export const TYPE_OPTIONS = [
  { value: 'all', label: '全部題型' },
  { value: 'example,practice', label: '範例與練習' },
  { value: 'example', label: '範例 Example' },
  { value: 'practice', label: '練習 Practice' },
  { value: 'exercise', label: '習題 Exercise' },
  { value: 'homework', label: '作業 Homework' },
  { value: 'exam', label: '考題 Exam' }
]
export function validateExamRequest(request) {
  return {
    subject: SUBJECT_OPTIONS.some(option => option.value === request.subject) ? '' : '請選擇科目。',
    scope: request.scope.trim() ? '' : '請填寫章節或主題範圍。',
    count: Number.isSafeInteger(Number(request.count)) && Number(request.count) >= 1 && Number(request.count) <= 100 ? '' : '題數請填入 1 到 100 的整數。',
    minutes: Number.isSafeInteger(Number(request.minutes)) && Number(request.minutes) >= 1 && Number(request.minutes) <= 480 ? '' : '時間請填入 1 到 480 分鐘的整數。',
    type: TYPE_OPTIONS.some(option => option.value === request.type) ? '' : '請選擇題型。'
  }
}
export function buildAgentExamPrompt(request) {
  if (Object.values(validateExamRequest(request)).some(Boolean)) throw new Error('請修正出題需求。')
  const subject = SUBJECT_OPTIONS.find(option => option.value === request.subject).label
  const type = TYPE_OPTIONS.find(option => option.value === request.type).label
  return `請使用 learningPages 公開題庫替我製作模擬考。\n\n若能讀取網址，先讀任一版本的公開出題指引：\nhttps://hekprowork.github.io/learningPages/agent-guide.html\n${AGENT_GUIDE_URL}\n\n我的需求：\n- 科目：${subject}\n- 範圍：${request.scope.trim()}\n- 題數：${Number(request.count)} 題\n- 作答時間：${Number(request.minutes)} 分鐘\n- 題型：${type}（${request.type}）\n\n原題讀取目錄：https://hekprowork.github.io/learningPages/question-reader/index.html\n請先依科目章節開啟本站單題 HTML 核對原題，一般出題無需操作 GitHub。\n公開索引入口：https://hekprowork.github.io/learningPages/question-index.html\nJSON 與 SHA-256 都不是必要步驟；工具讀不到 JSON 時，改從 HTML 索引頁取得版本與 TSV 連結。\n\n組卷連結格式（必須遵守）：\n- 使用 https://hekprowork.github.io/learningPages/exam.html?ids=ID1,ID2，依題單順序以逗號分隔已核對的題目 ID。\n- ? 是查詢參數起點，= 是參數名稱與值的分隔符；必須保留原字元，不可將 ?ids= 寫成 %3Fids%3D。\n- 不可對整段網址或 exam.html?ids=... 使用 encodeURIComponent；若需編碼，只編碼參數值，再接回保留 ?ids= 的網址。\n- 正確範例：https://hekprowork.github.io/learningPages/exam.html?ids=ch4-ex-4-3,ch4-pr6\n- 錯誤範例：https://hekprowork.github.io/learningPages/exam.html%3Fids%3Dch4-ex-4-3,ch4-pr6\n- 請用 Markdown 可點擊連結交付，連結目標須保留 exam.html?ids=；不得只有顯示文字正確、實際目標卻含 exam.html%3F。\n- 交付前確認 pathname 為 /learningPages/exam.html，讀取 ids 查詢參數後的 ID、順序與題數均符合題單。範例僅示範格式，不代表本次選題。\n\n請核對公開索引與原題，回覆一個跨頁組卷連結、簡短題單與教材來源，預設不揭露答案。候選題不足時先告知，不自行擴大範圍或編造題目。若工具回報整站不可存取，請停止重試並請我到 https://hekprowork.github.io/learningPages/agent-exam.html#offline-mode 複製完整題目 Prompt，必要時附上候選題 PDF；單靠網址無法讓不能連網的模型讀題。未執行畫面驗證時，不宣稱已驗證實際載入。`
}
