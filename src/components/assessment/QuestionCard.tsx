import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export interface Question {
  id: string;
  category: "psychometric" | "technical" | "wiscar";
  type: "likert" | "multiple_choice" | "scenario" | "editing";
  question: string;
  options?: string[];
  scenario?: string;
  editingTask?: {
    original: string;
    instruction: string;
  };
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
  currentAnswer?: any;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [sliderValue, setSliderValue] = useState(currentAnswer || [4]);
  const [selectedOption, setSelectedOption] = useState(currentAnswer || "");
  const [editingAnswer, setEditingAnswer] = useState(currentAnswer || "");

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onAnswer(question.id, value[0]);
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onAnswer(question.id, value);
  };

  const handleEditingChange = (value: string) => {
    setEditingAnswer(value);
    onAnswer(question.id, value);
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "likert":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-lg font-medium">{sliderValue[0]}</span>
              <p className="text-sm text-muted-foreground mt-1">
                1 = Strongly Disagree, 7 = Strongly Agree
              </p>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              max={7}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Strongly Disagree</span>
              <span>Neutral</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        );

      case "multiple_choice":
        return (
          <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "scenario":
        return (
          <div className="space-y-4">
            {question.scenario && (
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="font-medium mb-2">Scenario:</p>
                <p className="text-muted-foreground">{question.scenario}</p>
              </div>
            )}
            <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "editing":
        return (
          <div className="space-y-4">
            {question.editingTask && (
              <>
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <p className="font-medium mb-2">Original Copy:</p>
                  <p className="font-mono text-sm">{question.editingTask.original}</p>
                </div>
                <div className="bg-info/10 p-4 rounded-lg">
                  <p className="font-medium mb-2">Instructions:</p>
                  <p className="text-sm">{question.editingTask.instruction}</p>
                </div>
                <div>
                  <Label htmlFor="editing-answer" className="text-sm font-medium">
                    Your improved version:
                  </Label>
                  <textarea
                    id="editing-answer"
                    value={editingAnswer}
                    onChange={(e) => handleEditingChange(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-lg font-mono text-sm min-h-[100px]"
                    placeholder="Enter your improved copy here..."
                  />
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{question.question}</CardTitle>
          <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
            {question.category.toUpperCase()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderQuestionContent()}
      </CardContent>
    </Card>
  );
};