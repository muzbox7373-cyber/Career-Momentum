import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, CheckCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { BOOKING_HEADER } from '../src/images/assets';
import { TIME_SLOTS } from '../src/constants';

// Helper to generate simple calendar days
const getNextDays = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
};

const BookingPage: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    concerns: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setDates(getNextDays(14)); // Show next 2 weeks
    // Select tomorrow by default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  const formatDateDisplay = (date: Date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  
  const getDayName = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">예약이 확정되었습니다!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          {formData.name}님, 선택하신 일정에 뵙겠습니다.<br />
          입력하신 이메일({formData.email})로 구글 미트 링크를 보내드렸습니다.
        </p>
        <div className="bg-gray-50 p-6 rounded-xl w-full max-w-sm mb-8 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">날짜</span>
            <span className="font-bold text-darkGray">
              {selectedDate ? `${selectedDate.getFullYear()}년 ${formatDateDisplay(selectedDate)}` : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">시간</span>
            <span className="font-bold text-darkGray">{selectedTime}</span>
          </div>
        </div>
        <Link to="/">
          <Button variant="secondary">홈으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-softGray min-h-screen pb-20">
      {/* Header Image */}
      <div className="h-48 md:h-64 relative overflow-hidden">
        <img src={BOOKING_HEADER} alt="Booking" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">상담 예약하기</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex gap-4 mb-6">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium">
            <ArrowLeft className="h-4 w-4 mr-1" /> 홈으로 돌아가기
          </Link>
          <span className="text-white/50">|</span>
          <Link to="/profile" className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium">
            <User className="h-4 w-4 mr-1" /> 멘토 프로필 다시보기
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Calendar & Time */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Step 1: Date Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                1. 날짜 선택
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {dates.map((date, i) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  // Disable weekends for business simulation
                  const isDisabled = isWeekend; 
                  
                  return (
                    <button
                      key={i}
                      disabled={isDisabled}
                      onClick={() => handleDateSelect(date)}
                      className={`
                        p-2 rounded-lg text-center transition-all border
                        ${isSelected 
                          ? 'bg-primary text-white border-primary ring-2 ring-primary ring-offset-1' 
                          : isDisabled 
                            ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' 
                            : 'bg-white text-darkGray border-gray-200 hover:border-secondary hover:text-secondary'}
                      `}
                    >
                      <span className="block text-xs mb-1 opacity-70">{getDayName(date)}</span>
                      <span className="block font-bold text-lg">{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                2. 시간 선택
              </h2>
              {!selectedDate ? (
                <p className="text-gray-400 text-sm">위에서 날짜를 먼저 선택해주세요.</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(TIME_SLOTS).map(([period, times]) => (
                    <div key={period}>
                      <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase">
                        {period === 'morning' ? '오전' : period === 'afternoon' ? '오후' : '저녁'}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {times.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              py-2 px-3 rounded-lg font-medium border transition-all text-sm
                              ${selectedTime === time
                                ? 'bg-secondary text-white border-secondary shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary'}
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 3: User Info Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-4">3. 사전 질문지 작성</h2>
              <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                      placeholder="김커리어"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">현재 직무 및 연차</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                    placeholder="예: 마케터 3년차"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">가장 큰 고민 1가지</label>
                  <textarea
                    name="concerns"
                    required
                    rows={4}
                    value={formData.concerns}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none resize-none"
                    placeholder="상담을 통해 해결하고 싶은 가장 주된 고민을 구체적으로 적어주세요."
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Summary Sticky */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border-t-4 border-primary">
              <h3 className="text-lg font-bold text-darkGray mb-4">예약 요약</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">날짜</span>
                  <span className={`font-medium ${selectedDate ? 'text-primary' : 'text-gray-300'}`}>
                    {selectedDate ? formatDateDisplay(selectedDate) : '미선택'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">시간</span>
                  <span className={`font-medium ${selectedTime ? 'text-primary' : 'text-gray-300'}`}>
                    {selectedTime || '미선택'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">비용</span>
                  <span className="font-bold text-secondary">50,000원</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="booking-form"
                fullWidth 
                disabled={!selectedDate || !selectedTime || !formData.name}
                className={`transition-all ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
              >
                예약 확정하기
              </Button>
              <p className="text-xs text-gray-400 mt-4 text-center">
                예약 확정 시 이메일로 안내드립니다.<br/>
                24시간 전까지 100% 환불 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;