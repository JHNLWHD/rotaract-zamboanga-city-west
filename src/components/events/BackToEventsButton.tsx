import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackToEventsButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate('/events')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>
      </div>
    </section>
  );
};

export default BackToEventsButton;
