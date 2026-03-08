import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Award, Calendar } from 'lucide-react';
import { type Officer } from '../../data/officers';

type ExecutiveBoardProps = {
  executives: Officer[];
};

const ExecutiveBoard: React.FC<ExecutiveBoardProps> = ({ executives }) => {
  if (executives.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center bg-gradient-to-r from-cranberry-100 to-pink-100 px-6 py-3 rounded-full border border-cranberry-200">
          <Award className="w-6 h-6 text-cranberry-600 mr-3" />
          <h2 className="text-2xl font-bold text-slate-900">Executive Board</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {executives.map((executive, index) => (
          <Card
            key={index}
            className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cranberry-500/5 via-transparent to-pink-500/5"></div>
            <CardContent className="relative p-8 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cranberry-500 to-cranberry-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cranberry-700 transition-colors">
                {executive.name}
              </CardTitle>
              <p className="text-cranberry-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                {executive.position}
              </p>
              <div className="bg-gradient-to-r from-cranberry-50 to-pink-50 rounded-xl p-4 border border-cranberry-100">
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  {executive.responsibilities}
                </p>
                <div className="flex items-center justify-center space-x-3 text-xs text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{executive.term}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveBoard;
