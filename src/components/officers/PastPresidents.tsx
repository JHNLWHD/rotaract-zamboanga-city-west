import React from 'react';
import { Award } from 'lucide-react';

type PastPresident = {
  name: string;
  term: string;
  status?: 'current' | 'president_elect' | 'future';
};

type PastPresidentsProps = {
  pastPresidents: PastPresident[];
};

const PastPresidents: React.FC<PastPresidentsProps> = ({ pastPresidents }) => {
  if (pastPresidents.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center mb-8">
        <Award className="w-6 h-6 text-amber-600 mr-2" />
        <h2 className="text-2xl font-bold text-slate-900">
          Great West Past Presidents
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-cranberry-100 p-8">
        <div className="max-w-2xl mx-auto space-y-3">
          {pastPresidents.map((pastPresident, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-cranberry-50 transition-colors border-b border-gray-100"
            >
              <span className="font-medium text-slate-700">
                {pastPresident.term}
              </span>
              <div className="text-right">
                <span className="text-slate-900 font-semibold">
                  {pastPresident.name}
                </span>
                {pastPresident.status === 'current' && (
                  <span className="block text-xs text-cranberry-600 mt-1">
                    Current President
                  </span>
                )}
                {pastPresident.status === 'president_elect' && (
                  <span className="block text-xs text-blue-600 mt-1">
                    President-Elect
                  </span>
                )}
                {pastPresident.status === 'future' && (
                  <span className="block text-xs text-green-600 mt-1">
                    President-Nominee
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Honoring the legacy of leadership that has shaped our club since
            2009
          </p>
        </div>
      </div>
    </div>
  );
};

export default PastPresidents;
