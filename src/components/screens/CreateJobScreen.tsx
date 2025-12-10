import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';
import { mockJobCriteria } from '@/data/mockData';

interface CreateJobScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function CreateJobScreen({ onBack, onNext }: CreateJobScreenProps) {
  const [jdText, setJdText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [selectedResponsibilities, setSelectedResponsibilities] = useState<string[]>(mockJobCriteria.responsibilities);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(mockJobCriteria.requiredSkills);
  const [selectedTech, setSelectedTech] = useState<string[]>(mockJobCriteria.mandatoryTech);

  const handleFileUpload = () => {
    setUploadedFile('Senior_Frontend_Developer_JD.pdf');
    simulateProcessing();
  };

  const handleTextSubmit = () => {
    if (jdText.trim()) {
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCriteria(true);
    }, 2000);
  };

  const toggleItem = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Step 1 of 2</span>
            <div className="flex gap-1">
              <div className="w-8 h-1.5 rounded-full bg-primary" />
              <div className="w-8 h-1.5 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Job Description</h1>
          <p className="text-muted-foreground">
            Upload a PDF or paste the job description text. AI will extract key criteria automatically.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Upload Area */}
          {!showCriteria && (
            <Card variant="elevated" className="animate-slide-up">
              <CardContent className="p-8">
                {/* Drag & Drop Zone */}
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer mb-6"
                  onClick={handleFileUpload}
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">{uploadedFile}</p>
                        <p className="text-sm text-muted-foreground">PDF • 245 KB</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-1">
                        Drop your job description here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse (PDF, DOCX)
                      </p>
                    </>
                  )}
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground">or paste text</span>
                  </div>
                </div>

                <Textarea 
                  placeholder="Paste your job description here..."
                  className="min-h-[200px] resize-none"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full mt-6"
                  onClick={handleTextSubmit}
                  disabled={!jdText.trim() && !uploadedFile}
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Extract Criteria with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* AI Extraction Preview */}
          {showCriteria && (
            <div className="space-y-6 animate-slide-up">
              <Card variant="elevated" className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>AI-Extracted Criteria</CardTitle>
                      <CardDescription>Review and adjust the extracted requirements</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Responsibilities */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Key Responsibilities
                    </h4>
                    <div className="space-y-2">
                      {mockJobCriteria.responsibilities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Checkbox 
                            id={`resp-${idx}`}
                            checked={selectedResponsibilities.includes(item)}
                            onCheckedChange={() => toggleItem(item, selectedResponsibilities, setSelectedResponsibilities)}
                          />
                          <label htmlFor={`resp-${idx}`} className="text-sm text-foreground cursor-pointer">
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mockJobCriteria.requiredSkills.map((skill) => (
                        <Badge 
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "info" : "muted"}
                          className="cursor-pointer transition-colors"
                          onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Minimum Experience
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      {mockJobCriteria.minimumExperience}
                    </p>
                  </div>

                  {/* Mandatory Technologies */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Mandatory Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mockJobCriteria.mandatoryTech.map((tech) => (
                        <Badge 
                          key={tech}
                          variant={selectedTech.includes(tech) ? "success" : "muted"}
                          className="cursor-pointer transition-colors"
                          onClick={() => toggleItem(tech, selectedTech, setSelectedTech)}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Nice to Have */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Nice to Have</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockJobCriteria.niceToHave.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={onNext}
              >
                Next: Upload Resumes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
