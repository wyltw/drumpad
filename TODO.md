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
- [ ] kits CRUD
- [ ] 支援單個 pad 上傳自訂 sample
- [ ] pads CRUD
  - [ ] 將 pads 從嵌套在 kit 改為獨立 table（schema migration）
  - [ ] pads table schema：`{ id, kitId, label, sampleName, arrayBuffer, order }`，以 `kitId` 為 FK
  - [ ] 更新 DB 初始化與 seed 邏輯，建立時同步寫入 pads table
  - [ ] 更新 `getKit` 查詢：改為兩次查詢後手動合併（kit + pads where kitId）
  - [ ] 新增 `updatePadLabel(padId, label)` service，直接 patch 單一欄位
  - [ ] 更新 `KitsService` 移除舊的 `updateKitPads`（或保留給 sample 更新用）

## 設計待決策：Kit & Pad CRUD

在動手之前需要想清楚的問題：

**Kit**

- 新 kit 從 default clone，還是從空白開始？空 pad 有意義嗎？
  plus icon然後跳出modal，用戶輸入新的kit name，clone一個default
- kit 的名稱有無限制（唯一性、長度）？
  db已經唯一，取合適長度
- 刪除 kit 時，目前選中的 kit 要怎麼處理？
  選中kit從db刪除，重新選取default
- 建立：+ → modal 輸入名稱 → clone from default → 切換到新 kit
  改名：inline edit，點 kit 名稱變 input，enter 確認，僅非 default 顯示
  刪除：非 default 顯示刪除按鈕，刪後切回 default
  default：永遠唯讀，不可刪、不可改名

**Pad**

- pad 是否永遠屬於某個 kit，不能獨立存在？
- pad 數量固定 9 個，還是可以增減？
- `default` kit 的 pad 唯讀——這個限制要在哪一層保護？

**Default Kit**

- `default` 完全唯讀，還是 label 可以改但 sample 不行？

---

## Later

這些不是不能做，而是現在做很容易變成 over-design：

- [ ] BPM state
- [ ] transport state
- [ ] loop recorder
- [ ] metronome
- [ ] quantize
- [ ] 分層 audio engine API
- [ ] 提前設計完整的 `LoopData` / `RecordedHit` / transport types

## 暫時不要做

下面這些目前先刻意不做，避免為了未來可能需求提前抽象：

- [ ] 不先拆完整 audio engine
- [ ] 不先定一大包還沒用到的 domain types
- [ ] 不先為 loop/BPM 設計 UI 和 state
