import React, { useState } from 'react';
import { TrendingUp, Plus, Trash2 } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

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
      
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <input type="text" placeholder="과목명 (선택)" value={courseName} onChange={e => setCourseName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
          <select value={credits} onChange={e => setCredits(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
            {[...Array(5)].map((_, i) => <option key={i} value={i+1}>{i+1}학점</option>)}
          </select>
          <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
             {gradeOptions.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
          </select>
        </div>
        <button onClick={handleAddCourse} className="w-full flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition">
          <Plus size={20} className="mr-2"/> 과목 추가하기
        </button>
      </div>
      
       {courses.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <h3 className="text-sm font-semibold mb-2 px-2">과목 목록</h3>
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex-1 font-medium">{course.name || '과목'}</span>
                <span className="w-16 text-center text-gray-600">{course.credits}학점</span>
                <span className="w-16 text-center font-semibold">{course.grade}</span>
                <button onClick={() => handleDeleteCourse(course.id)} className="p-1 text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
              </div>
            ))}
             <button onClick={handleCalculate} className="w-full mt-4 p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                계산하기
            </button>
        </div>
      )}

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">계산 결과</p>
            <p className="text-4xl font-bold text-blue-600 my-2">
                {result.gpa.toFixed(2)} / 4.5
            </p>
            <p className="text-md text-gray-700">
                총 {result.totalCredits}학점
            </p>
        </div>
      )}
    </div>
  );
};

export default GradeCalculator;
