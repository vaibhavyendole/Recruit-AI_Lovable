import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Building2,
  GraduationCap,
  Calendar,
  Star,
  Play,
  UserPlus,
  UserMinus,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  Award
} from 'lucide-react';
import { mockCandidates, mockSkillRatings } from '@/data/mockData';

interface CandidateProfileScreenProps {
  candidateId: string;
  onBack: () => void;
  onStartScreening: () => void;
}

export function CandidateProfileScreen({ candidateId, onBack, onStartScreening }: CandidateProfileScreenProps) {
  const candidate = mockCandidates.find(c => c.id === candidateId) || mockCandidates[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shortlist
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Summary */}
            <Card variant="elevated" className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">{candidate.name}</h1>
                      <Badge variant="gradient" className="text-base px-3 py-1">
                        {candidate.matchScore}% Match
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground mb-3">
                      {candidate.currentRole} at {candidate.company}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" /> {candidate.email}
                      </span>
                      {candidate.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" /> {candidate.phone}
                        </span>
                      )}
                      {candidate.linkedin && (
                        <span className="flex items-center gap-1">
                          <Linkedin className="h-4 w-4" /> LinkedIn
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {candidate.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="animate-slide-up">
              <TabsList className="w-full justify-start bg-card border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="flags">AI Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Summary & Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* AI Reasoning */}
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-foreground">{candidate.reasoning}</p>
                    </div>

                    {/* Skills Cloud */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Skills Match</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.matchedSkills.map(skill => (
                          <Badge key={skill} variant="success">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                        {candidate.missingSkills.map(skill => (
                          <Badge key={skill} variant="warning">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Skill Ratings */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Skill Ratings</h4>
                      <div className="space-y-3">
                        {mockSkillRatings.map((rating) => (
                          <div key={rating.skill} className="flex items-center gap-4">
                            <span className="text-sm text-foreground w-32">{rating.skill}</span>
                            <div className="flex-1">
                              <Progress 
                                value={(rating.rating / rating.maxRating) * 100} 
                                size="sm"
                                indicatorColor="gradient"
                              />
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(rating.maxRating)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < rating.rating ? 'text-warning fill-warning' : 'text-muted'}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Current Role */}
                      <div className="flex gap-4">
                        <div className="p-2 h-fit rounded-lg bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{candidate.currentRole}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.company}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" /> 2021 - Present
                          </p>
                          <p className="text-sm text-foreground mt-2">
                            Led frontend development for core product features, mentored junior developers, 
                            and implemented modern React patterns for improved performance.
                          </p>
                        </div>
                      </div>

                      {/* Previous Role */}
                      <div className="flex gap-4">
                        <div className="p-2 h-fit rounded-lg bg-muted">
                          <Briefcase className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Software Engineer</h4>
                          <p className="text-sm text-muted-foreground">Previous Corp</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" /> 2018 - 2021
                          </p>
                          <p className="text-sm text-foreground mt-2">
                            Full-stack development with React and Node.js. Built internal tools 
                            and customer-facing dashboards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="p-2 h-fit rounded-lg bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{candidate.education}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" /> 2014 - 2018
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Projects & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="p-2 h-fit rounded-lg bg-accent/10">
                          <Award className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">AWS Certified Developer</h4>
                          <p className="text-sm text-muted-foreground">Amazon Web Services • 2023</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="p-2 h-fit rounded-lg bg-accent/10">
                          <Award className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Open Source Contributions</h4>
                          <p className="text-sm text-muted-foreground">React, TypeScript ecosystem</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flags" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Analysis Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <span className="font-medium text-success">Strengths</span>
                        </div>
                        <ul className="text-sm text-foreground space-y-1 ml-7">
                          <li>Strong React and TypeScript expertise</li>
                          <li>Leadership experience with mentoring</li>
                          <li>Excellent communication in resume</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                          <span className="font-medium text-warning">Areas to Explore</span>
                        </div>
                        <ul className="text-sm text-foreground space-y-1 ml-7">
                          <li>Limited DevOps/infrastructure experience</li>
                          <li>No GraphQL mentioned - verify familiarity</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Actions */}
          <div className="space-y-4">
            <Card variant="elevated" className="animate-slide-in-right">
              <CardContent className="p-6 space-y-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={onStartScreening}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Screening Chat
                </Button>
                <Button variant="success" size="lg" className="w-full">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Add to Shortlist
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <UserMinus className="mr-2 h-5 w-5" />
                  Reject with Reason
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <h4 className="font-medium text-foreground mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium text-foreground">{candidate.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Match Score</span>
                    <span className="font-medium text-foreground">{candidate.matchScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Skills Matched</span>
                    <span className="font-medium text-foreground">{candidate.matchedSkills.length}/{candidate.matchedSkills.length + candidate.missingSkills.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="success">{candidate.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
