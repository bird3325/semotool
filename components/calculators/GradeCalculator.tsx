
import React, { useState } from 'react';
import { TrendingUp, Plus, Trash2 } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

const gradeOptions = [
  { name: 'A+', value: 4.5 }, { name: 'A', value: 4.0 },
  { name: 'B+', value: 3.5 }, { name: 'B', value: 3.0 },
  { name: 'C+', value: 2.5 }, { name: 'C', value: 2.0 },
  { name: 'D+', value: 1.5 }, { name: 'D', value: 1.0 },
  { name: 'F', value: 0.0 },
];
const gradePoints: { [key: string]: number } = Object.fromEntries(gradeOptions.map(g => [g.name, g.value]));

const creditOptions = [
    { value: '1', label: '1학점' },
    { value: '2', label: '2학점' },
    { value: '3', label: '3학점' },
    { value: '4', label: '4학점' },
    { value: '5', label: '5학점' },
];

const gradeSelectOptions = gradeOptions.map(g => ({
    value: g.name,
    label: g.name
}));

const GradeCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState('3');
  const [grade, setGrade] = useState('A+');
  const [result, setResult] = useState<{ gpa: number; totalCredits: number } | null>(null);

  const handleAddCourse = () => {
    if (credits && grade) {
      const newCourse: Course = { id: Date.now(), name: courseName, credits, grade };
      setCourses([...courses, newCourse]);
      setCourseName('');
      setCredits('3');
      setGrade('A+');
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };
  
  const handleCalculate = () => {
    if (courses.length === 0) {
        setResult(null);
        return;
    }
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    courses.forEach(course => {
      const creditValue = parseFloat(course.credits);
      const gradePoint = gradePoints[course.grade];
      if (!isNaN(creditValue) && gradePoint !== undefined) {
        totalCredits += creditValue;
        totalGradePoints += creditValue * gradePoint;
      }
    });

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    setResult({ gpa, totalCredits });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <TrendingUp size={28} />
          <h2 className="text-2xl font-bold">학점 계산기</h2>
        </div>
        <p className="mt-1 opacity-90">예상 학점을 간단하게 계산!</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">과목명 (선택)</label>
            <input 
                type="text" 
                placeholder="과목명을 입력하세요" 
                value={courseName} 
                onChange={e => setCourseName(e.target.value)} 
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none font-bold" 
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <SelectModal 
                label="학점"
                options={creditOptions}
                value={credits}
                onChange={setCredits}
                colorClass="text-rose-600"
            />
            <SelectModal 
                label="성적"
                options={gradeSelectOptions}
                value={grade}
                onChange={setGrade}
                colorClass="text-rose-600"
            />
        </div>

        <button onClick={handleAddCourse} className="w-full flex items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black rounded-lg transition-all active:scale-95 shadow-sm">
          <Plus size={20} className="mr-2"/> 과목 추가하기
        </button>
      </div>
      
       {courses.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <div className="flex justify-between items-center mb-2 px-2">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">과목 목록</h3>
                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">{courses.length}개 과목</span>
            </div>
            <div className="space-y-2">
                {courses.map(course => (
                  <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-rose-100 transition-colors">
                    <span className="flex-1 font-bold text-gray-800">{course.name || '과목'}</span>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-bold text-gray-500">{course.credits}학점</span>
                        <span className="w-8 text-center font-black text-rose-600">{course.grade}</span>
                        <button onClick={() => handleDeleteCourse(course.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16}/>
                        </button>
                    </div>
                  </div>
                ))}
            </div>
             <button onClick={handleCalculate} className="w-full mt-6 p-4 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl text-lg transition-transform active:scale-95 shadow-lg shadow-rose-100">
                평균 학점 계산하기
            </button>
        </div>
      )}

      <AdBanner />

      {result && (
        <div className="p-8 bg-white border border-rose-100 rounded-3xl shadow-xl text-center animate-in zoom-in-95 duration-500">
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">GPA Calculation Result</p>
            <div className="inline-block px-6 py-2 bg-rose-50 rounded-full mb-4">
                <p className="text-rose-600 font-bold">총 {result.totalCredits}학점 이수</p>
            </div>
            <p className="text-6xl font-black text-blue-600 my-2 tracking-tighter">
                {result.gpa.toFixed(2)} <span className="text-2xl text-gray-300">/ 4.5</span>
            </p>
            <p className="text-xs font-bold text-gray-400 mt-4 leading-relaxed">
                ※ 위 계산 결과는 입력된 성적을 바탕으로 한 산술 평균값입니다.
            </p>
        </div>
      )}
    </div>
  );
};

export default GradeCalculator;
