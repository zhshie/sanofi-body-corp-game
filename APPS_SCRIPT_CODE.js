/**
 * 大腦糾察隊：暴走分公司 v2 — Google Apps Script
 *
 * 部署步驟：
 * 1. 前往 https://script.google.com → 新增專案
 * 2. 貼上此段程式碼，儲存
 * 3. 部署 → 新增部署項目 → 類型：網路應用程式
 *    - 執行者：我
 *    - 存取權：任何人
 * 4. 點擊「部署」，複製部署網址
 * 5. 將部署網址貼到 HTML 檔案的 APPS_SCRIPT_URL 常數
 */

const SHEET_ID = '1JSMmSQlf6YRRIVPymAnW-UHOyxcEuy74hQS2k4h6G-g';
const ADMIN_PW = 'Sanofi';

// ── 接收遊戲資料（POST）──
function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName('responses');

    // 初始化 header（第一次執行時自動建立）
    if (!sh) {
      sh = ss.insertSheet('responses');
      sh.appendRow([
        '時間戳', 'DISC型', '職場人格暱稱',
        '場景1選項', '場景2選項', '場景3選項', '場景4選項', '場景5選項',
        '最終HP', '治療選擇', '分享平台', '裝置類型'
      ]);
      // 凍結標題列
      sh.setFrozenRows(1);
      // 格式化標題
      sh.getRange(1, 1, 1, 12).setBackground('#7B2D8B').setFontColor('#ffffff').setFontWeight('bold');
    }

    const d = JSON.parse(e.postData.contents);
    sh.appendRow([
      new Date(),
      d.disc || '',
      d.nickname || '',
      d.s1 || '', d.s2 || '', d.s3 || '', d.s4 || '', d.s5 || '',
      d.hp || 0,
      d.treatment || '',
      d.share || '',
      d.device || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', msg: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── 讀取統計資料（GET，需密碼）──
function doGet(e) {
  // 密碼驗證
  if (e.parameter.pw !== ADMIN_PW) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName('responses');

    if (!sh || sh.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ rows: [], stats: {} }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 全部資料（含 header）
    const allData = sh.getDataRange().getValues();
    const header = allData[0];
    const rows = allData.slice(1); // 去掉 header

    // 計算統計
    const total = rows.length;
    const discCount = { D: 0, I: 0, S: 0, C: 0 };
    const treatCount = { A: 0, B: 0, C: 0, D: 0 };
    let hpSum = 0;
    let shareCount = 0;

    rows.forEach(row => {
      const disc = row[1];
      if (discCount[disc] !== undefined) discCount[disc]++;
      const hp = parseInt(row[8]) || 0;
      hpSum += hp;
      const treat = row[9];
      if (treatCount[treat] !== undefined) treatCount[treat]++;
      if (row[10]) shareCount++;
    });

    const stats = {
      total,
      avgHP: total > 0 ? Math.round(hpSum / total) : 0,
      shareCount,
      discCount,
      treatCount
    };

    // 只返回最新 50 筆（避免資料過大）
    const recentRows = rows.slice(-50).reverse().map(row => ({
      time: row[0],
      disc: row[1],
      nickname: row[2],
      hp: row[8],
      treatment: row[9],
      share: row[10],
      device: row[11]
    }));

    return ContentService
      .createTextOutput(JSON.stringify({ stats, recentRows }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
