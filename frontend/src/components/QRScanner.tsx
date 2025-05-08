import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { registerProduct } from '../lib/api';

interface QRScannerProps {
  onScanSuccess: (result: any) => void;
}

export const QRScanner = ({ onScanSuccess }: QRScannerProps) => {
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanInterval, setScanInterval] = useState<number | null>(null);

  const startCamera = async () => {
    setShowCamera(true);
    setError(null);
    
    try {
      const constraints = {
        video: { facingMode: 'environment' }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const interval = window.setInterval(() => {
        scanQRCode();
      }, 500);
      
      setScanInterval(interval);
    } catch (err) {
      setError('カメラへのアクセスができませんでした。手動でコードを入力してください。');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
    
    setShowCamera(false);
  };

  const scanQRCode = () => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        setTimeout(() => {
          handleScan('CHOCO123');
        }, 3000);
      }
    }
  };

  const handleScan = async (code: string) => {
    stopCamera();
    setLoading(true);
    setError(null);
    
    try {
      const result = await registerProduct(code);
      onScanSuccess(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '商品の登録に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!manualCode.trim()) {
      setError('コードを入力してください。');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await registerProduct(manualCode);
      onScanSuccess(result);
      setManualCode('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '商品の登録に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (scanInterval) {
        clearInterval(scanInterval);
      }
      stopCamera();
    };
  }, [scanInterval]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">商品を登録する</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {showCamera ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-md"
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 border-2 border-dashed border-primary rounded-md pointer-events-none" />
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4"
              onClick={stopCamera}
            >
              キャンセル
            </Button>
          </div>
        ) : (
          <>
            <Button
              className="w-full mb-4"
              onClick={startCamera}
              disabled={loading}
            >
              <Camera className="mr-2 h-4 w-4" />
              QRコードをスキャン
            </Button>
            
            <div className="text-center my-4">または</div>
            
            <form onSubmit={handleManualSubmit}>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="シリアルコードを入力"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  disabled={loading}
                />
                <Button type="submit" disabled={loading}>
                  登録
                </Button>
              </div>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};
