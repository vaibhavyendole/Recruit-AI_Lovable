import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  User,
  MapPin,
  Globe
} from 'lucide-react';
import { mockCandidates } from '@/data/mockData';

interface SchedulingScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

const timeSlots = [
  { date: 'Tomorrow', time: '10:00 AM - 11:00 AM', recommended: true },
  { date: 'Tomorrow', time: '2:00 PM - 3:00 PM', recommended: false },
  { date: 'Thu, Jan 25', time: '11:00 AM - 12:00 PM', recommended: false },
  { date: 'Fri, Jan 26', time: '9:00 AM - 10:00 AM', recommended: false },
];

export function SchedulingScreen({ onBack, onConfirm }: SchedulingScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const candidate = mockCandidates[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
            <Calendar className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Interview</h1>
          <p className="text-muted-foreground">
            Select a time slot for the interview with {candidate.name}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Calendar Sync Status */}
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Google Calendar Connected</h3>
                    <p className="text-sm text-muted-foreground">sarah@company.com</p>
                  </div>
                </div>
                <Badge variant="success">Synced</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>Select a time that works for both parties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {timeSlots.map((slot, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSlot === index 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedSlot(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedSlot === index ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}>
                        {selectedSlot === index && (
                          <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{slot.date}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {slot.time}
                        </p>
                      </div>
                    </div>
                    {slot.recommended && (
                      <Badge variant="gradient">
                        AI Recommended
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

              <p className="text-sm text-muted-foreground flex items-center gap-1 pt-2">
                <Globe className="h-4 w-4" />
                AI recommendation based on candidate timezone (PST)
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{candidate.name}</p>
                  <p className="text-sm text-muted-foreground">{candidate.currentRole}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Interviewer</p>
                  <p className="font-medium text-foreground">Sarah Johnson</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                  <p className="font-medium text-foreground">
                    {timeSlots[selectedSlot].date}, {timeSlots[selectedSlot].time.split(' - ')[0]}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Meeting Type</p>
                  <p className="font-medium text-foreground flex items-center gap-1">
                    <Video className="h-4 w-4" /> Video Call
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium text-foreground">60 minutes</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Meeting link will be auto-generated</strong> and sent to both parties via email.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button 
            variant="hero" 
            size="xl" 
            className="w-full animate-slide-up"
            style={{ animationDelay: '0.3s' }}
            onClick={onConfirm}
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Confirm Schedule
          </Button>
        </div>
      </main>
    </div>
  );
}
