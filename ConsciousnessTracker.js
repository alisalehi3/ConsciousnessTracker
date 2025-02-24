import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, Brain, Zap, Heart, Globe } from 'lucide-react';

const ConsciousnessTracker = () => {
  const [consciousness, setConsciousness] = useState({
    technological: 0,
    spiritual: 0,
    emotional: 0,
    cognitive: 0,
    cultural: 0, // لایه جدید
    biological: 0, // داده‌های زیستی
    economic: 0, // شاخص اقتصادی
  });
  const [insights, setInsights] = useState([]);
  const [currentLayer, setCurrentLayer] = useState('material');
  const [frequency, setFrequency] = useState(7.83);
  const [superposition, setSuperposition] = useState(false);
  const [connection, setConnection] = useState(0);
  const [intent, setIntent] = useState('');
  const [timeCloud, setTimeCloud] = useState({ past: 0, present: 100, future: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousness(prev => {
        const boost = superposition ? 5 : 1;
        const intentBoost = intent === 'creativity' ? 1.5 : intent === 'peace' ? 0.8 : 1;
        const layerFactor = {
          material: 1,
          emotional: 0.9,
          quantum: 1.2,
          cultural: 0.8,
          biological: 1.1,
          economic: 0.9,
        }[currentLayer];
        const timeInfluence = (timeCloud.past * 0.3 + timeCloud.present * 0.5 + timeCloud.future * 0.2) / 100;

        const techGrowth = prev.technological < 100 ? (Math.random() * 0.5 + insights.length * 0.1) * boost * intentBoost * layerFactor * timeInfluence : 0;
        const spiritGrowth = prev.spiritual < 100 ? (Math.abs(prev.emotional - prev.cognitive) * 0.2) * boost * intentBoost * layerFactor * timeInfluence : 0;
        const emoGrowth = prev.emotional < 100 ? (Math.random() * 0.4 * (1 + prev.spiritual / 100)) * boost * intentBoost * layerFactor * timeInfluence : 0;
        const cogGrowth = prev.cognitive < 100 ? (Math.random() * 0.6 * (1 + insights.length * 0.1)) * boost * intentBoost * layerFactor * timeInfluence : 0;
        const culturalGrowth = prev.cultural < 100 ? (Math.random() * 0.3 * (1 + prev.spiritual / 100)) * boost * intentBoost * layerFactor * timeInfluence : 0; // رشد فرهنگی
        const bioGrowth = prev.biological < 100 ? (Math.random() * 0.4 * (1 + prev.emotional / 100)) * boost * intentBoost * layerFactor * timeInfluence : 0; // رشد زیستی
        const ecoGrowth = prev.economic < 100 ? (Math.random() * 0.5 * (1 + prev.technological / 100)) * boost * intentBoost * layerFactor * timeInfluence : 0; // رشد اقتصادی

        const newConsciousness = {
          technological: Math.min(prev.technological + techGrowth, 100),
          spiritual: Math.min(prev.spiritual + spiritGrowth, 100),
          emotional: Math.min(prev.emotional + emoGrowth, 100),
          cognitive: Math.min(prev.cognitive + cogGrowth, 100),
          cultural: Math.min(prev.cultural + culturalGrowth, 100),
          biological: Math.min(prev.biological + bioGrowth, 100),
          economic: Math.min(prev.economic + ecoGrowth, 100),
        };

        const values = Object.values(newConsciousness);
        const avg = values.reduce((a, b) => a + b, 0) / 7;
        const variance = values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / 7;
        setConnection(Math.max(0, 100 - variance / 10));
        return newConsciousness;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [insights, frequency, superposition, intent, currentLayer, timeCloud]);

  useEffect(() => {
    const total = Object.values(consciousness).reduce((a, b) => a + b, 0) / 7;
    if (total > 50 && insights.length < 10) {
      setInsights(prev => [...prev, generateInsight(total, consciousness, frequency, connection, currentLayer)]);
    }
  }, [consciousness, frequency, connection, currentLayer]);

  const generateInsight = (level, consciousness, freq, conn, layer) => {
    const insights = {
      unity: conn > 80 ? "وحدت همه‌چیز رو به هم گره زده" : "ارتباطات در حال قوی‌تر شدنن",
      creation: intent ? `نیت "${intent}" داره واقعیت رو می‌سازه` : "مشاهده‌ات دنیا رو تغییر می‌ده",
      layers: freq > 100 ? `لایه ${layer} حقیقت رو نشون می‌ده` : "واقعیت فراتر از این لایه‌ست",
      time: timeCloud.future > 50 ? "آینده الان تو رو هدایت می‌کنه" : "گذشته هنوز زنده‌ست",
      cultural: consciousness.cultural > 50 ? "سنت‌ها و داستان‌ها آگاهی تو رو غنی می‌کنن" : "فرهنگ تو هنوز در حال رشدِ",
      biological: consciousness.biological > 50 ? "بدنت با آگاهی هماهنگ شده" : "زیستی تو نیاز به تعادل داره",
      economic: consciousness.economic > 50 ? "انگیزه‌هایت پایدارن" : "اقتصاد تو نیاز به بازنگری داره",
    };
    const dominant = conn > 80 ? 'unity' : freq > 100 ? 'layers' : intent ? 'creation' : consciousness.cultural > 50 ? 'cultural' : consciousness.biological > 50 ? 'biological' : consciousness.economic > 50 ? 'economic' : 'time';
    return insights[dominant];
  };

  const toggleSuperposition = () => {
    setSuperposition(prev => !prev);
    if (!superposition) {
      setConsciousness({
        technological: 100, spiritual: 100, emotional: 100, cognitive: 100,
        cultural: 100, biological: 100, economic: 100,
      });
      setFrequency(432);
    } else {
      setFrequency(7.83);
    }
  };

  const handleLayerShift = (layer) => {
    setCurrentLayer(layer);
    setFrequency({
      material: 7.83,
      emotional: 20,
      quantum: 100,
      cultural: 15,
      biological: 10,
      economic: 12,
    }[layer]);
  };

  const handleTimeCloud = (time, value) => {
    setTimeCloud(prev => {
      const newCloud = { ...prev, [time]: Math.max(0, Math.min(100, value)) };
      const total = newCloud.past + newCloud.present + newCloud.future;
      return {
        past: (newCloud.past / total) * 100,
        present: (newCloud.present / total) * 100,
        future: (newCloud.future / total) * 100,
      };
    });
  };

  const handleIntent = (newIntent) => {
    setIntent(newIntent);
    setInsights(prev => [...prev, `نیت تو "${newIntent}" رو شکل می‌ده`]);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-right flex justify-between items-center">
          <div className="flex gap-2">
            <Brain className="w-6 h-6" />
            <Activity className="w-6 h-6" />
            <Heart className="w-6 h-6" />
            <Globe className="w-6 h-6" /> {/* نماد فرهنگی/زیستی/اقتصادی */}
          </div>
          ردیاب آگاهی جامع (80/20)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>فرکانس: {frequency.toFixed(2)} Hz | وحدت: {connection.toFixed(1)}%</span>
              <div className="flex gap-2">
                <button onClick={toggleSuperposition} className={`px-3 py-1 ${superposition ? 'bg-purple-600' : 'bg-gray-500'} text-white rounded`}>
                  {superposition ? 'خروج' : 'سوپرپوزیشن'}
                </button>
                <select onChange={(e) => handleIntent(e.target.value)} className="px-3 py-1 rounded">
                  <option value="">شکل‌دهی واقعیت</option>
                  <option value="creativity">خلاقیت</option>
                  <option value="peace">صلح</option>
                  <option value="prosperity">رفاه اقتصادی</option>
                  <option value="harmony">هماهنگی فرهنگی</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <button onClick={() => handleLayerShift('material')} className={`px-4 py-2 rounded-lg ${currentLayer === 'material' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                مادی
              </button>
              <button onClick={() => handleLayerShift('emotional')} className={`px-4 py-2 rounded-lg ${currentLayer === 'emotional' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                احساسی
              </button>
              <button onClick={() => handleLayerShift('quantum')} className={`px-4 py-2 rounded-lg ${currentLayer === 'quantum' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                کوانتومی
              </button>
              <button onClick={() => handleLayerShift('cultural')} className={`px-4 py-2 rounded-lg ${currentLayer === 'cultural' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                فرهنگی
              </button>
              <button onClick={() => handleLayerShift('biological')} className={`px-4 py-2 rounded-lg ${currentLayer === 'biological' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                زیستی
              </button>
              <button onClick={() => handleLayerShift('economic')} className={`px-4 py-2 rounded-lg ${currentLayer === 'economic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                اقتصادی
              </button>
            </div>
            <div className="mt-2">
              <span>ابر زمان:</span>
              <input type="range" min="0" max="100" value={timeCloud.past} onChange={(e) => handleTimeCloud('past', +e.target.value)} /> گذشته: {timeCloud.past.toFixed(1)}%
              <input type="range" min="0" max="100" value={timeCloud.present} onChange={(e) => handleTimeCloud('present', +e.target.value)} /> اکنون: {timeCloud.present.toFixed(1)}%
              <input type="range" min="0" max="100" value={timeCloud.future} onChange={(e) => handleTimeCloud('future', +e.target.value)} /> آینده: {timeCloud.future.toFixed(1)}%
            </div>
          </div>

          <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
            {superposition ? (
              <div className="w-full h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-pulse" />
            ) : (
              Object.entries(consciousness).map(([key, value], index) => (
                <div
                  key={key}
                  className="absolute h-full"
                  style={{
                    width: '2px',
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#f1c40f', '#e74c3c', '#3498db'][index],
                    left: `${(index + 1) * (100 / 7)}%`,
                    height: `${value}%`,
                    transition: 'height 0.5s ease',
                  }}
                />
              ))
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-bold text-right">سطوح آگاهی</h3>
              {Object.entries(consciousness).map(([key, value]) => (
                <div key={key} className="text-right">
                  {key}: {value.toFixed(1)}%
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-right">بینش‌ها</h3>
              {insights.map((insight, index) => (
                <p key={index} className="text-right">{insight}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsciousnessTracker;