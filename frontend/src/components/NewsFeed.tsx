import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Calendar, ChevronRight, Bell } from 'lucide-react';
import { NewsItem } from '../lib/api';

interface NewsFeedProps {
  news: NewsItem[];
}

export const NewsFeed = ({ news }: NewsFeedProps) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center text-primary">
          <Bell className="mr-2 h-5 w-5" />
          お知らせ
        </h2>
        <button className="text-sm text-muted-foreground flex items-center hover:text-primary transition-colors">
          すべて見る
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      {news.length === 0 ? (
        <Card className="glass-effect border-none shadow-md">
          <CardContent className="pt-6 text-center text-muted-foreground">
            現在お知らせはありません
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden card-hover border-none shadow-md stagger-item animate-slide-in"
            >
              {item.image_url && (
                <div className="relative w-full h-40 bg-muted">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription className="flex items-center text-xs">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(item.published_at || '').toLocaleDateString('ja-JP')}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="py-2">
                <p className="text-sm line-clamp-3">{item.content}</p>
              </CardContent>
              
              <CardFooter className="pt-0 pb-3">
                <button className="text-xs text-primary flex items-center hover:underline">
                  詳細を見る
                  <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
