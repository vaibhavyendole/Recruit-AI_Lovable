import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStep } from '@/types/recruit';
import { useAuth } from '@/hooks/useAuth';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { CreateJobScreen } from '@/components/screens/CreateJobScreen';
import { ResumeUploadScreen } from '@/components/screens/ResumeUploadScreen';
import { ShortlistScreen } from '@/components/screens/ShortlistScreen';
import { CandidateProfileScreen } from '@/components/screens/CandidateProfileScreen';
import { ScreeningChatScreen } from '@/components/screens/ScreeningChatScreen';
import { SchedulingScreen } from '@/components/screens/SchedulingScreen';
import { SummaryScreen } from '@/components/screens/SummaryScreen';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Exclude<AppStep, 'login'>>('dashboard');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('1');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderScreen = () => {
    switch (currentStep) {
      case 'dashboard':
        return (
          <DashboardScreen 
            onCreateJob={() => setCurrentStep('create-job')}
            onOpenJob={() => setCurrentStep('shortlist')}
            onSignOut={signOut}
          />
        );
      case 'create-job':
        return (
          <CreateJobScreen 
            onBack={() => setCurrentStep('dashboard')}
            onNext={() => setCurrentStep('upload-resumes')}
          />
        );
      case 'upload-resumes':
        return (
          <ResumeUploadScreen 
            onBack={() => setCurrentStep('create-job')}
            onNext={() => setCurrentStep('shortlist')}
          />
        );
      case 'shortlist':
        return (
          <ShortlistScreen 
            onBack={() => setCurrentStep('dashboard')}
            onViewCandidate={(id) => {
              setSelectedCandidateId(id);
              setCurrentStep('candidate-profile');
            }}
            onStartScreening={() => setCurrentStep('screening-chat')}
          />
        );
      case 'candidate-profile':
        return (
          <CandidateProfileScreen 
            candidateId={selectedCandidateId}
            onBack={() => setCurrentStep('shortlist')}
            onStartScreening={() => setCurrentStep('screening-chat')}
          />
        );
      case 'screening-chat':
        return (
          <ScreeningChatScreen 
            onBack={() => setCurrentStep('shortlist')}
            onSchedule={() => setCurrentStep('scheduling')}
          />
        );
      case 'scheduling':
        return (
          <SchedulingScreen 
            onBack={() => setCurrentStep('screening-chat')}
            onConfirm={() => setCurrentStep('summary')}
          />
        );
      case 'summary':
        return <SummaryScreen onBackToDashboard={() => setCurrentStep('dashboard')} />;
      default:
        return (
          <DashboardScreen 
            onCreateJob={() => setCurrentStep('create-job')}
            onOpenJob={() => setCurrentStep('shortlist')}
            onSignOut={signOut}
          />
        );
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Index;
