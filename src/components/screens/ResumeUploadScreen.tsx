import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  CheckCircle2,
  Loader2,
  X,
  Sparkles
} from 'lucide-react';

interface ResumeUploadScreenProps {
  onBack: () => void;
  onNext: () => void;
}

interface UploadedFile {
  name: string;
  size: string;
  status: 'uploading' | 'parsing' | 'complete' | 'error';
  progress: number;
}

const mockFiles: UploadedFile[] = [
  { name: 'Alex_Chen_Resume.pdf', size: '124 KB', status: 'complete', progress: 100 },
  { name: 'Sarah_Johnson_CV.pdf', size: '98 KB', status: 'complete', progress: 100 },
  { name: 'Michael_Park_Resume.pdf', size: '156 KB', status: 'complete', progress: 100 },
  { name: 'Emily_Rodriguez_CV.docx', size: '89 KB', status: 'complete', progress: 100 },
  { name: 'David_Kim_Resume.pdf', size: '112 KB', status: 'complete', progress: 100 },
];

export function ResumeUploadScreen({ onBack, onNext }: ResumeUploadScreenProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);

  const handleUpload = () => {
    setFiles(mockFiles.map(f => ({ ...f, status: 'uploading' as const, progress: 0 })));
    
    // Simulate upload progress
    let currentIndex = 0;
    const interval = setInterval(() => {
      setFiles(prev => prev.map((f, idx) => {
        if (idx === currentIndex && f.progress < 100) {
          const newProgress = Math.min(f.progress + 20, 100);
          return { 
            ...f, 
            progress: newProgress,
            status: newProgress === 100 ? 'complete' : 'uploading'
          };
        }
        return f;
      }));

      setFiles(prev => {
        const current = prev[currentIndex];
        if (current && current.progress >= 100) {
          currentIndex++;
        }
        if (currentIndex >= prev.length) {
          clearInterval(interval);
        }
        return prev;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleGenerateShortlist = () => {
    setIsExtracting(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setExtractionProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onNext();
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Step 2 of 2</span>
            <div className="flex gap-1">
              <div className="w-8 h-1.5 rounded-full bg-primary" />
              <div className="w-8 h-1.5 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Resumes</h1>
          <p className="text-muted-foreground">
            Upload 20–200 resumes in bulk. AI will parse and match candidates automatically.
          </p>
        </div>

        <div className="space-y-6">
          {/* Upload Area */}
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-8">
              <div 
                className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={handleUpload}
              >
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-1">
                  Drop multiple resumes here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse (PDF, DOCX)
                </p>
                <Badge variant="info" className="mt-3">
                  Up to 200 files at once
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Files Table */}
          {files.length > 0 && (
            <Card variant="elevated" className="animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">
                    Uploaded Files ({files.length})
                  </h3>
                  <Badge variant="success">
                    {files.filter(f => f.status === 'complete').length} parsed
                  </Badge>
                </div>

                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                      <div className="w-24">
                        {file.status === 'complete' ? (
                          <div className="flex items-center gap-1 text-success">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs">Parsed</span>
                          </div>
                        ) : (
                          <Progress value={file.progress} size="sm" indicatorColor="gradient" />
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Extraction Progress */}
          {isExtracting && (
            <Card variant="glass" className="border-primary/30 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Extracting Profiles...</h4>
                    <p className="text-sm text-muted-foreground">
                      AI is analyzing resumes and matching against job criteria
                    </p>
                  </div>
                </div>
                <Progress 
                  value={extractionProgress} 
                  size="lg" 
                  indicatorColor="gradient"
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground text-right">
                  {extractionProgress}% complete
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          {files.length > 0 && files.every(f => f.status === 'complete') && !isExtracting && (
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full animate-slide-up"
              onClick={handleGenerateShortlist}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate AI Shortlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
