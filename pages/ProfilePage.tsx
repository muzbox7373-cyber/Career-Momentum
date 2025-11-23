import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Award, Users, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import { PROFILE_PIC, COMPANY_LOGO_1, COMPANY_LOGO_2 } from '../src/images/assets';
import { FAQS } from '../src/constants';

const ProfilePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Profile Header */}
      <section className="bg-white py-12 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-secondary rounded-full transform translate-x-3 translate-y-3"></div>
              <img 
                src={PROFILE_PIC} 
                alt="Mentor Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-secondary font-bold tracking-wide uppercase text-sm mb-2 block">Premium Mentoring</span>
              <h1 className="text-4xl font-bold text-primary mb-4">김멘토</h1>
              <p className="text-xl text-gray-600 mb-6">
                "성장의 방향을 잃은 주니어들에게 나침반이 되어드립니다."
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center md:items-start">
                  <Award className="text-primary h-6 w-6 mb-2" />
                  <span className="text-sm text-gray-500">경력</span>
                  <span className="font-bold text-darkGray">10년차 팀장</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center md:items-start">
                  <Users className="text-primary h-6 w-6 mb-2" />
                  <span className="text-sm text-gray-500">누적 멘티</span>
                  <span className="font-bold text-darkGray">500+ 명</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center md:items-start">
                  <BookOpen className="text-primary h-6 w-6 mb-2" />
                  <span className="text-sm text-gray-500">전문 분야</span>
                  <span className="font-bold text-darkGray">기획 / PM</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 grayscale opacity-70 mb-8">
                <img src={COMPANY_LOGO_1} alt="Company 1" className="h-8" />
                <div className="h-4 w-px bg-gray-300"></div>
                <img src={COMPANY_LOGO_2} alt="Company 2" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Career */}
      <section className="py-16 bg-softGray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">주요 경력 및 이력</h2>
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-24 font-bold text-gray-400 text-sm pt-1">2020 - 현재</div>
              <div>
                <h3 className="font-bold text-lg text-darkGray">Tech Corp 프로덕트 총괄 팀장</h3>
                <p className="text-gray-600">신규 서비스 런칭 및 MAU 100만 달성 주도. 주니어 PM 10명 육성.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 font-bold text-gray-400 text-sm pt-1">2017 - 2020</div>
              <div>
                <h3 className="font-bold text-lg text-darkGray">Startup Inc 시니어 기획자</h3>
                <p className="text-gray-600">시리즈 B 투자 유치 핵심 멤버. 데이터 기반 의사결정 시스템 구축.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 font-bold text-gray-400 text-sm pt-1">2014 - 2017</div>
              <div>
                <h3 className="font-bold text-lg text-darkGray">First Web 주니어 기획자</h3>
                <p className="text-gray-600">비전공자로 입사하여 웹 서비스 기획 기초 및 실무 경험 축적.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-10 text-center">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-darkGray flex gap-3">
                    <span className="text-secondary">Q.</span>
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="p-5 bg-softGray border-t border-gray-100 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-0 right-0 px-4 md:hidden z-40">
        <Link to="/booking">
          <Button fullWidth variant="secondary" className="shadow-2xl">
            지금 상담 예약하기
          </Button>
        </Link>
      </div>
      
      {/* Desktop Bottom CTA */}
      <div className="hidden md:block text-center py-12 bg-primary/5">
        <p className="mb-4 text-gray-600">더 궁금한 점이 있으신가요? 상담을 통해 직접 물어보세요.</p>
        <Link to="/booking">
            <Button variant="primary">상담 예약하러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;