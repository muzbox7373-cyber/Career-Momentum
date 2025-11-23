import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, CheckCircle, Clock, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../components/Button';
import { HERO_BG, FEATURE_IMG_1 } from '../src/images/assets';
import { REVIEWS } from '../src/constants';

const chartData = [
  { month: '시작 전', performance: 30 },
  { month: '1개월', performance: 45 },
  { month: '2개월', performance: 60 },
  { month: '3개월', performance: 85 },
  { month: '6개월', performance: 100 },
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_BG} 
            alt="Office Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-6 border border-secondary/50">
            주니어 직장인 전용 1:1 멘토링
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            3년 차 주니어의 커리어 정체기,<br />
            1시간 만에 돌파구를 찾으세요.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            현직 10년 차 팀장의 실전 피드백.<br className="md:hidden"/> 막막한 고민을 실행 가능한 계획으로 바꿔드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" variant="secondary" className="shadow-lg hover:scale-105 transition-transform">
                지금 바로 상담 예약하기 (잔여 2석)
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                멘토 프로필 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                열심히 하는데 성과가 안 나나요?<br />
                이직 타이밍이 고민이신가요?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                혼자 고민하는 시간은 불안만 키울 뿐입니다. 
                객관적인 시각으로 현재 위치를 진단하고, 
                넥스트 스텝을 위한 구체적인 로드맵을 그려드립니다.
              </p>
              <ul className="space-y-4">
                {[
                  "내 물경력이 걱정되는 3-5년차",
                  "사수 없이 일하며 성장이 멈춘 것 같은 분",
                  "팀장님과의 커뮤니케이션이 어려운 분"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-secondary h-6 w-6 flex-shrink-0" />
                    <span className="text-darkGray font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={FEATURE_IMG_1} alt="Growth" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-6 backdrop-blur-sm">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  예상 성장 그래프
                </h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="performance" 
                        stroke="#ED8936" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#ED8936', strokeWidth: 2, stroke: '#fff' }} 
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-softGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">이미 많은 주니어들이 변화를 경험했습니다</h2>
            <p className="text-gray-500">실제 수강생들의 생생한 후기를 확인하세요.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{review.content}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-darkGray">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          커리어 성장은 타이밍입니다.
        </h2>
        <p className="text-blue-100 mb-10 text-lg">
          고민만 하다가 놓친 기회, 이번에는 잡으세요.
        </p>
        <Link to="/booking">
          <Button size="lg" variant="secondary" className="text-lg px-12 py-4 shadow-xl">
            오늘 상담 예약하고 변화 시작하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;