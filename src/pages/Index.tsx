import { useState } from 'react';
import { AppStep } from '@/types/recruit';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { CreateJobScreen } from '@/components/screens/CreateJobScreen';
import { ResumeUploadScreen } from '@/components/screens/ResumeUploadScreen';
import { ShortlistScreen } from '@/components/screens/ShortlistScreen';
import { CandidateProfileScreen } from '@/components/screens/CandidateProfileScreen';
import { ScreeningChatScreen } from '@/components/screens/ScreeningChatScreen';
import { SchedulingScreen } from '@/components/screens/SchedulingScreen';
import { SummaryScreen } from '@/components/screens/SummaryScreen';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('login');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('1');

  const renderScreen = () => {
    switch (currentStep) {
      case 'login':
        return <LoginScreen onLogin={() => setCurrentStep('dashboard')} />;
      case 'dashboard':
        return (
          <DashboardScreen 
            onCreateJob={() => setCurrentStep('create-job')}
            onOpenJob={() => setCurrentStep('shortlist')}
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
        return <LoginScreen onLogin={() => setCurrentStep('dashboard')} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Index;
