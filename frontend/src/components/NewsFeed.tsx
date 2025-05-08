import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Newspaper } from 'lucide-react';
import { NewsItem } from '../lib/api';

interface NewsFeedProps {
  news: NewsItem[];
}

export const NewsFeed = ({ news }: NewsFeedProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center">
        <Newspaper className="mr-2 h-5 w-5" />
        お知らせ
      </h2>
      
      {news.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            現在お知らせはありません
          </CardContent>
        </Card>
      ) : (
        news.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.image_url && (
              <div className="w-full h-32 bg-muted">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                {new Date(item.published_at || '').toLocaleDateString('ja-JP')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm">{item.content}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
