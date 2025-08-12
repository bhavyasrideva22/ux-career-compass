import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share2, RefreshCw } from "lucide-react";

interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: Record<string, number>;
  overallScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  answers: Record<string, any>;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem('assessmentResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect back to assessment if no results found
      navigate('/assessment');
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading your results...</p>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'success';
      case 'Maybe': return 'warning';
      case 'No': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationMessage = (recommendation: string, score: number) => {
    switch (recommendation) {
      case 'Yes':
        return "Excellent! Your profile strongly suggests you'd thrive in UX copywriting. Your user empathy and writing skills indicate a great fit for this career path.";
      case 'Maybe':
        return "Good potential! You have solid motivation but may need to develop some technical skills and UX knowledge. With focused learning, you could excel in this field.";
      case 'No':
        return "Your current profile suggests exploring related roles like Content Marketing or Technical Writing might be a better fit. Consider these alternative pathways.";
      default:
        return "";
    }
  };

  const getNextSteps = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes':
        return [
          "Enroll in intermediate UX writing courses",
          "Start building a UX writing portfolio",
          "Practice with real product copy exercises",
          "Connect with UX writing communities"
        ];
      case 'Maybe':
        return [
          "Take foundational UX design courses",
          "Practice rewriting existing UX copy",
          "Learn about user research basics",
          "Improve technical writing skills"
        ];
      case 'No':
        return [
          "Explore content marketing opportunities",
          "Consider technical writing roles",
          "Develop general copywriting skills",
          "Research related creative careers"
        ];
      default:
        return [];
    }
  };

  const wiscarLabels = {
    will: "Will & Persistence",
    interest: "Interest & Engagement", 
    skill: "Current Skills",
    cognitive: "Cognitive Readiness",
    ability: "Ability to Learn",
    real_world: "Real-World Fit"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Main Results */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl font-bold text-primary">{results.overallScore}</div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <Badge variant={getRecommendationColor(results.recommendation) as any} className="mt-1">
                {results.recommendation === 'Yes' ? 'Strong Fit' : 
                 results.recommendation === 'Maybe' ? 'Moderate Fit' : 'Low Fit'}
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getRecommendationMessage(results.recommendation, results.overallScore)}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Core Scores */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Core Assessment Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Psychological Fit</span>
                  <span className="font-semibold">{results.psychometricScore}/100</span>
                </div>
                <Progress value={results.psychometricScore} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Technical Readiness</span>
                  <span className="font-semibold">{results.technicalScore}/100</span>
                </div>
                <Progress value={results.technicalScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Framework */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>WISCAR Framework Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results.wiscarScores).map(([key, score]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{wiscarLabels[key as keyof typeof wiscarLabels]}</span>
                    <span className="font-semibold text-sm">{score}/100</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations & Next Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recommended Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.recommendation === 'Yes' && (
                  <>
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="font-medium text-success">Primary: UX Copywriter</div>
                      <div className="text-sm text-muted-foreground">Strong match for interface copy</div>
                    </div>
                    <div className="p-3 bg-info/10 rounded-lg">
                      <div className="font-medium text-info">Secondary: Content Strategist</div>
                      <div className="text-sm text-muted-foreground">Leverage strategic thinking</div>
                    </div>
                  </>
                )}
                {results.recommendation === 'Maybe' && (
                  <>
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <div className="font-medium text-warning">Consider: UX Writing (Junior)</div>
                      <div className="text-sm text-muted-foreground">With skill development</div>
                    </div>
                    <div className="p-3 bg-info/10 rounded-lg">
                      <div className="font-medium text-info">Alternative: Content Designer</div>
                      <div className="text-sm text-muted-foreground">Broader content role</div>
                    </div>
                  </>
                )}
                {results.recommendation === 'No' && (
                  <>
                    <div className="p-3 bg-accent rounded-lg">
                      <div className="font-medium">Content Marketing</div>
                      <div className="text-sm text-muted-foreground">Better skill alignment</div>
                    </div>
                    <div className="p-3 bg-accent rounded-lg">
                      <div className="font-medium">Technical Writing</div>
                      <div className="text-sm text-muted-foreground">Documentation focus</div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getNextSteps(results.recommendation).map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="text-sm">{step}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/assessment')}
            variant="hero"
            className="mr-4"
          >
            Retake Assessment
          </Button>
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;