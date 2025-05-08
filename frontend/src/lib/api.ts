const API_URL = 'http://localhost:8000';

export interface User {
  id?: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  code: string;
  points: number;
  image_url?: string;
}

export interface PointTransaction {
  id?: number;
  user_id: number;
  product_id?: number;
  points: number;
  description: string;
  created_at?: string;
}

export interface Coupon {
  id?: number;
  name: string;
  description: string;
  points_required: number;
  image_url?: string;
  is_active: boolean;
  expiry_date?: string;
}

export interface UserCoupon {
  id?: number;
  user_id: number;
  coupon_id: number;
  is_used: boolean;
  created_at?: string;
  used_at?: string;
}

export interface NewsItem {
  id?: number;
  title: string;
  content: string;
  image_url?: string;
  is_published: boolean;
  published_at?: string;
}

const DEMO_USER_ID = 1;

export const registerProduct = async (code: string): Promise<any> => {
  const response = await fetch(`${API_URL}/api/products/register/${code}?user_id=${DEMO_USER_ID}`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to register product');
  }
  
  return response.json();
};

export const getUserPoints = async (): Promise<any> => {
  const response = await fetch(`${API_URL}/api/users/${DEMO_USER_ID}/points`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get user points');
  }
  
  return response.json();
};

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await fetch(`${API_URL}/api/coupons/`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get coupons');
  }
  
  return response.json();
};

export const getUserCoupons = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/api/users/${DEMO_USER_ID}/coupons`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get user coupons');
  }
  
  return response.json();
};

export const redeemCoupon = async (couponId: number): Promise<any> => {
  const response = await fetch(`${API_URL}/api/users/${DEMO_USER_ID}/redeem-coupon/${couponId}`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to redeem coupon');
  }
  
  return response.json();
};

export const useCoupon = async (userCouponId: number): Promise<any> => {
  const response = await fetch(`${API_URL}/api/users/${DEMO_USER_ID}/use-coupon/${userCouponId}`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to use coupon');
  }
  
  return response.json();
};

export const getNews = async (): Promise<NewsItem[]> => {
  const response = await fetch(`${API_URL}/api/news/`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get news');
  }
  
  return response.json();
};

export const getNewsItem = async (newsId: number): Promise<NewsItem> => {
  const response = await fetch(`${API_URL}/api/news/${newsId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get news item');
  }
  
  return response.json();
};
