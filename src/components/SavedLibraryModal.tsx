import React from 'react';
import { SavedProject } from '../types';
import { X, FolderOpen, Trash2, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface SavedLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: SavedProject[];
  onLoadProject: (proj: SavedProject) => void;
  onDeleteProject: (id: string) => void;
}

export const SavedLibraryModal: React.FC<SavedLibraryModalProps> = ({
  isOpen,
  onClose,
  projects,
  onLoadProject,
  onDeleteProject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-white/40">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200/80 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm">
              <FolderOpen className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Thư Viện Dự Án Đã Lưu</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-stone-200/60 text-stone-400 flex items-center justify-center mx-auto">
                <FolderOpen className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-stone-700">Chưa có dự án nào được lưu</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Sau khi tạo bộ prompt cho sản phẩm, hãy bấm nút "Lưu dự án" để xem lại bất cứ lúc nào.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden border border-stone-200 shrink-0">
                      {proj.thumbnail && (
                        <img src={proj.thumbnail} alt={proj.productName} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-stone-900 text-xs truncate group-hover:text-amber-700 transition-colors">
                        {proj.productName}
                      </h4>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {new Date(proj.createdAt).toLocaleDateString('vi-VN')} {new Date(proj.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Xóa dự án"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onLoadProject(proj);
                        onClose();
                      }}
                      className="flex items-center space-x-1 px-3.5 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-2xs"
                    >
                      <span>Mở lại</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-t border-stone-200/80 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
