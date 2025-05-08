import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Ticket, CheckCircle, Calendar, Tag, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

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
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center text-primary">
            <Ticket className="mr-2 h-5 w-5" />
            利用可能なクーポン
          </h2>
          {unusedCoupons.length > 0 && (
            <Badge className="bg-primary/90 hover:bg-primary">
              {unusedCoupons.length}枚
            </Badge>
          )}
        </div>
        
        {unusedCoupons.length === 0 ? (
          <Card className="glass-effect border-none shadow-md">
            <CardContent className="pt-6 text-center text-muted-foreground">
              利用可能なクーポンはありません
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {unusedCoupons.map((userCoupon, index) => (
              <Card 
                key={userCoupon.user_coupon_id} 
                className="overflow-hidden card-hover border-none shadow-md stagger-item animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {userCoupon.coupon.image_url && (
                  <div className="relative w-full h-40 bg-muted">
                    <img
                      src={userCoupon.coupon.image_url}
                      alt={userCoupon.coupon.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700">
                      利用可能
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{userCoupon.coupon.name}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <Tag className="mr-1 h-3 w-3" />
                    {userCoupon.coupon.description}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    取得日: {new Date(userCoupon.created_at).toLocaleDateString('ja-JP')}
                  </div>
                </CardHeader>
                
                <CardFooter className="pt-2 pb-4">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => onUseCoupon(userCoupon.user_coupon_id)}
                  >
                    クーポンを使用する
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {usedCoupons.length > 0 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center text-muted-foreground">
              <CheckCircle className="mr-2 h-5 w-5" />
              使用済みクーポン
            </h2>
            <button className="text-sm text-muted-foreground flex items-center hover:text-primary transition-colors">
              履歴を見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            {usedCoupons.map((userCoupon) => (
              <Card 
                key={userCoupon.user_coupon_id} 
                className="overflow-hidden border-none shadow-sm bg-muted/30"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base text-muted-foreground">{userCoupon.coupon.name}</CardTitle>
                      <CardDescription className="flex items-center text-xs">
                        <Calendar className="mr-1 h-3 w-3" />
                        使用日: {new Date(userCoupon.used_at || '').toLocaleDateString('ja-JP')}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
                      使用済み
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
