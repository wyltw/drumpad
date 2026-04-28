# DrumPad Todo

## 現況

目前已經有：

- kit 選單 state
- 909 samples 載入
- 9-pad UI
- 點擊 pad 播放聲音
- 可編輯 label 的 UI 殼

目前還沒站穩的地方：

- pad 資料還是直接從 samples render，不是 app-level pad state
- label 編輯還沒有真的寫回 pad 資料
- `default` 之外的 kit flow 還是假資料
- audio 播放只有最薄的一層 helper，還談不上 engine

## Now

先做這些，因為它們會直接決定現在這個 MVP 是不是真的成立：

- [x] 把 `samples.map(...)` 改成明確的 `pads` state，讓 pad 成為真正的畫面資料來源
- [x] 讓 label 編輯真的更新 pad state，不只是在 input 裡改 local state
- [x] 定義目前夠用的 pad 資料 shape，只保留現在畫面真的需要的欄位
- [x] 補一個明確的 pad trigger/active 視覺狀態，確認互動有回饋
- [x] 整理 `default` kit 的資料流，避免 select 出現 `banana` 這種尚未支援的選項
- [ ] 補 README 的目前功能與限制，讓「做到哪裡」是清楚的

## Next

這些可以排在基礎站穩之後，但還算合理延伸：

- [x] 鍵盤對應 9 個 pad
- [x] `keydown` 觸發 pad 播放
- [x] 避免長按重複觸發
- [x] 補上目前 keybind 提示
- [x] QWERTY keybind 支援
- [x] 多次觸發動畫同時播放
- [x] kits CRUD
- [x] 支援單個 pad 上傳自訂 sample
- [x] pads CRUD
- [x] master volume 控制
- [x] 個別 pad volume 控制
- ~~個別 pad pan 控制~~
- [x] selectedKit fallback：kit 被刪除後重新整理，應退回 default kit
