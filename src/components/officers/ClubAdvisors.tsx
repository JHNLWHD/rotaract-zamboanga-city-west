import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Users, Calendar } from 'lucide-react';
import { type Officer } from '../../data/officers';

type ClubAdvisorsProps = {
  advisors: Officer[];
};

const ClubAdvisors: React.FC<ClubAdvisorsProps> = ({ advisors }) => {
  if (advisors.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-gradient-to-r from-slate-100 to-gray-100 px-6 py-3 rounded-full border border-slate-200">
          <Users className="w-6 h-6 text-slate-600 mr-3" />
          <h2 className="text-2xl font-bold text-slate-900">Club Advisors</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {advisors.map((advisor, index) => (
          <Card
            key={index}
            className="group bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-gray-400/5"></div>
            <CardContent className="relative p-8 text-center">
              <div className="relative mb-6">
                <div className="w-18 h-18 mx-auto bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                {advisor.name}
              </CardTitle>
              <p className="text-slate-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                {advisor.position}
              </p>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-100">
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  {advisor.responsibilities}
                </p>
                <div className="flex items-center justify-center text-xs text-slate-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{advisor.term}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubAdvisors;
