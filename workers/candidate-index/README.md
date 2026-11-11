# learningPages 候選題索引 Worker

Worker 從 Pages 發布的 `question-index/<subject>.candidates.json` 讀取題目中繼資料。VitePress 建置後，`scripts/check-exam-render.js` 產生含來源版本、題目路由與 `has_figure` 的科目索引 JSON；每次 Pages 部署都會一起發布。

## Routes

- `GET /prepare?subject=circuits&chapters=1,2&types=example,practice&count=5&minutes=60&candidate_limit=20` 篩選一次候選清單，回傳 JSON、TSV、題數、圖像題數、索引版本與固定 ID 順序的分享網址。省略 `candidate_limit` 時回傳全部符合條件的題目。
- `GET /selection.tsv?subject=circuits&ids=id1,id2` 以指定 ID 和順序回傳 TSV，供 AI 或試算表讀取。既有分享網址格式維持相容。
- `OPTIONS` 回傳跨來源 GET 所需的 CORS 標頭。

索引無法讀取時回傳 502；未知 ID 回傳 404；無效條件回傳 400。頁面在條件改變後預載 `/prepare`，Worker 失效時用本機索引產生可下載 TSV。

## Deploy

從專案根目錄執行 `npx wrangler deploy --config workers/candidate-index/wrangler.toml`。Pages 建置預設使用 `https://learningpages-candidate-index.hekote9.workers.dev`；若部署到其他 Worker 網址，將 GitHub Actions variable `VITE_CANDIDATE_INDEX_ORIGIN` 設為該 origin，然後部署 Pages。

本機可用 `npx wrangler dev --config workers/candidate-index/wrangler.toml` 啟動 Worker，再以 `VITE_CANDIDATE_INDEX_ORIGIN=http://localhost:8787 npm run docs:dev` 啟動網站。Worker 仍讀取已發布的 Pages 索引。
