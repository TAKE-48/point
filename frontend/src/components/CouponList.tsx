import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Gift } from 'lucide-react';
import { Coupon } from '../lib/api';

interface CouponListProps {
  coupons: Coupon[];
  userPoints: number;
  onRedeemCoupon: (couponId: number) => void;
}

export const CouponList = ({ coupons, userPoints, onRedeemCoupon }: CouponListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">交換可能な特典</h2>
      
      {coupons.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            現在交換可能な特典はありません
          </CardContent>
        </Card>
      ) : (
        coupons.map((coupon) => (
          <Card key={coupon.id} className="overflow-hidden">
            {coupon.image_url && (
              <div className="w-full h-32 bg-muted">
                <img
                  src={coupon.image_url}
                  alt={coupon.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader className="pb-2">
              <CardTitle>{coupon.name}</CardTitle>
              <CardDescription>{coupon.description}</CardDescription>
            </CardHeader>
            
            <CardFooter className="flex justify-between items-center pt-2">
              <div className="font-medium">{coupon.points_required} ポイント</div>
              <Button
                onClick={() => onRedeemCoupon(coupon.id!)}
                disabled={userPoints < coupon.points_required}
                size="sm"
              >
                {userPoints >= coupon.points_required ? (
                  <>
                    <Gift className="mr-2 h-4 w-4" />
                    交換する
                  </>
                ) : (
                  'ポイント不足'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
