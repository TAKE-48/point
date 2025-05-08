from typing import Dict, List, Optional, Any
import uuid
from datetime import datetime

class InMemoryDB:
    def __init__(self):
        self.users: Dict[int, Dict[str, Any]] = {}
        self.products: Dict[int, Dict[str, Any]] = {}
        self.point_transactions: Dict[int, Dict[str, Any]] = {}
        self.coupons: Dict[int, Dict[str, Any]] = {}
        self.user_coupons: Dict[int, Dict[str, Any]] = {}
        self.news_items: Dict[int, Dict[str, Any]] = {}
        
        self.user_id_counter = 1
        self.product_id_counter = 1
        self.transaction_id_counter = 1
        self.coupon_id_counter = 1
        self.user_coupon_id_counter = 1
        self.news_id_counter = 1
        
        self._initialize_sample_data()
    
    def _initialize_sample_data(self):
        self.add_user({
            "username": "デモユーザー",
            "email": "demo@example.com",
            "created_at": datetime.now().isoformat()
        })
        
        self.add_product({
            "name": "チョコレートクッキー",
            "description": "香ばしいチョコチップ入りクッキー",
            "code": "CHOCO123",
            "points": 10,
            "image_url": "https://example.com/images/choco-cookie.jpg"
        })
        
        self.add_product({
            "name": "ポテトチップス塩味",
            "description": "サクサク食感の定番ポテトチップス",
            "code": "POTATO456",
            "points": 5,
            "image_url": "https://example.com/images/potato-chips.jpg"
        })
        
        self.add_coupon({
            "name": "商品50%オフクーポン",
            "description": "対象商品を50%オフで購入できるクーポン",
            "points_required": 100,
            "image_url": "https://example.com/images/50-percent-off.jpg",
            "is_active": True
        })
        
        self.add_coupon({
            "name": "新商品サンプル",
            "description": "新発売の商品サンプルをプレゼント",
            "points_required": 50,
            "image_url": "https://example.com/images/free-sample.jpg",
            "is_active": True
        })
        
        self.add_news({
            "title": "新商品発売のお知らせ",
            "content": "来月より新商品「プレミアムチョコレートクッキー」を発売します。期間限定で通常の2倍のポイントがもらえるキャンペーンも実施予定です。",
            "image_url": "https://example.com/images/new-product.jpg",
            "is_published": True
        })
        
        self.add_news({
            "title": "夏のポイント2倍キャンペーン",
            "content": "7月1日から8月31日までの期間中、全商品のポイントが2倍になります。この機会にぜひお買い求めください。",
            "image_url": "https://example.com/images/summer-campaign.jpg",
            "is_published": True
        })
    
    def add_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        user_id = self.user_id_counter
        user_data["id"] = user_id
        self.users[user_id] = user_data
        self.user_id_counter += 1
        return user_data
    
    def get_user(self, user_id: int) -> Optional[Dict[str, Any]]:
        return self.users.get(user_id)
    
    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        for user in self.users.values():
            if user["email"] == email:
                return user
        return None
    
    def get_all_users(self) -> List[Dict[str, Any]]:
        return list(self.users.values())
    
    def add_product(self, product_data: Dict[str, Any]) -> Dict[str, Any]:
        product_id = self.product_id_counter
        product_data["id"] = product_id
        self.products[product_id] = product_data
        self.product_id_counter += 1
        return product_data
    
    def get_product(self, product_id: int) -> Optional[Dict[str, Any]]:
        return self.products.get(product_id)
    
    def get_product_by_code(self, code: str) -> Optional[Dict[str, Any]]:
        for product in self.products.values():
            if product["code"] == code:
                return product
        return None
    
    def get_all_products(self) -> List[Dict[str, Any]]:
        return list(self.products.values())
    
    def add_transaction(self, transaction_data: Dict[str, Any]) -> Dict[str, Any]:
        transaction_id = self.transaction_id_counter
        transaction_data["id"] = transaction_id
        self.point_transactions[transaction_id] = transaction_data
        self.transaction_id_counter += 1
        return transaction_data
    
    def get_transaction(self, transaction_id: int) -> Optional[Dict[str, Any]]:
        return self.point_transactions.get(transaction_id)
    
    def get_user_transactions(self, user_id: int) -> List[Dict[str, Any]]:
        return [t for t in self.point_transactions.values() if t["user_id"] == user_id]
    
    def get_user_points_total(self, user_id: int) -> int:
        transactions = self.get_user_transactions(user_id)
        return sum(t["points"] for t in transactions)
    
    def add_coupon(self, coupon_data: Dict[str, Any]) -> Dict[str, Any]:
        coupon_id = self.coupon_id_counter
        coupon_data["id"] = coupon_id
        self.coupons[coupon_id] = coupon_data
        self.coupon_id_counter += 1
        return coupon_data
    
    def get_coupon(self, coupon_id: int) -> Optional[Dict[str, Any]]:
        return self.coupons.get(coupon_id)
    
    def get_all_active_coupons(self) -> List[Dict[str, Any]]:
        return [c for c in self.coupons.values() if c["is_active"]]
    
    def add_user_coupon(self, user_coupon_data: Dict[str, Any]) -> Dict[str, Any]:
        user_coupon_id = self.user_coupon_id_counter
        user_coupon_data["id"] = user_coupon_id
        self.user_coupons[user_coupon_id] = user_coupon_data
        self.user_coupon_id_counter += 1
        return user_coupon_data
    
    def get_user_coupon(self, user_coupon_id: int) -> Optional[Dict[str, Any]]:
        return self.user_coupons.get(user_coupon_id)
    
    def get_user_coupons(self, user_id: int) -> List[Dict[str, Any]]:
        return [uc for uc in self.user_coupons.values() if uc["user_id"] == user_id]
    
    def use_user_coupon(self, user_coupon_id: int) -> Optional[Dict[str, Any]]:
        user_coupon = self.get_user_coupon(user_coupon_id)
        if user_coupon and not user_coupon["is_used"]:
            user_coupon["is_used"] = True
            user_coupon["used_at"] = datetime.now()
            return user_coupon
        return None
    
    def add_news(self, news_data: Dict[str, Any]) -> Dict[str, Any]:
        news_id = self.news_id_counter
        news_data["id"] = news_id
        self.news_items[news_id] = news_data
        self.news_id_counter += 1
        return news_data
    
    def get_news(self, news_id: int) -> Optional[Dict[str, Any]]:
        return self.news_items.get(news_id)
    
    def get_all_published_news(self) -> List[Dict[str, Any]]:
        return [n for n in self.news_items.values() if n["is_published"]]

db = InMemoryDB()
