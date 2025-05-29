# スナックリワードアプリ

お菓子の消費財メーカー向けのWebアプリケーションです。ユーザーが商品を購入してQRコードをスキャンしたり、シリアルコードを入力することでポイントを獲得し、そのポイントでクーポンと交換できるリワードシステムを提供します。

## 📱 機能

### ホーム画面
- 現在のポイント残高表示
- 次のリワード獲得までのポイント進捗表示
- お知らせ・ニュース一覧

### 特典画面
- ポイントと交換可能なクーポン一覧
- クーポンの詳細情報（必要ポイント数、説明）
- クーポン交換機能

### マイクーポン画面
- 獲得済みクーポンの一覧
- クーポンの利用・使用機能
- クーポンの利用状況管理

### スキャン画面
- QRコードスキャン機能
- シリアルコード手動入力
- 商品登録とポイント獲得

## 🛠️ 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- **Radix UI** - アクセシブルなUIコンポーネント
- **Lucide React** - モダンなアイコンライブラリ

### バックエンド
- **FastAPI** - 高性能なPython Webフレームワーク
- **Pydantic** - データバリデーションとシリアライゼーション
- **CORS** - クロスオリジンリクエスト対応
- **PostgreSQL** - データベース（psycopg3）

### 開発ツール
- **Poetry** - Python依存関係管理
- **ESLint** - JavaScriptコード品質管理
- **TypeScript ESLint** - TypeScript専用リント

## 🚀 セットアップと起動

### 前提条件
- Node.js 18以上
- Python 3.12以上
- Poetry

### バックエンドのセットアップ

```bash
# バックエンドディレクトリに移動
cd backend

# 依存関係をインストール
poetry install

# 仮想環境をアクティベート
poetry shell

# サーバーを起動
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### フロントエンドのセットアップ

```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 📁 プロジェクト構成

```
point/
├── backend/                 # FastAPIバックエンド
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPIアプリケーション
│   │   ├── api.py          # APIエンドポイント
│   │   ├── models.py       # データモデル
│   │   └── database.py     # データベース接続
│   ├── tests/              # バックエンドテスト
│   ├── pyproject.toml      # Python依存関係
│   └── README.md
├── frontend/               # Reactフロントエンド
│   ├── src/
│   │   ├── components/     # Reactコンポーネント
│   │   │   ├── ui/        # 再利用可能なUIコンポーネント
│   │   │   ├── CouponList.tsx
│   │   │   ├── NewsFeed.tsx
│   │   │   ├── PointsCard.tsx
│   │   │   ├── QRScanner.tsx
│   │   │   └── UserCouponList.tsx
│   │   ├── hooks/         # カスタムフック
│   │   ├── lib/           # ユーティリティ
│   │   │   ├── api.ts     # API通信
│   │   │   └── utils.ts   # 共通ユーティリティ
│   │   ├── App.tsx        # メインアプリケーション
│   │   └── main.tsx       # エントリーポイント
│   ├── package.json       # Node.js依存関係
│   └── README.md
└── README.md              # このファイル
```

## 🔌 API エンドポイント

### ベースURL
- 開発環境: `http://localhost:8000/api`

### エンドポイント一覧

#### ユーザー関連
- `GET /api/users/{user_id}/points` - ユーザーのポイント取得
- `GET /api/users/{user_id}/coupons` - ユーザーのクーポン一覧

#### 商品関連
- `POST /api/scan` - QRコード/シリアルコードによる商品登録

#### クーポン関連
- `GET /api/coupons` - 利用可能なクーポン一覧
- `POST /api/redeem` - クーポン交換
- `POST /api/use-coupon` - クーポン使用

#### お知らせ関連
- `GET /api/news` - ニュース・お知らせ一覧

#### システム関連
- `GET /healthz` - ヘルスチェック

## 📝 データモデル

### User（ユーザー）
- `id`: ユーザーID
- `username`: ユーザー名
- `email`: メールアドレス
- `created_at`: 作成日時

### Product（商品）
- `id`: 商品ID
- `name`: 商品名
- `description`: 商品説明
- `code`: QRコード/シリアルコード
- `points`: 獲得ポイント
- `image_url`: 商品画像URL

### Coupon（クーポン）
- `id`: クーポンID
- `name`: クーポン名
- `description`: クーポン説明
- `points_required`: 必要ポイント数
- `image_url`: クーポン画像URL
- `is_active`: 有効状態
- `expiry_date`: 有効期限

### PointTransaction（ポイント取引）
- `id`: 取引ID
- `user_id`: ユーザーID
- `product_id`: 商品ID
- `points`: ポイント数（獲得時は正、使用時は負）
- `description`: 取引説明
- `created_at`: 取引日時

## 🧪 テスト

### フロントエンド
```bash
cd frontend
npm run lint
```

### バックエンド
```bash
cd backend
poetry run pytest
```

## 🚀 本番デプロイ

### フロントエンド
```bash
cd frontend
npm run build
```

### バックエンド
```bash
cd backend
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 🔧 開発時の注意点

- **データベース**: 現在はインメモリデータベースを使用（デモ用）
- **認証**: ユーザー認証機能は実装されていません
- **CORS**: 開発用にすべてのオリジンを許可しています
- **ポイント**: デフォルトユーザー（ID: 1）のデータを使用

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👥 貢献

プルリクエストや課題の報告を歓迎します。開発に参加する場合は、以下の手順に従ってください：

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

質問や問題がある場合は、GitHubのIssuesにて報告してください。