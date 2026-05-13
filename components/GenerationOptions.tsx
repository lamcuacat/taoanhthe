import React, { useState } from 'react';
import CustomSelect, { CustomSelectOption } from './CustomSelect';

// Import all the new hairstyle icons
import { KeepOriginalIcon } from './icons/hairstyles/KeepOriginalIcon';
import { TidyUpIcon } from './icons/hairstyles/TidyUpIcon';
import { BobIcon } from './icons/hairstyles/BobIcon';
import { LongStraightIcon } from './icons/hairstyles/LongStraightIcon';
import { LongWavyIcon } from './icons/hairstyles/LongWavyIcon';
import { PonytailIcon } from './icons/hairstyles/PonytailIcon';
import { BunIcon } from './icons/hairstyles/BunIcon';
import { UndercutIcon } from './icons/hairstyles/UndercutIcon';
import { SidePartIcon } from './icons/hairstyles/SidePartIcon';
import { SlickBackIcon } from './icons/hairstyles/SlickBackIcon';
import { BuzzCutIcon } from './icons/hairstyles/BuzzCutIcon';
import { QuiffIcon } from './icons/hairstyles/QuiffIcon';
import { LongCurlyIcon } from './icons/hairstyles/LongCurlyIcon';


interface Attire {
  type: string;
  color: string;
}
interface GenerationOptionsProps {
  gender: 'Nam' | 'Nữ';
  onGenderChange: (value: 'Nam' | 'Nữ') => void;
  attire: Attire;
  onAttireChange: (value: Partial<Attire>) => void;
  hairstyle: string;
  onHairstyleChange: (value: string) => void;
  retouchLevel: string;
  onRetouchLevelChange: (value: string) => void;
  correctPosture: boolean;
  onCorrectPostureChange: (checked: boolean) => void;
  enhanceSymmetry: boolean;
  onEnhanceSymmetryChange: (checked: boolean) => void;
  lightingStyle: string;
  onLightingStyleChange: (value: string) => void;
  backgroundTone: string;
  onBackgroundToneChange: (value: string) => void;
  removeGlare: boolean;
  onRemoveGlareChange: (checked: boolean) => void;
  aspectRatio: string;
  onAspectRatioChange: (value: string) => void;
  autoZoom: boolean;
  onAutoZoomChange: (checked: boolean) => void;
}

const commonAttire = { 
    type: 'Áo sơ mi có cổ', 
    colors: [
      { name: 'trắng', hex: '#FFFFFF' },
      { name: 'xanh nhạt', hex: '#ADD8E6' },
      { name: 'xám', hex: '#CCCCCC' },
      { name: 'xanh đậm', hex: '#00008B' }
    ]
};

const vestAttire = {
    type: 'Áo vest', 
    colors: [
      { name: 'đen', hex: '#333333' },
      { name: 'xám đậm', hex: '#555555' },
      { name: 'xanh navy', hex: '#000080' },
      { name: 'xám than', hex: '#36454F' }
    ]
};

const maleAttireOptions = [
    commonAttire,
    vestAttire
];

const femaleAttireOptions = [
    commonAttire,
    vestAttire,
    { 
        type: 'Áo dài', 
        colors: [
          { name: 'trắng', hex: '#FFFFFF' },
          { name: 'hồng phấn', hex: '#FFC0CB' },
          { name: 'vàng', hex: '#FFD700' }
        ]
    }
];

const femaleHairstyleOptions: CustomSelectOption[] = [
    { value: 'Giữ nguyên kiểu tóc gốc', description: 'Không thay đổi kiểu tóc hiện tại của bạn.', icon: KeepOriginalIcon },
    { value: 'Làm cho tóc gọn gàng hơn', description: 'Dọn dẹp tóc bay, làm cho tóc trông chải chuốt hơn.', icon: TidyUpIcon },
    { value: 'Tóc búi gọn gàng', description: 'Tạo kiểu tóc búi cao hoặc thấp chuyên nghiệp.', icon: BunIcon },
    { value: 'Tóc đuôi ngựa thanh lịch', description: 'Tạo kiểu tóc đuôi ngựa buộc cao hoặc thấp.', icon: PonytailIcon },
    { value: 'Tóc bob ngang vai, rẽ ngôi lệch', description: 'Kiểu tóc ngắn ngang vai chuyên nghiệp, rẽ ngôi một bên.', icon: BobIcon },
    { value: 'Tóc dài thẳng mượt', description: 'Kiểu tóc dài cổ điển, được duỗi thẳng và mượt mà.', icon: LongStraightIcon },
    { value: 'Tóc dài gợn sóng nhẹ nhàng', description: 'Tóc dài với các lọn sóng tự nhiên, mềm mại.', icon: LongWavyIcon },
    { value: 'Tóc xoăn dài xù mì', description: 'Tóc dài với những lọn xoăn nhỏ, bồng bềnh.', icon: LongCurlyIcon },
];

const maleHairstyleOptions: CustomSelectOption[] = [
    { value: 'Giữ nguyên kiểu tóc gốc', description: 'Không thay đổi kiểu tóc hiện tại của bạn.', icon: KeepOriginalIcon },
    { value: 'Tóc nam cắt gọn gàng (Undercut)', description: 'Kiểu tóc ngắn chuyên nghiệp, hai bên và gáy cắt ngắn.', icon: UndercutIcon },
    { value: 'Tóc nam rẽ ngôi lệch phải', description: 'Tóc được chải gọn gàng và rẽ ngôi sang bên phải.', icon: SidePartIcon },
    { value: 'Tóc nam rẽ ngôi lệch trái', description: 'Tóc được chải gọn gàng và rẽ ngôi sang bên trái.', icon: SidePartIcon },
    { value: 'Tóc nam vuốt ngược (Slick back)', description: 'Kiểu tóc vuốt ngược lịch sự ra sau, không che trán.', icon: SlickBackIcon },
    { value: 'Tóc húi cua (Buzz cut)', description: 'Kiểu tóc cực ngắn, đơn giản và nam tính.', icon: BuzzCutIcon },
    { value: 'Tóc Quiff cổ điển', description: 'Kiểu tóc với phần mái dài được vuốt bồng lên và ra sau.', icon: QuiffIcon },
];


const retouchOptions = [
    { id: 'natural', value: 'Tự nhiên', description: 'Chỉ sửa lỗi ánh sáng, bóng.' },
    { id: 'enhanced', value: 'Nâng cao', description: 'Làm mịn da nhẹ, xóa khuyết điểm nhỏ.' },
];

const lightingOptions = [
    { value: 'Ánh sáng Studio mềm mại', description: 'Ánh sáng dịu, đều, giảm thiểu bóng gắt.'},
    { value: 'Ánh sáng phẳng, rõ nét', description: 'Đảm bảo mọi chi tiết trên khuôn mặt đều rõ ràng.'},
    { value: 'Thêm viền sáng nhẹ (Tách nền)', description: 'Tạo vầng sáng tinh tế quanh tóc và vai.'},
];

const backgroundOptions = [
    { name: 'Trắng', hex: '#FFFFFF' },
    { name: 'Trắng ngà', hex: '#F5F5DC' },
    { name: 'Xanh nhạt', hex: '#ADD8E6' },
    { name: 'Xanh dương', hex: '#4169E1' },
    { name: 'Xám nhạt', hex: '#D3D3D3' },
    { name: 'Xám đậm', hex: '#A9A9A9' },
];

const passportSizes = [
  { label: '4x6 cm (Phổ biến tại Việt Nam)', value: '4x6' },
  { label: '3x4 cm', value: '3x4' },
  { label: '4x4 cm', value: '4x4' },
];

const GenerationOptions: React.FC<GenerationOptionsProps> = (props) => {
    const { 
        gender, onGenderChange,
        attire, onAttireChange, 
        hairstyle, onHairstyleChange,
        retouchLevel, onRetouchLevelChange,
        correctPosture, onCorrectPostureChange,
        enhanceSymmetry, onEnhanceSymmetryChange,
        lightingStyle, onLightingStyleChange,
        backgroundTone, onBackgroundToneChange,
        removeGlare, onRemoveGlareChange,
        aspectRatio, onAspectRatioChange,
        autoZoom, onAutoZoomChange
    } = props;
    
    const currentHairstyleOptions = gender === 'Nữ' ? femaleHairstyleOptions : maleHairstyleOptions;
    const currentAttireOptions = gender === 'Nữ' ? femaleAttireOptions : maleAttireOptions;
    const selectedAttireData = currentAttireOptions.find(opt => opt.type === attire.type);

    const [showGuide, setShowGuide] = useState(false);

    const selectClassName = "w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white shadow-sm appearance-none";

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-800">2. Tùy chỉnh ảnh của bạn</h2>
                <button 
                    onClick={() => setShowGuide(!showGuide)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {showGuide ? 'Ẩn hướng dẫn' : 'Hướng dẫn chi tiết'}
                </button>
            </div>

            {showGuide && (
                <div className="mb-6 p-4 bg-indigo-50/80 border border-indigo-100 rounded-lg text-sm text-indigo-900 space-y-3 shadow-sm">
                    <p><strong>📐 Kích thước & Trọng tâm:</strong> Chọn kích thước phù hợp thể loại ảnh. <em>"Tự động phóng to"</em> rất quan trọng, giúp AI tự canh chỉnh khuôn mặt vào giữa, đảm bảo khuôn mặt chiếm ~75% diện tích ảnh (tỷ lệ chuẩn cho hộ chiếu/visa).</p>
                    <p><strong>🎨 Màu nền:</strong> Nền trắng hoặc xanh dương thường được yêu cầu. Hãy chọn màu trang phục sao cho tương phản tốt với màu nền bạn chọn.</p>
                    <p><strong>👔 Trang phục & Kiểu tóc:</strong> AI sẽ thay thế trang phục cũ bằng trang phục bạn chọn. <em>"Giữ nguyên kiểu tóc gốc"</em> là an toàn nhất để tránh làm biến dạng gương mặt. Thay đổi kiểu tóc có thể làm AI tạo ra một số nét khác lạ.</p>
                    <p><strong>✨ Ánh sáng & Chỉnh sửa:</strong> <em>Ánh sáng phẳng</em> giúp chiếu rõ toàn bộ khuôn mặt (khuyên dùng cho visa). <strong>Lưu ý:</strong> Chỉnh sửa ở mức <em>Nâng cao</em> có thể làm mất các nét tự nhiên như nốt ruồi hay vết nhăn vốn bắt buộc phải giữ lại trên giấy tờ tùy thân.</p>
                    <p><strong>⚖️ Cân xứng & Tư thế:</strong> Bật các tính năng này nếu ảnh gốc của bạn bị nghiêng đầu, vai hai bên cao thấp không đều, hoặc bạn muốn AI tự động sửa lại tư thế thẳng thắn nhất.</p>
                </div>
            )}

            <div className="space-y-8">
                
                {/* Aspect Ratio */}
                <div>
                    <label htmlFor="aspect-ratio-select" className="block font-semibold text-slate-700 mb-2">Kích thước ảnh</label>
                    <div className="relative">
                        <select
                            id="aspect-ratio-select"
                            value={aspectRatio}
                            onChange={(e) => onAspectRatioChange(e.target.value)}
                            className={selectClassName}
                        >
                            {passportSizes.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Background Tone */}
                 <div>
                    <label className="block font-semibold text-slate-700 mb-2">Màu nền</label>
                    <div className="flex flex-wrap gap-3 items-center">
                        {backgroundOptions.map(color => (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => onBackgroundToneChange(color.name)}
                                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${backgroundTone === color.name ? 'border-indigo-600 ring-2 ring-offset-1 ring-indigo-500' : 'border-gray-300 hover:border-gray-400'}`}
                                style={{ backgroundColor: color.hex }}
                                aria-label={`Chọn màu ${color.name}`}
                            >
                              <span className="sr-only">{color.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Gender Grouped Options */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <label className="block font-semibold text-slate-700 mb-3 text-lg">Trang phục & Kiểu tóc</label>

                    {/* Gender Toggle */}
                    <div className="w-full bg-slate-200 rounded-lg flex p-1 mb-6">
                        <button 
                            onClick={() => onGenderChange('Nam')}
                            className={`flex-1 font-semibold p-2 rounded-md transition-all duration-300 ${gender === 'Nam' ? 'bg-white shadow text-indigo-700' : 'bg-transparent text-slate-500 hover:bg-slate-300'}`}
                        >
                            Nam
                        </button>
                        <button 
                            onClick={() => onGenderChange('Nữ')}
                            className={`flex-1 font-semibold p-2 rounded-md transition-all duration-300 ${gender === 'Nữ' ? 'bg-white shadow text-indigo-700' : 'bg-transparent text-slate-500 hover:bg-slate-300'}`}
                        >
                            Nữ
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Attire Options */}
                        <div>
                            <label htmlFor="attire-type-select" className="block font-semibold text-slate-700 mb-2">Trang phục</label>
                            <div className="relative">
                                <select
                                  id="attire-type-select"
                                  value={attire.type}
                                  onChange={(e) => {
                                      const selectedType = e.target.value;
                                      const newColor = currentAttireOptions.find(opt => opt.type === selectedType)?.colors?.[0]?.name || 'trắng';
                                      onAttireChange({ type: selectedType, color: newColor });
                                  }}
                                  className={selectClassName}
                                >
                                  {currentAttireOptions.map(option => (
                                      <option key={option.type} value={option.type}>
                                          {option.type}
                                      </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-3 items-center">
                                <span className="text-sm font-medium text-slate-600">Màu sắc:</span>
                                {selectedAttireData?.colors?.map(color => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => onAttireChange({ color: color.name })}
                                        className={`w-9 h-9 rounded-full border-2 transition-all ${attire.color === color.name ? 'border-indigo-600 ring-2 ring-offset-1 ring-indigo-500' : 'border-gray-300 hover:border-gray-400'}`}
                                        style={{ backgroundColor: color.hex }}
                                        aria-label={`Chọn màu ${color.name}`}
                                    >
                                        <span className="sr-only">{color.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hairstyle Options */}
                        <div>
                            <label htmlFor="hairstyle-select" className="block font-semibold text-slate-700 mb-2">Kiểu tóc</label>
                            <CustomSelect
                                id="hairstyle-select"
                                options={currentHairstyleOptions}
                                value={hairstyle}
                                onChange={onHairstyleChange}
                            />
                        </div>
                    </div>
                </div>


                {/* Lighting Style */}
                <div>
                    <label htmlFor="lighting-select" className="block font-semibold text-slate-700 mb-2">Kiểu Ánh sáng</label>
                    <div className="relative">
                        <select
                            id="lighting-select"
                            value={lightingStyle}
                            onChange={(e) => onLightingStyleChange(e.target.value)}
                            className={selectClassName}
                        >
                            {lightingOptions.map(option => (
                                <option key={option.value} value={option.value} title={option.description}>
                                    {option.value}
                                </option>
                            ))}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Retouch Level */}
                <div>
                    <label htmlFor="retouch-select" className="block font-semibold text-slate-700 mb-2">Mức độ chỉnh sửa ảnh</label>
                    <div className="relative">
                        <select
                            id="retouch-select"
                            value={retouchLevel}
                            onChange={(e) => onRetouchLevelChange(e.target.value)}
                            className={selectClassName}
                        >
                            {retouchOptions.map(option => (
                                <option key={option.id} value={option.value} title={option.description}>
                                    {option.value}
                                </option>
                            ))}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col gap-4 pt-2">
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="posture-checkbox"
                                name="posture"
                                type="checkbox"
                                checked={correctPosture}
                                onChange={(e) => onCorrectPostureChange(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="posture-checkbox" className="font-medium text-slate-900 cursor-pointer">
                                Tự động sửa tư thế
                            </label>
                            <p className="text-slate-500">Cho phép AI tự động điều chỉnh đầu và vai cho thẳng.</p>
                        </div>
                    </div>
                     <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="symmetry-checkbox"
                                name="symmetry"
                                type="checkbox"
                                checked={enhanceSymmetry}
                                onChange={(e) => onEnhanceSymmetryChange(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="symmetry-checkbox" className="font-medium text-slate-900 cursor-pointer">
                                Tăng cường độ cân xứng
                            </label>
                            <p className="text-slate-500">AI sẽ phân tích và điều chỉnh nhẹ để vai và các đặc điểm trên khuôn mặt cân xứng hơn.</p>
                        </div>
                    </div>
                     <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="glare-checkbox"
                                name="glare"
                                type="checkbox"
                                checked={removeGlare}
                                onChange={(e) => onRemoveGlareChange(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="glare-checkbox" className="font-medium text-slate-900 cursor-pointer">
                                Khử lóa kính (nếu có)
                            </label>
                            <p className="text-slate-500">Cố gắng loại bỏ phản xạ ánh sáng trên tròng kính.</p>
                        </div>
                    </div>
                     <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="zoom-checkbox"
                                name="zoom"
                                type="checkbox"
                                checked={autoZoom}
                                onChange={(e) => onAutoZoomChange(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="zoom-checkbox" className="font-medium text-slate-900 cursor-pointer">
                                Tự động phóng to & căn chỉnh khuôn mặt
                            </label>
                            <p className="text-slate-500">Khuôn mặt chiếm ~75% ảnh, đáp ứng tỷ lệ chuẩn hộ chiếu.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationOptions;