import React, { useState } from 'react';
import { SavedDirective } from '../types';
import { X, Search, Trash2, ExternalLink, Calendar, BookOpen, Bookmark } from 'lucide-react';

interface SavedDirectivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedDirectives: SavedDirective[];
  onSelectDirective: (directive: SavedDirective) => void;
  onDeleteDirective: (id: string) => void;
}

export const SavedDirectivesModal: React.FC<SavedDirectivesModalProps> = ({
  isOpen,
  onClose,
  savedDirectives,
  onSelectDirective,
  onDeleteDirective,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredList = savedDirectives.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.markdownContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade =
      selectedGradeFilter === 'ALL' || item.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">
                Lịch Sử Giáo Án Đã Lưu ({savedDirectives.length})
              </h2>
              <p className="text-xs text-slate-400">
                Danh sách các bản định hướng giáo án phân hóa Global Success đã lưu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo từ khóa hoặc bài học..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs text-slate-800"
            >
              <option value="ALL">Tất cả khối lớp</option>
              <option value="Grade 6">Grade 6 / Lớp 6</option>
              <option value="Grade 7">Grade 7 / Lớp 7</option>
              <option value="Grade 8">Grade 8 / Lớp 8</option>
              <option value="Grade 9">Grade 9 / Lớp 9</option>
            </select>
          </div>
        </div>

        {/* List Content */}
        <div className="p-4 max-h-[480px] overflow-y-auto space-y-3">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">Chưa có bản định hướng giáo án nào được lưu.</p>
              <p className="text-xs text-slate-400 mt-1">
                Tạo giáo án mới và nhấn nút "Lưu" để xem lại tại đây!
              </p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                      {item.grade}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.markdownContent.slice(0, 120)}...
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onSelectDirective(item);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
                  >
                    <span>Xem lại</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteDirective(item.id)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs transition-colors"
                    title="Xóa giáo án này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
