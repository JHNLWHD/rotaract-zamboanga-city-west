import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Users, Calendar } from 'lucide-react';
import { type Officer } from '../../data/officers';

type BoardOfDirectorsSectionProps = {
  directors: Officer[];
};

const BoardOfDirectors: React.FC<BoardOfDirectorsSectionProps> = ({
  directors,
}) => {
  if (directors.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center bg-gradient-to-r from-cranberry-50 to-pink-50 px-6 py-3 rounded-full border border-cranberry-100">
          <Users className="w-6 h-6 text-cranberry-500 mr-3" />
          <h2 className="text-2xl font-bold text-slate-900">
            Board of Directors
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {directors.map((director, index) => (
          <Card
            key={index}
            className="group bg-white/70 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cranberry-400/3 via-transparent to-pink-400/3"></div>
            <CardContent className="relative p-6 text-center">
              <div className="relative mb-5">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cranberry-400 to-cranberry-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cranberry-600 transition-colors leading-tight">
                {director.name}
              </CardTitle>
              <p className="text-cranberry-500 font-medium mb-3 text-xs uppercase tracking-wide">
                {director.position}
              </p>
              <div className="bg-white/50 rounded-lg p-3 border border-gray-100">
                <p className="text-slate-600 text-xs leading-relaxed mb-2">
                  {director.responsibilities}
                </p>
                <div className="flex items-center justify-center text-xs text-slate-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{director.term}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoardOfDirectors;
