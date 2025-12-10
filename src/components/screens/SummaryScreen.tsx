import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText,
  CheckCircle2,
  Users,
  Calendar,
  ClipboardList,
  Home,
  Star
} from 'lucide-react';
import { mockCandidates } from '@/data/mockData';

interface SummaryScreenProps {
  onBackToDashboard: () => void;
}

export function SummaryScreen({ onBackToDashboard }: SummaryScreenProps) {
  const shortlistedCandidates = mockCandidates.filter(c => c.status === 'shortlisted' || c.matchScore >= 80);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">Recruit-AI</span>
          </div>
          <Button variant="outline" onClick={onBackToDashboard}>
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Success Banner */}
        <Card variant="gradient" className="gradient-primary text-primary-foreground p-8 mb-8 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/20 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Screening Complete!</h1>
            <p className="text-primary-foreground/80 text-lg">
              {shortlistedCandidates.length} candidates have been shortlisted for interviews
            </p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Candidates Screened', value: mockCandidates.length, icon: Users, color: 'text-primary' },
            { label: 'Shortlisted', value: shortlistedCandidates.length, icon: CheckCircle2, color: 'text-success' },
            { label: 'Interviews Scheduled', value: '1', icon: Calendar, color: 'text-warning' },
          ].map((stat, index) => (
            <Card 
              key={stat.label} 
              variant="elevated" 
              className="p-5 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Shortlisted Candidates */}
        <Card variant="elevated" className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Shortlisted Candidates</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF Summary
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortlistedCandidates.map((candidate, index) => (
                <div 
                  key={candidate.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.currentRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="gradient">{candidate.matchScore}% Match</Badge>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.round(candidate.matchScore / 20) ? 'text-warning fill-warning' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Decision Log */}
        <Card variant="elevated" className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              AI Decision Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortlistedCandidates.map((candidate) => (
                <div key={candidate.id} className="border-l-2 border-primary/30 pl-4">
                  <p className="font-medium text-foreground">{candidate.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{candidate.reasoning}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Button variant="outline" size="lg" className="flex-1">
            <FileText className="mr-2 h-5 w-5" />
            Export to ATS
          </Button>
          <Button variant="hero" size="lg" className="flex-1" onClick={onBackToDashboard}>
            <Home className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
