# 大腦糾察隊：暴走分公司 v2 — Claude Code 實作指示

## 任務說明
從現有網站 `https://zhshie.github.io/type2-squad/` 的 source code 進行大幅修改，
製作全新的社畜版互動網站。原始 HTML 已在本資料夾中 (`index_original_reference.html` 供參考)。
最終輸出檔案命名為：`大腦糾察隊_v2.html`，放在本資料夾。

---

## 一、設計風格：Sanofi C 風格（品牌紫白）

### CSS 變數覆蓋（取代原本暗色主題）
```css
:root {
  --bg: #f7f3fb;
  --surface: #ffffff;
  --surface2: #f0eaf8;
  --accent: #7B2D8B;       /* Sanofi 品牌紫 */
  --accent2: #9B4EA8;
  --accent-pale: #f0e8f5;
  --text: #1a1020;
  --text-dim: #6b5c7a;
  --border: #ddd0ea;
  --D: #cc2244;
  --I: #dd8800;
  --S: #228855;
  --C: #1155bb;
  --shadow: 0 2px 12px rgba(123,45,139,.1);
}
body { background: var(--bg); color: var(--text); }
```

### Logo
- `<img src="sanofi_logo.png">` 置於開場畫面頂部（已在同資料夾）
- 加 `onerror` fallback：顯示文字 `sanofi`（紫色粗體）

### 粒子背景
- 保留原 canvas particle 動畫，顏色改為 `rgba(123,45,139,0.12)` 紫色，線條 `rgba(123,45,139,0.05)`

---

## 二、全螢幕結構（共 9 幕）

```
screen-intro      → Sanofi 開場 + 社畜版故事
screen-scene      → 場景題目（reuse，共5場景）
screen-review     → 年度績效檢討（血條動畫）
screen-personality → 職場人格揭曉
screen-compat     → 最速配配對（NEW）
screen-edu        → 衛教說明
screen-treatment  → 治療選擇題（NEW，非計分）
screen-share      → 社群分享卡
screen-admin      → 後台儀表板（密碼保護）
```

---

## 三、社畜版內容（完整取代原本身體城市版）

### 開場畫面 (screen-intro)
```
標題：大腦糾察隊
副標：暴走分公司 ｜ 職場人格測驗

小哨台詞：
「總監！總監你終於來了！」
「歡迎來到人體總公司 (Human Corp.)。我是你的專屬特助，代號 ILC2，你可以叫我小哨。」
「你是總部剛空降的『危機處理總監』。你的任務很簡單：在每一個部門的危機現場，做出你的管理決策。」
「在這裡沒有絕對的標準答案。我只是想看看......你是哪一種主管。」
「最近我們公司簡直是一團亂——四個重要部門相繼爆發經營危機，基層員工全在暴走，原因不明。」

按鈕：「進入人體總公司 →」
```

### 場景一｜公關部大門（皮膚屏障）
```
badge: 場景一
dept: 公關部大門｜皮膚屏障
title: 街頭混混在砸大門了

情境：深夜。總公司最氣派的公關部大門（皮膚屏障）。幾名街頭混混（塵蟎），在牆壁的微小裂縫上亂塞垃圾，拿鑿子破壞牆壁。

小哨台詞：
「總監，公關部大門回報：發現幾個街頭混混在破壞牆壁。目前規模不大，但免疫細胞警衛隊覺得這是在挑釁，正準備抄傢伙把整面牆給拆了來抓人。」
「您會怎麼下令？」

選項：
A | disc:S | hp:-5 | type:ext
  主文：「優先派泥水匠把牆壁的裂縫補起來，並阻止更多混混溜進來塗鴉。」
  副文：「門面最重要。先補牆好了，進來的幾個小毛賊就算了。」
  結算：牆壁裂縫被及時修補。混混進不來覺得無趣就走了，公司沒什麼感覺。但已經溜進來的幾個人在角落留下了塗鴉，成為礙眼的污漬。（外敵留存）

B | disc:C | hp:-3 | type:zero
  主文：「評估塗鴉範圍，派幾名清潔工精準清除污漬，同時修補裂縫。」
  副文：「弄清楚狀況再行動。人力不能浪費，也不能破壞公物。」
  結算：精準派人清除塗鴉並修補裂縫。過程安靜有效，公司毫無不適。（輕微發炎反應）

C | disc:D | hp:-12 | type:ff
  主文：「立刻下令警衛隊帶著大鐵鎚衝出去，把混混連同那面牆一起砸爛！」
  副文：「絕不妥協！有威脅就強力清除，速度與威嚇力最重要。」
  結算：警衛隊成功趕走混混，但強力破壞讓公司大門變得坑坑疤疤、殘破不堪，還引發了嚴重的紅腫發熱。這就是「異位性皮膚炎」的職場慘況。（友軍誤傷）

D | disc:I | hp:-8 | type:ff
  主文：「廣播全棟大樓，讓所有部門的警衛都到一樓大廳進入備戰狀態。」
  副文：「讓所有人都知道這件事。全體動員，比單獨行動更安全。」
  結算：廣播一出，大批警衛擠在門口。混混被嚇跑了，但大門口長期處於高度緊張的擠迫狀態，讓公司門面微微發熱、發癢。（過度動員）
```

### 場景二｜鼻腔大廳收發室（過敏性鼻炎）
```
badge: 場景二
dept: 收發室｜鼻腔黏膜
title: 廣告傳單淹沒收發室

情境：週一早晨，大廳收發室。成千上萬張的無用廣告傳單（花粉）像雪片般湧入，收發室員工崩潰中。

小哨台詞：
「總監，收發室被廣告傳單淹沒了！員工抱怨最近傳單太多，他們為了不讓傳單進來，正打算用大量的膠帶（鼻涕）把收發室的大門徹底堵死。」
「您會怎麼下令？」

選項：
A | disc:S | hp:-5 | type:ext
  主文：「查閱去年的收發紀錄，確認這些傳單的威脅等級後，再決定是否封住門。」
  副文：「凡事看數據。先確認這是不是去年的惡意攻擊再決定。」
  結算：歷史紀錄顯示去年有過危險包裹，導致員工過度反應。傳單雖被壓制，但收發室還是堆滿了防撞氣泡紙，導致正常客戶進不來，公司運作微幅受阻。（記憶過敏觸發）

B | disc:I | hp:-8 | type:ff
  主文：「讓大廳進入全面警戒，所有行政人員放下手邊工作，一起來碎紙。」
  副文：「大家一起應對，人多力量大。全體進入作戰狀態！」
  結算：全體警戒有效阻擋了傳單，但收發室持續處於高度敏感狀態，員工時不時就亂按警鈴，讓公司烏煙瘴氣。（持續過度動員）

C | disc:C | hp:-3 | type:zero
  主文：「在門口設立專屬過濾閘門，精準攔截傳單，讓重要信件正常通行。」
  副文：「先守住陣地並分類，比盲目封門或主動出擊更有把握。」
  結算：過濾閘門攔截了大部分傳單。過程沒有引發恐慌，正常業務很快恢復。（輕微防線反應）

D | disc:D | hp:-12 | type:ff
  主文：「衝出大樓，把派報生全部過肩摔驅逐，不讓任何一張傳單靠近。」
  副文：「容不得猶豫。從源頭徹底清除，一張都不能放過！」
  結算：員工衝出去打群架，傳單沒了，但整個一樓大廳被搞得天翻地覆，員工噴嚏連連、鼻水狂流，氣泡紙（鼻息肉）塞滿了大門。這就是「慢性鼻竇炎合併鼻息肉」。（友軍誤傷）
```

### 場景三｜空調機房（氣喘）
```
badge: 場景三
dept: 空調機房｜支氣管
title: 機房主管要切斷通風管

情境：地下室的空調總機房。感測器亮起微弱的黃燈，因為吸入了一些外面的灰塵與貓毛。神經質的機房主管正把手放在「緊急封閉閥」上。

小哨台詞：
「總監，機房偵測到貓毛微粒！神經質的機房主管嚇壞了，他正準備切斷所有通風管，把管道縮到最窄（支氣管收縮）。如果這樣做，整棟大樓的員工都會喘不過氣啊！」
「您會怎麼下令？」

選項：
A | disc:I | hp:-8 | type:ff
  主文：「調高全棟大樓的感測器靈敏度，讓每一個出風口都隨時回報狀況。」
  副文：「資訊就是力量。掌握全局的灰塵動態，才能做出判斷。」
  結算：靈敏度調高後，整個機房進入長時間的「備戰模式」，一點點風吹草動就引發警報，讓員工每天都覺得胸口悶悶的。（廣泛過度敏感）

B | disc:S | hp:-5 | type:ext
  主文：「強制鎖死通風管的閥門不准關閉，優先確保整棟大樓的呼吸與運作。」
  副文：「無論如何，公司的氣管必須保持暢通。先穩住呼吸再說。」
  結算：管道沒有縮小，大家還能呼吸。但貓毛仍在管線裡飄蕩，持續刺激著感測器，引發輕度的警報噪音。（未清除）

C | disc:C | hp:-3 | type:zero
  主文：「分析貓毛微粒的濃度，派幾名清潔人員帶著吸塵器去清理濾網就好。」
  副文：「威脅有多大，反應就有多大。不浪費資源，也不過度恐慌。」
  結算：精準調派了清潔工。管線保持暢通，員工只感到短暫的喉嚨癢，隨即恢復正常。（精準清除）

D | disc:D | hp:-12 | type:ff
  主文：「派出全副武裝的重裝消毒部隊爬進通風管，噴灑強力化學藥劑清場！」
  副文：「不留任何隱患。把氣管徹底消毒，才能從根本解決問題。」
  結算：重裝部隊擠進通風管，貓毛沒了，但管壁被消毒水和部隊擠得嚴重腫脹發炎。整棟樓發出狂喘的咻咻聲，這就是「氣喘」的職場悲劇。（氣管嗜酸球浸潤）
```

### 場景四｜員工餐廳（嗜酸性食道炎）
```
badge: 場景四
dept: 員工餐廳走廊｜食道
title: 一批麵粉讓稽查員炸了

情境：中午時分，員工餐廳的地下運送走廊。一批普通的麵粉（小麥蛋白）剛剛送達。

小哨台詞：
「總監不好了！餐廳進了一批麵粉，但資深稽查員（記憶B細胞）想起以前好像有人對這批貨客訴過。他現在急到跳腳，已經呼叫大批安管人員（嗜酸性球）準備封鎖走廊了！」
「您會怎麼下令？」

選項：
A | disc:D | hp:-12 | type:ff
  主文：「寧可錯殺不可放過！立刻讓安管部隊沒收並銷毀這批麵粉。」
  副文：「既然稽查員說有風險，就主動出手，絕不讓它進廚房。」
  結算：大批暴力安管人員湧入走廊，麵粉被砸爛了，但走廊也被安管擠得水洩不通、嚴重腫脹。現在連一口飯都送不過去，這就是「嗜酸性食道炎」。（嗜酸球浸潤）

B | disc:I | hp:-8 | type:ff
  主文：「廣播通知整條走廊的員工進入高度警戒，大家一起盯著麵粉推車。」
  副文：「發出警告，讓大家都知道。全員緊盯，比單獨行動更穩。」
  結算：走廊進入警戒，雖然麵粉沒事，但整條餐廳通道處於過度敏感狀態，員工走過去都覺得緊繃悶痛。（食道過度活化）

C | disc:C | hp:-3 | type:zero
  主文：「查驗這批麵粉的成分與劑量，規劃一條專屬安全通道讓它送達。」
  副文：「不是有過紀錄就一定要攔截。找到最安全的通行方式才是上策。」
  結算：精準放行，麵粉安全通過，走廊幾乎沒有被活化，大家安然吃午餐。（最低干預）

D | disc:S | hp:-5 | type:ext
  主文：「調出十年前的完整客訴紀錄，因為害怕再次出包，下令產線暫停。」
  副文：「經驗是最好的武器。既然以前出過事，現在就先停機再說。」
  結算：因為過度依賴舊的客訴記憶，稽查員對無害的麵粉產生了過激反應。走廊員工感到緊繃、輕微灼熱。（記憶過敏反應）
```

### 場景五｜總裁辦公室（大揭露）
```
badge: 場景五
dept: 總裁辦公室｜大揭露
title: 四份報告指向同一個 Bug
isReveal: true（特殊樣式：深紫色系，更緊張的配樂）

情境：總裁辦公室。桌上攤開著四個部門（大門、收發室、機房、餐廳）的災情報告。

小哨台詞（多段，逐步展開）：
「總監，四個部門的危機都處理完了。但……有份機密文件必須讓您過目。」
【動畫：四份報告連線，指向「IL-4/IL-13/IL-5 指令」節點】
「發現了嗎？這四個部門遇到的敵人（塗鴉、傳單、灰塵、麵粉）雖然不一樣……但員工們抓狂的方式，卻完全如出一轍！」
「這些混亂背後，有一個共同的幕後推手。這不是外敵太強，而是我們公司的內部發布了錯誤的『過度防禦指令』，點燃了整棟大樓的戰火。」
「這個錯誤的企業文化，在醫學上被稱為——第二型發炎反應 (Type 2 Inflammation)。」
「現在您知道真相了。身為總監，您的下一步會是什麼？」

選項：
A | disc:I | hp:-5 | type:ff
  主文：「把這份機密報告群發給全公司，讓所有員工都知道這個底層 Bug！」
  副文：「這麼重要的事應該讓大家都知道。一起理解才能一起改變。」
  結算：消息在公司廣泛傳遞，各部門都接收到了警示。整體意識提升了——但大規模的訊號傳遞本身也帶來了輕度的全身性發炎反應。（訊號過載）

B | disc:D | hp:-8 | type:ff
  主文：「直接殺去伺服器機房，強制刪除「IL-4/IL-13/IL-5」這份異常指令！」
  副文：「既然找到禍首，就直接消滅它！立刻行動！」
  結算：行動計畫迅速啟動，針對核心的壓制措施立即執行。效果明顯，但在全面理解機制之前就介入，有幾個細節沒有掌握到，造成了一些不必要的副作用。（資訊不完整的行動代價）

C | disc:C | hp:0 | type:zero
  主文：「仔細研讀這份發炎指令的運作邏輯，尋找系統中最精準的介入點。」
  副文：「了解得越深，行動就越準確。做對的事，比做快的事重要。」
  結算：深入理解了整條第二型發炎路徑——IL-33 → ILC2 → Th2 → IL-4/IL-5/IL-13 → 各器官效應。這份理解讓你找到了最精準的介入點，也明白為什麼這四個疾病可以用同一個策略面對。（精準洞察，+0 HP）

D | disc:S | hp:-3 | type:ext
  主文：「建立一套長期的員工情緒監控系統，確保大家以後不會再暴走。」
  副文：「解決眼前不夠。要讓失控不再發生，需要長期的穩定機制。」
  結算：長期監控系統開始建置，數據持續累積。這是最穩健的策略——但在系統完成之前，這段空窗期裡，發炎核心沒有受到任何主動的管理。（執行時間差）
```

---

## 四、職場人格揭曉（DISC × 社畜版）

### 計分規則
- 5題各記一票 disc type
- 最多票者 = 人格類型；平手取場景五選擇

### D型｜暴走安管主管（嗜酸性球）
```
emoji: ⚡
color: var(--D) = #cc2244
discLabel: DISC D型：主導型（Dominance）
quote: 「您的本能，是砸爛問題，連同牆壁一起。」
desc: 您的行動力極強，喜歡直球對決。危機來了就要處理，不能等、不能拖。但在過敏情境下，您為了消滅小威脅（如過敏原），不惜讓組織受損——這就是嗜酸性球引發氣管變厚、皮膚損傷的原因。
bioTitle: 您在人體總公司的角色：嗜酸性球 (Eosinophil)
bio: 嗜酸性球是第二型免疫的前線戰士，在IL-5的指令下大量增生，攜帶強力攻擊蛋白（MBP、ECP）直搗威脅。他們是對付寄生蟲最有效的武器——但在過敏情境下，同樣的攻擊力會轉向自身的組織，造成氣道壁增厚、食道發炎、皮膚損傷。
strength: 果決、行動力強、危機中讓人安心
challenge: 學習在「做得快」和「做得對」之間找到平衡
```

### I型｜恐慌廣播員（ILC2細胞）
```
emoji: 📢
color: var(--I) = #dd8800
discLabel: DISC I型：影響型（Influence）
quote: 「您的本能，是拿大聲公讓全公司一起焦慮。」
desc: 您是團隊的警報器（ILC2）。只要偵測到危險，您就會立刻釋放大量訊號（IL-4, IL-5, IL-13）動員全身。您的號召力很強，但廣播往往讓系統過度激活，警戒解除了身體卻還在發炎。
bioTitle: 您在人體總公司的角色：ILC2細胞
bio: ILC2是第二型免疫反應的「第一聲警報」。它不需要抗原的精準匹配，只要偵測到危險訊號（IL-33、TSLP、IL-25），就立刻活化，迅速釋放大量IL-4、IL-5、IL-13，把整個第二型免疫系統動員起來。它是速度最快的通報者，但它的廣播有時讓系統過度激活。
strength: 感染力強、能快速凝聚共識、在混亂中帶來方向感
challenge: 學習在「動員大家」和「讓大家適時停下來」之間取得平衡
```

### S型｜創傷守舊派（記憶B細胞）
```
emoji: 🛡️
color: var(--S) = #228855
discLabel: DISC S型：穩健型（Steadiness）
quote: 「您的本能，是抱著十年前的客訴單瑟瑟發抖。」
desc: 您非常依賴過去的經驗（IgE記憶）。這套機制對付寄生蟲很有用，但在過敏反應中，您讓身體對無害的物質（如塵蟎、花粉）產生了不必要的強烈防禦。您守成有餘、創新不足。
bioTitle: 您在人體總公司的角色：記憶B細胞 (Memory B Cell)
bio: 記憶B細胞在第一次接觸過敏原後會長期存活，下次再遇到同樣的抗原時，迅速大量分泌IgE抗體。IgE與肥大細胞和嗜酸球上的受體結合，是過敏反應的關鍵觸發器。這套機制讓免疫系統對已知的寄生蟲威脅反應極快——但在過敏的情境下，同樣的記憶讓身體對無害的物質也產生了強烈反應。
strength: 可靠、對熟悉情境反應快、讓人有安全感
challenge: 學習區分「過去的威脅」和「現在的實際狀況」是否真的一樣
```

### C型｜精準協調大師（Th2細胞）
```
emoji: 🔬
color: var(--C) = #1155bb
discLabel: DISC C型：謹慎型（Conscientiousness）
quote: 「您的本能，是先寫完 SOP 再來處理危機。」
desc: 您是第二型免疫反應的總協調者（Th2）。您精準調控每一次的反應規模，但當您的訊號失控時，您就是整個公司陷入慢性發炎與過敏的源頭。做對的事比做快的事更重要——但有時候分析太久，行動太晚。
bioTitle: 您在人體總公司的角色：Th2細胞
bio: Th2細胞是第二型免疫反應的總協調者。它整合來自ILC2、樹突細胞的訊號，分泌IL-4（促進IgE生產）、IL-5（活化嗜酸球）和IL-13（強化屏障反應），精準調控整個第二型反應的規模與方向。Th2決定了「反應要多強」——當它的訊號過度時，就是過敏和慢性發炎的源頭。
strength: 精準、系統性思考、對身體造成的損耗最低
challenge: 學習在「分析清楚」和「及時採取行動」之間找到節奏
```

---

## 五、最速配（screen-compat）— 新增畫面

### 邏輯
人格揭曉後，顯示3個其他類型的卡片，使用者點擊其中一個查看速配說明。

### 速配對照（基於 DISC DI⟷SC 互補原則）
```javascript
const COMPAT = {
  D: {
    best: 'C',
    others: ['I', 'S'],
    reason: {
      C: 'D衝鋒陷陣，C補上精準和SOP。你打得快，C讓打得準。兩者合體才是完整的免疫應對。在身體裡，嗜酸球的火力需要Th2的精準調控才不會傷到自己。',
      I: 'D和I都是行動派，你們在一起場面很熱鬧——但沒有人煞車，容易過激。身體裡，兩種細胞同時全力啟動往往是過敏最嚴重的時候。',
      S: 'D的衝勁配上S的穩健，短期內互補。但S的記憶導向和D的行動導向在長期會產生摩擦。'
    }
  },
  I: {
    best: 'S',
    others: ['C', 'D'],
    reason: {
      S: 'I熱情廣播，S穩住現場。你點燃動能，S讓反應持續而不失控。在身體裡，ILC2發出警報後，記憶B細胞的長期記憶讓防禦有持續性——不過要小心記憶過敏。',
      C: 'I的熱情加上C的分析，是很好的搭配——只要I願意等C分析完再行動。身體裡，ILC2的快速動員配合Th2的精準調控，是健康免疫反應的理想模式。',
      D: 'I和D在一起火花四射，但都太衝——沒有穩健的後盾，容易燃燒殆盡。'
    }
  },
  S: {
    best: 'I',
    others: ['C', 'D'],
    reason: {
      I: 'S守成，I開拓。你穩健保守，I帶來突破和活力。一個走得穩，一個走得快，剛好互補。在身體裡，記憶B細胞的長期保護加上ILC2的快速動員，才是完整防線。',
      C: 'S和C都是謹慎派，你們很合拍——但兩個人都不愛主動出擊，遇到真正需要行動的時候可能都在分析。',
      D: 'S需要D偶爾來打破保守的慣性，讓系統不會因為過度依賴舊記憶而失靈。'
    }
  },
  C: {
    best: 'D',
    others: ['I', 'S'],
    reason: {
      D: 'C分析完了卻遲遲不動，D給執行力。你想清楚，D幫你打出去。在身體裡，Th2精準調控的指令，需要嗜酸球這樣的執行者才能真正發揮作用。',
      I: 'C的精準加上I的熱情，C提供策略，I帶來動員。只要C能容忍I的衝動，這是很有效的組合。',
      S: 'C和S都是謹慎型，彼此理解——但兩者一起可能讓決策過於緩慢，需要注入一點行動力。'
    }
  }
};
```

### 畫面設計
- 頂部：「[類型名稱]，你最缺身邊有一個……」
- 3個卡片橫排（各帶 emoji、DISC 型標籤、細胞名稱）
- 點擊卡片展開說明文字
- 「最速配」標籤在第一個（best）卡片上
- 按鈕：「了解第二型發炎的故事 →」進入衛教

---

## 六、衛教說明（screen-edu）
保留原本衛教內容，但改為社畜版語言：
```
「總監，剛才的四個部門危機，其實模擬了四種不同的疾病，但它們都是同一場火在不同地方的表現：」

公關部（皮膚）→ 異位性皮膚炎
收發室（鼻腔）→ 慢性鼻竇炎合併鼻息肉
空調機房（肺部）→ 氣喘
員工餐廳（食道）→ 嗜酸性食道炎

「因為這些疾病的根源都來自同一條發炎路徑，針對這個核心（IL-4/IL-13/IL-5）進行調節，
就有機會同時改善不同器官的症狀——這叫做『共病同治：一把鑰匙，開多扇門』。」
```
保留原本路徑圖 (pw-node 結構)。

按鈕：「最後一題 →」進入治療選擇

---

## 七、治療選擇題（screen-treatment）— 新增畫面

### 非計分題，無血條影響
```
顯示標籤：「非評分題」（橘色 badge）

問題：「如果你或身邊的人有這類第二型發炎疾病，第一步你會怎麼做？」

選項（2×2 格狀）：
A：觀察看看，先相信身體自己調節
B：使用傳統藥物（類固醇、抗組織胺）控制症狀
C：詢問醫師是否有針對發炎根源的新型療法  ← 高亮顯示（Sanofi 紫色）
D：主動搜尋最新治療資訊，帶著資料去看診
```

### 選擇後顯示治療說明 overlay（所有選項都觸發同一個說明）
```
標題：「現在的治療選擇」

說明文字：
傳統藥物（症狀治療）
• 類固醇：減緩發炎反應，但長期使用有副作用
• 抗組織胺：減輕過敏症狀，不針對根源
• 支氣管擴張劑：緩解氣喘發作

新型生物製劑（針對根源）
• Dupixent®（dupilumab）：Sanofi 研發的全人源單株抗體，
  抑制 IL-4Rα 訊號，同時阻斷 IL-4 和 IL-13 兩條路徑。
  已獲批准適應症（依各地核准情況）：
  異位性皮膚炎 · 氣喘 · 慢性鼻竇炎合併鼻息肉 · 嗜酸性食道炎
• 原理：針對本次遊戲揭露的「IL-4/IL-13 共同根源」，
  「一把鑰匙，開多扇門」

⚠️ 如有相關症狀，請諮詢您的醫師，了解適合您的治療選擇。

按鈕：「了解更多，請諮詢醫師 →」（可連結至 Sanofi 官網，或留空）
按鈕：「查看我的結果 →」進入分享畫面
```

---

## 八、分享卡（screen-share）

### Canvas 生成圖片
畫布尺寸：540 × 960 px（2× retina，顯示為 270×480）

```
背景：線性漸層 #7B2D8B → #4a1060
上方：sanofi logo（白色文字版，或直接寫 "sanofi"）
中央大字：emoji + 人格名稱
副文：「人體總公司的 [細胞名稱]（DISC [X] 型）」
血量：「公司最終健康度 [HP] / 100」
底部 hashtags：#大腦糾察隊 #暴走分公司 #第二型發炎
```

### 分享按鈕
- IG：觸發 canvas.toBlob() → 下載圖片（提示用戶手動上傳至 IG）
- FB：`window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href))`
- LINE：`window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(location.href))`
- 複製連結：`navigator.clipboard.writeText(location.href)`
- 若有 Web Share API：直接觸發系統分享

---

## 九、音樂系統（Web Audio API）

### 三種音樂模式
```javascript
// 場景 1–4：辦公室緊張節拍
function playTenseMusic(ctx) {
  // 穩定的節拍 BPM 120
  // kick: 低頻下降 120→40 Hz
  // hi-hat: buffer noise 0.04s
  // 背景 pad: [220, 277, 330] Hz, 0.04 gain
  // 每 500ms 循環
}

// 場景 5：更緊張版（場景切換時呼叫）
function playIntenseMusic(ctx) {
  // 更快 BPM 150
  // 加入不和諧音程 [220, 293, 370] Hz（增加緊張感）
  // 加入高頻 tick: 880 Hz
  // 增益提高約 30%
}

// 場景 5 後（review, personality, compat, edu, treatment, share）：放鬆版
function playRelaxMusic(ctx) {
  // 緩慢和弦進行 BPM 60
  // 柔和的 sine waves: [196, 247, 294, 349] Hz, gain 0.03
  // 每 2 秒換和弦
  // 加入輕微的低頻 drone
}
```

### 切換時機
```
開場 → startGame() → playTenseMusic()
進入場景 5 → renderScene() 偵測 id===5 → playIntenseMusic()
nextScene() 完成第5場景 → playRelaxMusic()（此後一直維持）
```

### 靜音按鈕
- 固定在右上角：`position:fixed; top:12px; right:12px; z-index:999`
- 切換 AudioContext.suspend() / resume()
- 樣式：小圓形白底紫色按鈕，🔊 / 🔇 icon

---

## 十、血條動畫（screen-review）

### 動畫邏輯
```
標題：「年度績效檢討」
小哨台詞：「好了，總監。在您看最終考核之前，讓我們回頭看看，您的每一個決定，讓公司付出了什麼代價。」

每張卡片：
1. 延遲 n × 600ms 後滑入（slideIn animation）
2. 滑入後 300ms，血條 bar-fill 從 0 動態增長到目標寬度（1.1s ease transition）
3. HP 數字計數動畫（從0跳到目標值）
4. 顏色：
   - type:'ff'（友軍誤傷）→ #ffa040（橘色）
   - type:'ext'（外敵突破）→ #ff5555（紅色）
   - type:'zero'（±0）→ #44cc88（綠色）

最終血條：
- 所有卡片播完後延遲 400ms 顯示
- 大型進度條從 0 動態增長到 G.hp%
- 數字滾動效果（requestAnimationFrame 計數器）
```

---

## 十一、Google Sheets 串接

### 常數設定
```javascript
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE'; // 部署後替換
const SHEET_ID = '1JSMmSQlf6YRRIVPymAnW-UHOyxcEuy74hQS2k4h6G-g';
```

### 資料寫入（遊戲結束時呼叫）
```javascript
function submitToSheets(data) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('YOUR_')) {
    // fallback: localStorage
    const arr = JSON.parse(localStorage.getItem('sanofi_responses') || '[]');
    arr.push({...data, time: new Date().toISOString()});
    localStorage.setItem('sanofi_responses', JSON.stringify(arr));
    return;
  }
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  }).catch(console.error);
}

// 呼叫時機：治療題選擇後 / 分享畫面載入時
submitToSheets({
  disc: G.pType,
  nickname: PERSONAS[G.pType].name,
  s1: G.choices[0]?.chosen.label,
  s2: G.choices[1]?.chosen.label,
  s3: G.choices[2]?.chosen.label,
  s4: G.choices[3]?.chosen.label,
  s5: G.choices[4]?.chosen.label,
  hp: G.hp,
  treatment: G.treatmentChoice,
  share: null, // 更新於分享時
  device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
});
```

---

## 十二、Admin 後台（screen-admin）

### 進入方式
1. URL 參數：`?admin=true` → 顯示密碼輸入框
2. 或在分享畫面 logo 上快速點擊 5 次

### 密碼
```
Sanofi
```

### 顯示內容（從 localStorage 讀取 + 可選 Sheets API）
```
統計卡片（2×2）：
- 完成人數
- 分享次數
- 平均血量
- 最常見 DISC 型

DISC 型分佈長條圖（Chart.js 或手刻 SVG）

各場景選項熱圖（5 × 4 表格，顯示各選項選擇百分比）

治療選擇分佈（A/B/C/D 各百分比）

最新 10 筆記錄表格（時間、DISC型、HP、治療選擇）

「匯出 CSV」按鈕（從 localStorage 或 Sheets API）
```

---

## 十三、Apps Script 程式碼（附上在 HTML 開頭 comment 中）

```javascript
// === 貼到 Google Apps Script → 部署為網路應用程式 ===
const SHEET_ID = '1JSMmSQlf6YRRIVPymAnW-UHOyxcEuy74hQS2k4h6G-g';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName('responses');
    if (!sh) {
      sh = ss.insertSheet('responses');
      sh.appendRow(['時間','DISC型','職場暱稱','場景1','場景2','場景3','場景4','場景5','最終HP','治療選擇','分享平台','裝置']);
    }
    const d = JSON.parse(e.postData.contents);
    sh.appendRow([new Date(),d.disc,d.nickname,d.s1,d.s2,d.s3,d.s4,d.s5,d.hp,d.treatment,d.share,d.device]);
    return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error',msg:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  if (e.parameter.pw !== 'Sanofi')
    return ContentService.createTextOutput(JSON.stringify({error:'unauthorized'})).setMimeType(ContentService.MimeType.JSON);
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName('responses');
  if (!sh) return ContentService.createTextOutput(JSON.stringify({rows:[]})).setMimeType(ContentService.MimeType.JSON);
  const data = sh.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify({rows:data})).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 十四、注意事項

1. **Logo 路徑**：`src="sanofi_logo.png"`，加 onerror fallback 顯示文字 "sanofi"
2. **字體**：保留 Noto Sans TC Google Fonts
3. **行動版優先**：max-width 680px，所有 options grid 在小螢幕為 1 列
4. **選項排列**：電腦版 2×2 grid（grid-template-columns: 1fr 1fr），手機版改 1 列
5. **Apps Script URL 替換**：APPS_SCRIPT_URL 常數置於 JS 頂部，清楚標示需替換
6. **血條不在遊戲中顯示**：只在 review screen 揭曉
7. **場景5 深色樣式**：badge 用深紫 #4a1060，topbar 用 #4a1060，搭配緊張配樂
8. **最終輸出**：單一 .html 檔案，所有 CSS/JS inline，可離線執行

---

## 參考檔案（同資料夾）
- `遊戲腳本 v2.0 (社畜版).docx` — 完整社畜版腳本原文
- `sanofi_logo.png` — Sanofi Logo 圖片
- `Type2_Game_Script_v2.md` — v2 設計腳本（英文參考版）
