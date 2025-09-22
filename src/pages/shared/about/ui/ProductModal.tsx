import React from 'react';
import { X, ExternalLink, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: React.ReactNode;
  color: string;
  url: string;
  features: string[];
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-white`}>
                {product.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-600">{product.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Описание</h4>
            <p className="text-slate-600 leading-relaxed">{product.fullDescription}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Основные возможности</h4>
            <div className="grid gap-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 bg-gradient-to-br ${product.color} rounded-full flex items-center justify-center`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r ${product.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Открыть проект</span>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;