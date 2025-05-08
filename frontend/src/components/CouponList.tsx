import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Gift, Tag, ChevronRight, Sparkles } from 'lucide-react';
import { Coupon } from '../lib/api';
import { Badge } from './ui/badge';

interface CouponListProps {
  coupons: Coupon[];
  userPoints: number;
  onRedeemCoupon: (couponId: number) => void;
}

export const CouponList = ({ coupons, userPoints, onRedeemCoupon }: CouponListProps) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center text-primary">
          <Sparkles className="mr-2 h-5 w-5" />
          交換可能な特典
        </h2>
        <button className="text-sm text-muted-foreground flex items-center hover:text-primary transition-colors">
          すべて見る
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      {coupons.length === 0 ? (
        <Card className="glass-effect border-none shadow-md">
          <CardContent className="pt-6 text-center text-muted-foreground">
            現在交換可能な特典はありません
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {coupons.map((coupon, index) => (
            <Card 
              key={coupon.id} 
              className="overflow-hidden card-hover border-none shadow-md stagger-item animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {coupon.image_url && (
                <div className="relative w-full h-40 bg-muted">
                  <img
                    src={coupon.image_url}
                    alt={coupon.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary">
                    {coupon.points_required} ポイント
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{coupon.name}</CardTitle>
                </div>
                <CardDescription className="flex items-center text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {coupon.description}
                </CardDescription>
              </CardHeader>
              
              <CardFooter className="flex justify-between items-center pt-2 pb-4">
                <div className="font-medium flex items-center">
                  {userPoints >= coupon.points_required ? (
                    <span className="text-green-600 text-sm">交換可能</span>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      あと{coupon.points_required - userPoints}ポイント
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => onRedeemCoupon(coupon.id!)}
                  disabled={userPoints < coupon.points_required}
                  size="sm"
                  className={userPoints >= coupon.points_required ? "bg-gradient-to-r from-primary to-primary/80" : ""}
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
          ))}
        </div>
      )}
    </div>
  );
};
