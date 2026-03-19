# DrumPad MVP Todo

## 目前階段

目前專案在 `Stage 1: 先穩定基底`，而且只完成了一部分。

已經有的東西：
- `default` kit 選擇 state
- 909 sample 載入流程
- 9-pad grid UI
- 點擊 pad 播放聲音
- 部分可編輯 label UI 骨架

還沒站穩的基底：
- pad 資料仍然不是完整的 app state，而是直接從 sample array render
- 沒有明確的 `PadItem` / `LoopData` / transport state
- audio engine 還只是單一 `playback()` helper，沒有排程抽象
- `kit` / `custom` / `builtin` / `user sample` 的資料流還沒建立
- README 還是 Vite 預設內容，專案狀態沒有被文件化

## 狀態總覽

### Stage 1. 穩定基底

- [x] 建立 `KitContextProvider`
- [x] 可載入預設 909 sample
- [x] 可點擊 pad 播放 sample
- [x] 畫出 9-pad 基本版面
- [ ] 把 pad 資料改成正式 React state，而不是直接 `samples.map`
- [ ] 定義 MVP 核心型別：`PadItem`、`RecordedHit`、`LoopData`
- [ ] 建立 pad active / triggered state
- [ ] 建立 BPM state
- [ ] 建立 transport state：`idle | recording | playing`
- [ ] 抽出 audio engine 層，讓 UI 不直接碰 playback 細節
- [ ] 釐清預設 kit 與 custom kit 的 state/data flow

### Stage 2. Sample Upload 與 Persistence

- [ ] 每個 pad 可上傳 `wav/mp3`
- [ ] 驗證檔案格式與錯誤提示
- [ ] 使用者 sample decode 後可播放
- [ ] pad 可指派 builtin 或 user sample
- [ ] `localStorage` 保存目前 kit / pad mapping
- [ ] IndexedDB 保存 user sample blob
- [ ] 頁面載入時 hydrate pad state
- [ ] `sampleId` 可從 IndexedDB 找回 blob 並播放
- [ ] 有任一 pad 被改動時，kit 自動視為 `custom`

### Stage 3. Keyboard Interaction

- [ ] 建立 9 個 pad 的 key mapping
- [ ] `keydown` 觸發 pad
- [ ] 避免長按重複觸發
- [ ] 避免 input focus 時誤觸快捷鍵
- [ ] pad 播放時有 active/pressed 視覺狀態
- [ ] UI 顯示目前 keybind

### Stage 4. Loop Recorder

- [ ] 開始錄音
- [ ] 停止錄音
- [ ] 記錄 `padId + timeMs`
- [ ] 儲存單一 loop layer
- [ ] 播放錄下的 hit sequence
- [ ] 支援 loop 重播
- [ ] 支援 stop / clear

### Stage 5. BPM 對齊與 Timing

- [ ] 建立 BPM input / slider
- [ ] loop 長度固定先用 4/4
- [ ] 錄音時間對齊 beat grid
- [ ] 回放跟 BPM 對齊
- [ ] 視需要加入 metronome
- [ ] 視需要加入簡化 quantize

## 建議下一輪直接做的事

1. 把目前 `sample` 驅動 UI 的方式改成 `pads` state 驅動。
2. 補上正式型別：`PadItem`、`RecordedHit`、`LoopData`、`TransportState`。
3. 建一個最小版 audio engine API，例如 `loadPadSample()`、`triggerPad()`、`stopLoop()`。
4. 讓 `Pad` component 只收資料與事件，不直接持有播放邏輯。
5. 做完上面四項後，再進 sample upload + persistence。

## 現況判斷

如果照這份 MVP 規劃來看，現在進度大概是：

- 基底階段：`35%`
- 整體 MVP：`15%`

原因不是 UI 太少，而是核心資料模型、持久化、鍵盤、錄音、BPM 這些真正決定 MVP 是否成立的部分都還沒開始。
