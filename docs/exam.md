---
title: 指定題目練習
sidebar: false
aside: false
pageClass: exam-page
---

<script setup>
import './.vitepress/theme/exam.css'
import { withBase } from 'vitepress'
import QuestionExam from './.vitepress/theme/components/QuestionExam.vue'
</script>

<header class="exam-masthead">
  <div class="exam-masthead-main">
    <span class="exam-slug">EXAM SHEET · CUSTOM SELECTION</span>
    <h1 class="exam-title">指定題目練習</h1>
    <p class="exam-lead">依網址參數或指定題號即時組卷，支援跨章節與跨科目混合作答，作答進度與原題紀錄同步。</p>
  </div>
  <nav class="exam-masthead-nav" aria-label="組卷相關頁面">
    <a class="exam-nav-chip" :href="withBase('/agent-exam.html')">← 讓我的 Agent 找相似題</a>
    <a class="exam-nav-link" :href="withBase('/question-index.html')">公開題目索引</a>
    <a class="exam-nav-link" :href="withBase('/question-links.html')">網址選題說明</a>
  </nav>
</header>

<QuestionExam />
