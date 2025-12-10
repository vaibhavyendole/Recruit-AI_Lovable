import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Search,
  Download,
  Play,
  User,
  MapPin,
  Building2,
  GraduationCap,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { Candidate } from '@/types/recruit';
import { mockCandidates } from '@/data/mockData';

interface ShortlistScreenProps {
  onBack: () => void;
  onViewCandidate: (candidateId: string) => void;
  onStartScreening: () => void;
}

function getScoreColor(score: number) {
  if (score >= 85) return 'text-success';
  if (score >= 70) return 'text-primary';
  if (score >= 50) return 'text-warning';
  return 'text-destructive';
}

function getScoreBarColor(score: number): "success" | "default" | "warning" {
  if (score >= 85) return 'success';
  if (score >= 70) return 'default';
  return 'warning';
}

export function ShortlistScreen({ onBack, onViewCandidate, onStartScreening }: ShortlistScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const allSkills = [...new Set(mockCandidates.flatMap(c => [...c.matchedSkills, ...c.missingSkills]))];
  
  const filteredCandidates = mockCandidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currentRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="font-semibold text-foreground">Senior Frontend Developer</h1>
              <p className="text-xs text-muted-foreground">47 applicants • 5 shortlisted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="success" size="sm" onClick={onStartScreening}>
              <Play className="mr-2 h-4 w-4" />
              Start AI Screening
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <aside className="w-72 border-r bg-card min-h-[calc(100vh-64px)] p-6 hidden lg:block">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Filters</h2>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                inputSize="sm"
              />
            </div>
          </div>

          {/* Match Score */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">
              Match Score: 50%+
            </label>
            <Slider defaultValue={[50]} max={100} step={5} />
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">
              Experience: {experienceRange[0]}-{experienceRange[1]} years
            </label>
            <Slider 
              value={experienceRange} 
              max={15} 
              step={1} 
              onValueChange={setExperienceRange}
            />
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Skills</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allSkills.slice(0, 8).map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <Checkbox 
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSkills([...selectedSkills, skill]);
                      } else {
                        setSelectedSkills(selectedSkills.filter(s => s !== skill));
                      }
                    }}
                  />
                  <label htmlFor={skill} className="text-sm text-foreground cursor-pointer">
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* AI Flags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">AI Flags</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="resume-gaps" />
                <label htmlFor="resume-gaps" className="text-sm text-foreground cursor-pointer">
                  Resume gaps
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="missing-skills" />
                <label htmlFor="missing-skills" className="text-sm text-foreground cursor-pointer">
                  Missing must-haves
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Candidate Cards */}
        <main className="flex-1 p-6">
          {/* Summary Banner */}
          <Card variant="gradient" className="gradient-primary text-primary-foreground p-6 mb-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <Sparkles className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">AI Shortlist Ready</h3>
                <p className="text-primary-foreground/80">
                  {mockCandidates.filter(c => c.matchScore >= 70).length} candidates match 70%+ of your criteria
                </p>
              </div>
            </div>
          </Card>

          {/* Candidates Grid */}
          <div className="grid gap-4">
            {filteredCandidates
              .sort((a, b) => b.matchScore - a.matchScore)
              .map((candidate, index) => (
              <Card 
                key={candidate.id} 
                variant="interactive" 
                className="p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-6">
                  {/* Avatar & Score */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(candidate.matchScore)}`}>
                      {candidate.matchScore}%
                    </div>
                    <span className="text-xs text-muted-foreground">Match</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {candidate.currentRole} at {candidate.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {candidate.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          candidate.status === 'shortlisted' ? 'success' :
                          candidate.status === 'screening' ? 'info' :
                          candidate.status === 'rejected' ? 'destructive' : 'muted'
                        }>
                          {candidate.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    {/* Score Bar */}
                    <div className="mb-3">
                      <Progress 
                        value={candidate.matchScore} 
                        size="sm"
                        indicatorColor={getScoreBarColor(candidate.matchScore)}
                      />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.matchedSkills.slice(0, 4).map(skill => (
                        <Badge key={skill} variant="success" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.missingSkills.slice(0, 2).map(skill => (
                        <Badge key={skill} variant="warning" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* AI Reasoning */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      <Sparkles className="h-3 w-3 inline mr-1 text-primary" />
                      {candidate.reasoning}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewCandidate(candidate.id)}
                      >
                        View Full Profile
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm" onClick={onStartScreening}>
                        <Play className="mr-1 h-4 w-4" />
                        Start Screening
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
