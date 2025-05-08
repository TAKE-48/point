import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { QRScanner } from './components/QRScanner'
import { PointsCard } from './components/PointsCard'
import { CouponList } from './components/CouponList'
import { UserCouponList } from './components/UserCouponList'
import { NewsFeed } from './components/NewsFeed'
import { Home, Gift, QrCode, Ticket } from 'lucide-react'
import { 
  getUserPoints, 
  getCoupons, 
  getUserCoupons, 
  redeemCoupon, 
  useCoupon, 
  getNews 
} from './lib/api'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [totalPoints, setTotalPoints] = useState(0)
  const [coupons, setCoupons] = useState<any[]>([])
  const [userCoupons, setUserCoupons] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [scanSuccess, setScanSuccess] = useState<any | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setError(null)
      
      try {
        const pointsData = await getUserPoints()
        setTotalPoints(pointsData.total_points)
        
        const couponsData = await getCoupons()
        setCoupons(couponsData)
        
        const userCouponsData = await getUserCoupons()
        setUserCoupons(userCouponsData)
        
        const newsData = await getNews()
        setNews(newsData)
      } catch (err) {
        setError('データの読み込みに失敗しました。後でもう一度お試しください。')
        console.error(err)
      }
    }
    
    loadData()
  }, [])

  const handleScanSuccess = (result: any) => {
    setScanSuccess(result)
    setTotalPoints(result.total_points)
    setActiveTab('home')
    
    setTimeout(() => {
      setScanSuccess(null)
    }, 5000)
  }

  const handleRedeemCoupon = async (couponId: number) => {
    try {
      const result = await redeemCoupon(couponId)
      
      setTotalPoints(result.remaining_points)
      
      const userCouponsData = await getUserCoupons()
      setUserCoupons(userCouponsData)
      
      setActiveTab('my-coupons')
    } catch (err) {
      setError('クーポンの交換に失敗しました。後でもう一度お試しください。')
      console.error(err)
    }
  }

  const handleUseCoupon = async (userCouponId: number) => {
    try {
      await useCoupon(userCouponId)
      
      const userCouponsData = await getUserCoupons()
      setUserCoupons(userCouponsData)
    } catch (err) {
      setError('クーポンの使用に失敗しました。後でもう一度お試しください。')
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <header className="p-4 bg-primary text-primary-foreground text-center">
        <h1 className="text-xl font-bold">スナックリワードアプリ</h1>
      </header>
      
      <main className="flex-1 p-4 overflow-auto">
        {error && (
          <div className="bg-destructive text-destructive-foreground p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        {scanSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
            <p className="font-bold">商品登録成功！</p>
            <p>{scanSuccess.points_earned} ポイント獲得しました</p>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col min-h-[80vh]">
          <TabsContent value="home" className="space-y-6 mt-0 flex-1">
            <PointsCard totalPoints={totalPoints} nextRewardPoints={50} />
            <NewsFeed news={news} />
          </TabsContent>
          
          <TabsContent value="coupons" className="space-y-6 mt-0 flex-1">
            <CouponList 
              coupons={coupons} 
              userPoints={totalPoints} 
              onRedeemCoupon={handleRedeemCoupon} 
            />
          </TabsContent>
          
          <TabsContent value="my-coupons" className="space-y-6 mt-0 flex-1">
            <UserCouponList 
              userCoupons={userCoupons} 
              onUseCoupon={handleUseCoupon} 
            />
          </TabsContent>
          
          <TabsContent value="scan" className="space-y-6 mt-0 flex-1">
            <QRScanner onScanSuccess={handleScanSuccess} />
          </TabsContent>
          
          <TabsList className="w-full grid grid-cols-4 h-16 mt-auto border-t fixed bottom-0 left-0 right-0 bg-background">
            <TabsTrigger value="home" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">ホーム</span>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <Gift className="h-5 w-5" />
              <span className="text-xs mt-1">特典</span>
            </TabsTrigger>
            <TabsTrigger value="my-coupons" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <Ticket className="h-5 w-5" />
              <span className="text-xs mt-1">マイクーポン</span>
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex flex-col items-center justify-center data-[state=active]:text-primary">
              <QrCode className="h-5 w-5" />
              <span className="text-xs mt-1">スキャン</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  )
}

export default App
