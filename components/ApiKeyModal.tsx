import React, { useState, useEffect } from 'react';
import { Key, X, ExternalLink } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem('gemini_api_key') || '');
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    onClose();
    // Tải lại trang để service nhận key mới
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Key className="text-indigo-600 w-6 h-6" /> Nạp Khóa API
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-5 text-sm text-slate-600 bg-slate-50/50">
          <p className="text-base text-slate-700 leading-relaxed">
            Hệ thống cần <strong>Gemini API Key</strong> để cho phép công cụ AI xử lý ảnh của bạn. Khóa API này <strong>chỉ được lưu trữ an toàn trên trình duyệt của bạn</strong>, không gửi đến máy chủ của chúng tôi.
          </p>
          
          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-3">
            <h3 className="font-bold text-indigo-900 text-base">📘 Hướng dẫn lấy khóa API (1 phút):</h3>
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm mb-3">
              <strong>Lưu ý quan trọng:</strong> Vì chức năng tạo ảnh sử dụng mô hình đặc biệt, mức sử dụng miễn phí (Free Tier) hiện tại bằng 0. Bạn cần phải chọn "Set up billing" (thiết lập thanh toán thẻ) khi tạo/chọn khóa API mới có thể sử dụng (bạn chưa bị trừ tiền ngay lập tức mà chỉ để mở khóa hạn mức).
            </div>
            <ol className="list-decimal ml-5 space-y-2.5 text-slate-700">
              <li>Truy cập trang web <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline gap-1 inline-flex items-center">Google AI Studio <ExternalLink className="w-3.5 h-3.5"/></a></li>
              <li>Đăng nhập bằng tài khoản Google của bạn</li>
              <li>Nhấn nút màu xanh <strong>"Create API key"</strong></li>
              <li>Chọn dự án của bạn và đảm bảo bạn <strong>đã chọn "Set up billing"</strong> để thiết lập thanh toán</li>
              <li>Nhấn <strong>"Copy"</strong> đoạn mã vừa tạo <br/><span className="text-xs text-slate-400">(Thường bắt đầu bằng <code>AIzaSy...</code>)</span></li>
            </ol>
          </div>

          <div className="space-y-2.5 pt-2">
            <label className="font-bold text-slate-800">Nhập hoặc Dán API Key của bạn vào đây:</label>
            <input 
              type="text"
              placeholder="AIzaSy............................."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm outline-none font-mono tracking-wide text-slate-800 text-base"
            />
          </div>
        </div>
        <div className="p-5 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-3xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            Đóng
          </button>
          <button 
            onClick={handleSave} 
            disabled={!apiKey.trim()}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2"
          >
            Nạp Khóa API
          </button>
        </div>
      </div>
    </div>
  );
}
