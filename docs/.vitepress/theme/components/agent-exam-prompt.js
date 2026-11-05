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
  return `請使用 learningPages 公開題庫替我製作模擬考。\n\n先讀取公開出題指引並依流程執行：\n${AGENT_GUIDE_URL}\n\n我的需求：\n- 科目：${subject}\n- 範圍：${request.scope.trim()}\n- 題數：${Number(request.count)} 題\n- 作答時間：${Number(request.minutes)} 分鐘\n- 題型：${type}（${request.type}）\n\n請核對公開索引與原題，回覆一個跨頁組卷連結、簡短題單與教材來源，預設不揭露答案。候選題不足時先告知，不自行擴大範圍或編造題目。若無法讀取指引、索引或原題，請說明限制；未執行畫面驗證時，不宣稱已驗證實際載入。`
}
