import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const EventNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/events')}
            className="bg-cranberry-600 hover:bg-cranberry-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventNotFound;
