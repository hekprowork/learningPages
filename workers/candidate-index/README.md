# learningPages 候選題索引 Worker

出題頁在準備候選題後，會將該批題目 ID 依序編入分享網址。Worker 依 ID 查詢 GitHub Pages 上的科目索引並回傳 TSV。新增題目不影響既有網址的候選範圍。若題目已移除，網址會回傳 404 和缺少的 ID。題目標題與來源等欄位依目前公開索引顯示。

## 部署

1. 從專案根目錄執行 `npx wrangler deploy --config workers/candidate-index/wrangler.toml`，並使用你的 Cloudflare 帳號完成登入。
2. 在 GitHub 倉庫的 Actions variables 設定 `VITE_CANDIDATE_INDEX_ORIGIN`，值為部署顯示的 Worker origin，例如 `https://learningpages-candidate-index.example.workers.dev`。
3. 重新執行 GitHub Pages 部署。在出題頁準備候選題後，複製索引網址並在瀏覽器開啟。將同一網址和「電路學 Chapter 4、Example／Practice、5 題、60 分鐘」交給目標 AI，再把 AI 回傳的 ID 貼回出題頁組卷。

本機可用 `npx wrangler dev --config workers/candidate-index/wrangler.toml` 啟動 Worker，再以 `VITE_CANDIDATE_INDEX_ORIGIN=http://localhost:8787 npm run docs:dev` 啟動出題頁。Worker 從已發布的公開索引讀取資料。
