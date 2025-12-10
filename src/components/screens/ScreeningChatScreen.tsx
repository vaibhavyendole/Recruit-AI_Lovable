import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Send,
  Star,
  CheckCircle2,
  Sparkles,
  Calendar,
  User,
  Bot
} from 'lucide-react';
import { mockScreeningMessages, mockSkillRatings, mockCandidates } from '@/data/mockData';
import { ScreeningMessage } from '@/types/recruit';

interface ScreeningChatScreenProps {
  onBack: () => void;
  onSchedule: () => void;
}

export function ScreeningChatScreen({ onBack, onSchedule }: ScreeningChatScreenProps) {
  const [messages, setMessages] = useState<ScreeningMessage[]>(mockScreeningMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const candidate = mockCandidates[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ScreeningMessage = {
      id: String(messages.length + 1),
      role: 'agent',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate candidate typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const candidateResponse: ScreeningMessage = {
        id: String(messages.length + 2),
        role: 'candidate',
        content: 'That\'s a great question. In my previous role, I implemented a custom state management solution using React Context and useReducer, which reduced our bundle size by 40% compared to Redux while maintaining the same functionality.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, candidateResponse]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">{candidate.name}</h1>
                  <p className="text-xs text-muted-foreground">AI Screening in progress</p>
                </div>
              </div>
            </div>
            <Badge variant="info" className="animate-pulse">
              <span className="mr-1">●</span> Live Session
            </Badge>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Session Start */}
            <div className="text-center">
              <Badge variant="muted" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Screening Session Started
              </Badge>
            </div>

            {messages.map((message, index) => (
              <div 
                key={message.id}
                className={`flex gap-3 animate-slide-up ${message.role === 'agent' ? '' : 'flex-row-reverse'}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'agent' 
                    ? 'bg-primary/10' 
                    : 'bg-accent/10'
                }`}>
                  {message.role === 'agent' ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-accent" />
                  )}
                </div>
                <div className={`max-w-[80%] ${message.role === 'agent' ? '' : 'text-right'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'agent'
                      ? 'bg-primary/10 rounded-tl-none'
                      : 'bg-accent/10 rounded-tr-none'
                  }`}>
                    <p className="text-foreground">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 flex-row-reverse animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-accent" />
                </div>
                <div className="bg-accent/10 rounded-2xl rounded-tr-none p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-card p-4">
          <div className="max-w-3xl mx-auto flex gap-3">
            <Input 
              placeholder="Type a question for the candidate..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              inputSize="lg"
              className="flex-1"
            />
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Evaluation */}
      <aside className="w-80 border-l bg-card p-6 hidden lg:block">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Live Evaluation
        </h3>

        {/* Skill Ratings */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {mockSkillRatings.map((rating) => (
              <div key={rating.skill}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{rating.skill}</span>
                  <div className="flex gap-0.5">
                    {[...Array(rating.maxRating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${i < rating.rating ? 'text-warning fill-warning' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                </div>
                <Progress 
                  value={(rating.rating / rating.maxRating) * 100} 
                  size="sm"
                  indicatorColor={rating.rating >= 4 ? 'success' : 'default'}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Summary */}
        <Card className="mb-6">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm">AI Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">
              Candidate demonstrates solid React fundamentals with practical experience in 
              large-scale migrations. Shows strong problem-solving skills and clear communication.
            </p>
          </CardContent>
        </Card>

        {/* Decision */}
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="font-medium text-success">Recommend for Interview</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on screening responses, this candidate meets 92% of requirements.
            </p>
            <Button 
              variant="success" 
              className="w-full"
              onClick={onSchedule}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Approve & Schedule Interview
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
