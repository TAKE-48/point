import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Coins } from 'lucide-react';

interface PointsCardProps {
  totalPoints: number;
  nextRewardPoints: number;
}

export const PointsCard = ({ totalPoints, nextRewardPoints }: PointsCardProps) => {
  const progress = Math.min(100, (totalPoints / nextRewardPoints) * 100);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center flex items-center justify-center">
          <Coins className="mr-2 h-5 w-5 text-yellow-500" />
          ポイント残高
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-3xl font-bold mb-2">{totalPoints} pt</div>
        <div className="text-center text-sm text-muted-foreground mb-2">
          次の特典まであと {Math.max(0, nextRewardPoints - totalPoints)} ポイント
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
};
