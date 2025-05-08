from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class User(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    created_at: datetime = Field(default_factory=datetime.now)

class Product(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    code: str  # QR code or serial code
    points: int  # Points awarded for registering this product
    image_url: Optional[str] = None

class PointTransaction(BaseModel):
    id: Optional[int] = None
    user_id: int
    product_id: Optional[int] = None
    points: int  # Positive for earned points, negative for spent points
    description: str
    created_at: datetime = Field(default_factory=datetime.now)

class Coupon(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    points_required: int
    image_url: Optional[str] = None
    is_active: bool = True
    expiry_date: Optional[datetime] = None

class UserCoupon(BaseModel):
    id: Optional[int] = None
    user_id: int
    coupon_id: int
    is_used: bool = False
    created_at: datetime = Field(default_factory=datetime.now)
    used_at: Optional[datetime] = None

class NewsItem(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    image_url: Optional[str] = None
    is_published: bool = True
    published_at: datetime = Field(default_factory=datetime.now)
