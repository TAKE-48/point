import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Ticket, CheckCircle } from 'lucide-react';

interface UserCoupon {
  user_coupon_id: number;
  is_used: boolean;
  created_at: string;
  used_at?: string;
  coupon: {
    id: number;
    name: string;
    description: string;
    image_url?: string;
  };
}

interface UserCouponListProps {
  userCoupons: UserCoupon[];
  onUseCoupon: (userCouponId: number) => void;
}

export const UserCouponList = ({ userCoupons, onUseCoupon }: UserCouponListProps) => {
  const unusedCoupons = userCoupons.filter(uc => !uc.is_used);
  const usedCoupons = userCoupons.filter(uc => uc.is_used);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center">
          <Ticket className="mr-2 h-5 w-5" />
          利用可能なクーポン
        </h2>
        
        {unusedCoupons.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              利用可能なクーポンはありません
            </CardContent>
          </Card>
        ) : (
          unusedCoupons.map((userCoupon) => (
            <Card key={userCoupon.user_coupon_id} className="overflow-hidden">
              {userCoupon.coupon.image_url && (
                <div className="w-full h-32 bg-muted">
                  <img
                    src={userCoupon.coupon.image_url}
                    alt={userCoupon.coupon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="pb-2">
                <CardTitle>{userCoupon.coupon.name}</CardTitle>
                <CardDescription>{userCoupon.coupon.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="pt-2">
                <Button
                  className="w-full"
                  onClick={() => onUseCoupon(userCoupon.user_coupon_id)}
                >
                  クーポンを使用する
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      {usedCoupons.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            使用済みクーポン
          </h2>
          
          {usedCoupons.map((userCoupon) => (
            <Card key={userCoupon.user_coupon_id} className="overflow-hidden opacity-70">
              <CardHeader className="pb-2">
                <CardTitle>{userCoupon.coupon.name}</CardTitle>
                <CardDescription>
                  使用日: {new Date(userCoupon.used_at || '').toLocaleDateString('ja-JP')}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
