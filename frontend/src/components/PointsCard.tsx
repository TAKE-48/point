import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Coins, Award, TrendingUp } from 'lucide-react';

interface PointsCardProps {
  totalPoints: number;
  nextRewardPoints: number;
}

export const PointsCard = ({ totalPoints, nextRewardPoints }: PointsCardProps) => {
  const progress = Math.min(100, (totalPoints / nextRewardPoints) * 100);
  const pointsRemaining = Math.max(0, nextRewardPoints - totalPoints);
  
  return (
    <Card className="w-full overflow-hidden card-hover glass-effect border-none shadow-lg">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-center flex items-center justify-center text-primary">
          <Coins className="mr-2 h-6 w-6 text-yellow-500" />
          ポイント残高
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="text-center text-4xl font-bold mb-3 text-primary-foreground gradient-primary py-3 rounded-lg">
          {totalPoints} <span className="text-xl">pt</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4" />
            現在の獲得ポイント
          </div>
          <div className="flex items-center text-sm font-medium">
            <Award className="mr-1 h-4 w-4 text-primary" />
            次の特典まで
          </div>
        </div>
        
        <div className="relative mb-4">
          <Progress value={progress} className="h-2.5 rounded-full" />
          <div className="absolute right-0 top-3 text-xs font-medium">
            あと {pointsRemaining} ポイント
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
