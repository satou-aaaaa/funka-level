# AGENTS.md

噴火警戒レベルよみ：架空の山に噴火警戒レベル1〜5が出た場面で、とる行動を4つから選ぶ1日5問の学習ゲーム。`index.html` と `data.js`（問題の種類と作り方）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（14種類×3000問：答えは1つ・キーワードと警報の名前が資料どおり・2段目の分け方・出典）・今日の5問と上級（3年分）・とことん（300回）・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は `data.js` の `SRC` にある気象庁の資料で確かめたことだけ。レベルとキーワード（5 避難・4 高齢者等避難・3 入山規制・2 火口周辺規制・1 活火山であることに留意）、警報の名前（4・5 噴火警報（居住地域）＝特別警報、2・3 噴火警報（火口周辺）、1 噴火予報）は QA が資料の表と照らす。種類を足すときも一次資料を読み、`src` に出典を付ける。調べた要点は共有フォルダ `games/funka-research.md`。
- 気象庁の表（`vol_alert_level.jpg`）は画像で、クラウドからは読めなかった（2026-11-13）。表のセルにしか無いこと（レベルごとの対象範囲・住民の行動の細かい言い回し）は、目で確かめるまで問題にしない。
- 防災の公式の情報の代わりにしない：「このゲームについて」と README に、公式の情報ではないこと・本当の情報は気象庁と市町村で確かめることを置く（QA が見る）。「安全です」と言い切らない。
- 山の名前（`MTS`）はひらがな＋山・岳の架空の名前。実在の火山の名前と今のレベルは出さない（QA が見る）。画面に「架空の山」と出す。
- 問題はどれも場面＋4つの選び肢（`act`・`byLevel`）。レベルで答えが変わる種類（`kw`・`jokyo`・`keiho`）は、2段目の分け方もレベルで決まる（4・5 住む所／2・3 火口のまわり／1 レベルだけではわからない）。ほかの種類は `GRP`（足したら `GRP` にも足す。QA が見る）。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・`MTS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。ヒントは1回目が「見るところ」、2回目が2つにしぼる。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「どこが危ない？」・復習（1→3→7日後）。記録 `fkl-v1`・文字 `fkl-fs`・復習 `fkl-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答え・山の名前を出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 写し元（健康情報みぬき）の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
