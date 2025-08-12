import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Brain, Target, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  const features = [
    {
      icon: Brain,
      title: "Psychological Fit Analysis",
      description: "Evaluate your personality traits and cognitive style for UX copywriting success"
    },
    {
      icon: Target,
      title: "Technical Readiness",
      description: "Assess your current skills and identify areas for improvement"
    },
    {
      icon: Users,
      title: "WISCAR Framework",
      description: "Comprehensive analysis of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    },
    {
      icon: Star,
      title: "Personalized Recommendations",
      description: "Get tailored career advice and learning pathways based on your results"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            Is UX Copywriting Right for You?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover if you have what it takes to excel in UX copywriting. Our comprehensive assessment 
            evaluates your psychological fit, technical skills, and career alignment using proven frameworks.
          </p>
          <Button 
            onClick={handleStartAssessment}
            variant="hero"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            Start Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* What is UX Copywriting */}
        <Card className="mb-16 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What is UX Copywriting?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-muted-foreground mb-6">
              UX copywriting involves creating clear, concise, user-centered copy for digital interfaces 
              that guides users, improves usability, and supports brand voice.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                "UX Copywriter",
                "Content Strategist", 
                "UX Designer (writing focus)",
                "Product Writer",
                "Microcopy Specialist"
              ].map((role, index) => (
                <div key={index} className="bg-accent/50 rounded-lg p-3 text-center">
                  <span className="font-medium text-accent-foreground">{role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assessment Info */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-center">Assessment Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">20-30</div>
                <div className="text-muted-foreground">Minutes to Complete</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-muted-foreground">Assessment Dimensions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Personalized Results</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;