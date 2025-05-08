from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime
from .models import User, Product, PointTransaction, Coupon, UserCoupon, NewsItem
from .database import db

router = APIRouter()

@router.post("/users/", response_model=User)
async def create_user(user: User):
    existing_user = db.get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return db.add_user(user.dict())

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/products/register/{code}")
async def register_product(code: str, user_id: int):
    product = db.get_product_by_code(code)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    transaction = PointTransaction(
        user_id=user_id,
        product_id=product["id"],
        points=product["points"],
        description=f"Registered product: {product['name']}"
    )
    
    db.add_transaction(transaction.dict())
    
    return {
        "success": True,
        "product": product,
        "points_earned": product["points"],
        "total_points": db.get_user_points_total(user_id)
    }

@router.get("/users/{user_id}/points")
async def get_user_points(user_id: int):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    total_points = db.get_user_points_total(user_id)
    transactions = db.get_user_transactions(user_id)
    
    return {
        "user_id": user_id,
        "total_points": total_points,
        "transactions": transactions
    }

@router.get("/coupons/", response_model=List[Coupon])
async def get_coupons():
    return db.get_all_active_coupons()

@router.post("/users/{user_id}/redeem-coupon/{coupon_id}")
async def redeem_coupon(user_id: int, coupon_id: int):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    coupon = db.get_coupon(coupon_id)
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    
    if not coupon["is_active"]:
        raise HTTPException(status_code=400, detail="Coupon is not active")
    
    total_points = db.get_user_points_total(user_id)
    if total_points < coupon["points_required"]:
        raise HTTPException(status_code=400, detail="Not enough points")
    
    transaction = PointTransaction(
        user_id=user_id,
        points=-coupon["points_required"],
        description=f"Redeemed coupon: {coupon['name']}"
    )
    db.add_transaction(transaction.dict())
    
    user_coupon = UserCoupon(
        user_id=user_id,
        coupon_id=coupon_id,
        is_used=False
    )
    db.add_user_coupon(user_coupon.dict())
    
    return {
        "success": True,
        "coupon": coupon,
        "points_spent": coupon["points_required"],
        "remaining_points": db.get_user_points_total(user_id)
    }

@router.get("/users/{user_id}/coupons")
async def get_user_coupons(user_id: int):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_coupons = db.get_user_coupons(user_id)
    
    result = []
    for uc in user_coupons:
        coupon = db.get_coupon(uc["coupon_id"])
        if coupon:
            result.append({
                "user_coupon_id": uc["id"],
                "is_used": uc["is_used"],
                "created_at": uc["created_at"],
                "used_at": uc.get("used_at"),
                "coupon": coupon
            })
    
    return result

@router.post("/users/{user_id}/use-coupon/{user_coupon_id}")
async def use_coupon(user_id: int, user_coupon_id: int):
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_coupon = db.get_user_coupon(user_coupon_id)
    if not user_coupon:
        raise HTTPException(status_code=404, detail="User coupon not found")
    
    if user_coupon["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to use this coupon")
    
    if user_coupon["is_used"]:
        raise HTTPException(status_code=400, detail="Coupon already used")
    
    updated_user_coupon = db.use_user_coupon(user_coupon_id)
    if not updated_user_coupon:
        raise HTTPException(status_code=400, detail="Failed to use coupon")
    
    coupon = db.get_coupon(user_coupon["coupon_id"])
    
    return {
        "success": True,
        "message": f"Successfully used coupon: {coupon['name']}",
        "user_coupon": updated_user_coupon,
        "coupon": coupon
    }

@router.get("/news/", response_model=List[NewsItem])
async def get_news():
    return db.get_all_published_news()

@router.get("/news/{news_id}", response_model=NewsItem)
async def get_news_item(news_id: int):
    news = db.get_news(news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News item not found")
    return news
