import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard, Question } from "@/components/assessment/QuestionCard";
import { assessmentQuestions } from "@/data/questions";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  useEffect(() => {
    if (currentQuestionIndex >= assessmentQuestions.length) {
      setIsComplete(true);
    }
  }, [currentQuestionIndex]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete, calculate results and navigate
      calculateAndNavigateToResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateAndNavigateToResults = () => {
    // Calculate scores based on answers
    const results = calculateWISCARScores(answers);
    
    // Store results in localStorage for the results page
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    
    // Navigate to results
    navigate('/results');
  };

  const calculateWISCARScores = (answers: Record<string, any>) => {
    // Psychometric scoring
    const psychometricAnswers = Object.entries(answers).filter(([key]) => 
      assessmentQuestions.find(q => q.id === key)?.category === 'psychometric'
    );
    
    const psychScore = Math.floor(Math.random() * 35) + 65; // Demo scoring
    
    // Technical scoring  
    const technicalAnswers = Object.entries(answers).filter(([key]) =>
      assessmentQuestions.find(q => q.id === key)?.category === 'technical'
    );
    
    const techScore = Math.floor(Math.random() * 30) + 60; // Demo scoring
    
    // WISCAR scoring
    const wiscarCategories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'real_world'];
    const wiscarScores = wiscarCategories.reduce((acc, category) => {
      acc[category] = Math.floor(Math.random() * 30) + 65; // Demo scoring
      return acc;
    }, {} as Record<string, number>);
    
    const overallScore = Math.floor((psychScore + techScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3);
    
    return {
      psychometricScore: psychScore,
      technicalScore: techScore,
      wiscarScores,
      overallScore,
      recommendation: overallScore >= 85 ? 'Yes' : overallScore >= 65 ? 'Maybe' : 'No',
      answers
    };
  };

  const canProceed = currentQuestion && answers[currentQuestion.id] !== undefined;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center">
        <Card className="w-full max-w-md shadow-elegant">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Calculating your results...
            </p>
            <Button onClick={calculateAndNavigateToResults} variant="hero">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Question */}
        <div className="max-w-3xl mx-auto mb-8">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentAnswer={answers[currentQuestion.id]}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            variant={canProceed ? "hero" : "outline"}
            className="flex items-center gap-2"
          >
            {currentQuestionIndex === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;