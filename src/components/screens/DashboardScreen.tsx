import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Users, 
  Briefcase, 
  MapPin, 
  Calendar,
  ChevronRight,
  Search,
  Bell,
  Settings,
  User
} from 'lucide-react';
import { Job } from '@/types/recruit';
import { mockJobs } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

interface DashboardScreenProps {
  onCreateJob: () => void;
  onOpenJob: (jobId: string) => void;
}

function getStatusBadge(status: Job['status']) {
  switch (status) {
    case 'draft':
      return <Badge variant="muted">Draft</Badge>;
    case 'screening':
      return <Badge variant="info">Screening in progress</Badge>;
    case 'shortlist_ready':
      return <Badge variant="success">Shortlist ready</Badge>;
    case 'interviewing':
      return <Badge variant="warning">Interviewing</Badge>;
    case 'closed':
      return <Badge variant="secondary">Closed</Badge>;
    default:
      return null;
  }
}

export function DashboardScreen({ onCreateJob, onOpenJob }: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">Recruit-AI</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search jobs, candidates..." 
                className="pl-10 bg-muted/50"
                variant="filled"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>Sarah Johnson</span>
                    <span className="text-xs text-muted-foreground font-normal">sarah@company.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fade-in">
          <Card variant="gradient" className="p-8 gradient-hero text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(199,89%,48%,0.2),transparent_50%)]" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
                <p className="text-primary-foreground/80 text-lg max-w-md">
                  Upload a job description or paste text; AI will automatically generate screening criteria.
                </p>
              </div>
              <Button 
                variant="glass" 
                size="xl"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={onCreateJob}
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Job
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: '3', icon: Briefcase, color: 'text-primary' },
            { label: 'Total Applicants', value: '97', icon: Users, color: 'text-accent' },
            { label: 'Shortlisted', value: '12', icon: Users, color: 'text-success' },
            { label: 'Interviews', value: '5', icon: Calendar, color: 'text-warning' },
          ].map((stat, index) => (
            <Card 
              key={stat.label} 
              variant="elevated" 
              className="p-5 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Jobs List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Your Jobs</h2>
            <Button variant="ghost" size="sm">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            {mockJobs.map((job, index) => (
              <Card 
                key={job.id} 
                variant="interactive" 
                className="p-6 animate-slide-up"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                onClick={() => onOpenJob(job.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {job.applicantsCount} applicants
                        </span>
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(job.status)}
                        <div className="flex gap-1">
                          {job.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Open Job
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
