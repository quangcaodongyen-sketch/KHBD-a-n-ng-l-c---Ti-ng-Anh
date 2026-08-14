import React, { useState } from 'react';
import { GradeLevel, LessonType, QuickSelectionPayload } from '../types';
import {
  GLOBAL_SUCCESS_GRADES,
  CURRICULUM_DATA,
  LESSON_TYPES,
} from '../data/globalSuccessCurriculum';
import { BookMarked, Layers, Users, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';

interface GlobalSuccessSelectorProps {
  onSelectSubmit: (payload: QuickSelectionPayload) => void;
  isLoading: boolean;
}

export const GlobalSuccessSelector: React.FC<GlobalSuccessSelectorProps> = ({
  onSelectSubmit,
  isLoading,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Grade 6');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [selectedLessonType, setSelectedLessonType] = useState<LessonType>('Getting Started');
  const [customTopicDetails, setCustomTopicDetails] = useState<string>('');
  
  // Optional Class Profile
  const [totalStudents, setTotalStudents] = useState<number>(40);
  const [supportGroupPct, setSupportGroupPct] = useState<number>(20);
  const [challengeGroupPct, setChallengeGroupPct] = useState<number>(20);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [showProfileConfig, setShowProfileConfig] = useState<boolean>(false);

  const currentGradeUnits = CURRICULUM_DATA[selectedGrade] || [];
  const selectedUnit = currentGradeUnits.find((u) => u.number === selectedUnitNumber) || currentGradeUnits[0];

  const handleGradeChange = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setSelectedUnitNumber(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnit) return;

    onSelectSubmit({
      grade: selectedGrade,
      unitNumber: selectedUnit.number,
      unitTitle: selectedUnit.title,
      lessonType: selectedLessonType,
      keyGrammarAndVocab: selectedUnit.keyGrammarAndVocab,
      customTopicDetails: customTopicDetails.trim() || undefined,
      classProfile: {
        totalStudents,
        supportGroupPct,
        challengeGroupPct,
        specialNotes: specialNotes.trim() || undefined,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Grade Selector Tabs */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
          1. Chọn Khối Lớp (Grade Level)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {GLOBAL_SUCCESS_GRADES.map((grade) => {
            const isSelected = selectedGrade === grade;
            return (
              <button
                key={grade}
                type="button"
                onClick={() => handleGradeChange(grade)}
                className={`py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center space-x-2 border ${
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/20 font-semibold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <BookMarked className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary-500'}`} />
                <span>{grade}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit Selector Dropdown / Cards */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
          2. Chọn Bài Học (Unit) trong SGK {selectedGrade}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <select
              value={selectedUnitNumber}
              onChange={(e) => setSelectedUnitNumber(Number(e.target.value))}
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium shadow-sm"
            >
              {currentGradeUnits.map((u) => (
                <option key={u.number} value={u.number}>
                  Unit {u.number}: {u.title}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-7 bg-primary-50/60 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/50 rounded-xl p-3.5 flex items-start space-x-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-700 dark:text-primary-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-primary-950 dark:text-primary-100">
                Unit {selectedUnit?.number}: {selectedUnit?.title}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Chủ đề:</span> {selectedUnit?.topic}
              </p>
              {selectedUnit?.keyGrammarAndVocab && (
                <p className="text-primary-800 dark:text-primary-300 font-medium">
                  <span className="text-slate-600 dark:text-slate-400 font-normal">Trọng tâm:</span> {selectedUnit.keyGrammarAndVocab}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Type Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
          3. Chọn Tiết Học Cụ Thể (Lesson Period)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {LESSON_TYPES.map((item) => {
            const isSelected = selectedLessonType === item.type;
            return (
              <button
                key={item.type}
                type="button"
                onClick={() => setSelectedLessonType(item.type)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-primary-600 ring-2 ring-primary-500/20 shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/80 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-semibold text-xs px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isSelected && <ChevronRight className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Custom Topic Details */}
      <div>
        <label className="block text-xs font-semibold tracking-wide text-slate-700 mb-1.5">
          Ghi chú hoặc mục tiêu bổ sung cho tiết học này (Tùy chọn)
        </label>
        <input
          type="text"
          value={customTopicDetails}
          onChange={(e) => setCustomTopicDetails(e.target.value)}
          placeholder="Ví dụ: Tập trung kỹ năng Đọc lướt (Skimming), nhấn mạnh cấu trúc Thì Hiện tại đơn với trạng từ tần suất..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-slate-400"
        />
      </div>

      {/* Class Profile Configuration Toggle */}
      <div className="border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={() => setShowProfileConfig(!showProfileConfig)}
          className="flex items-center space-x-2 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
        >
          <Users className="w-4 h-4" />
          <span>{showProfileConfig ? 'Ẩn cấu hình đặc điểm lớp học' : '+ Thêm đặc điểm đối tượng lớp học (Sĩ số, tỉ lệ HS yếu/giỏi)'}</span>
        </button>

        {showProfileConfig && (
          <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Sĩ số lớp:</label>
              <input
                type="number"
                value={totalStudents}
                onChange={(e) => setTotalStudents(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-medium">% HS Cần hỗ trợ (Yếu/Kém):</label>
              <input
                type="number"
                value={supportGroupPct}
                onChange={(e) => setSupportGroupPct(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-medium">% HS Mở rộng (Khá/Giỏi):</label>
              <input
                type="number"
                value={challengeGroupPct}
                onChange={(e) => setChallengeGroupPct(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-slate-600 mb-1 font-medium">Lưu ý sư phạm riêng về lớp:</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Ví dụ: Lớp nhiều học sinh rụt rè khi nói, 3 học sinh giỏi có khả năng trợ giảng..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer
          ${isLoading 
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed animate-pulse'
            : 'bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white shadow-lg shadow-primary-600/25 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
            <span>Đang phân tích & khởi tạo định hướng đa năng lực...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Xuất Định Hướng Giáo Án Đa Năng Lực Global Success</span>
          </>
        )}
      </button>
    </form>
  );
};
