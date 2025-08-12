import { Question } from "@/components/assessment/QuestionCard";

export const assessmentQuestions: Question[] = [
  // Psychometric Questions
  {
    id: "psych_1",
    category: "psychometric",
    type: "likert",
    question: "I enjoy writing that helps people accomplish their goals more effectively."
  },
  {
    id: "psych_2", 
    category: "psychometric",
    type: "likert",
    question: "I find satisfaction in simplifying complex information for others."
  },
  {
    id: "psych_3",
    category: "psychometric", 
    type: "likert",
    question: "I naturally consider how my words might affect someone's emotions and actions."
  },
  {
    id: "psych_4",
    category: "psychometric",
    type: "multiple_choice",
    question: "When approaching a new project, I typically:",
    options: [
      "Jump right in and start creating",
      "Research thoroughly before beginning", 
      "Collaborate with others to understand requirements",
      "Create a detailed plan and timeline"
    ]
  },
  {
    id: "psych_5",
    category: "psychometric",
    type: "scenario",
    question: "How would you approach this situation?",
    scenario: "A user reports that they can't find the checkout button on an e-commerce site. The button is clearly visible but users keep missing it.",
    options: [
      "Make the button bigger and more colorful",
      "Research similar user complaints and test button placement",
      "Add more explanatory text around the button", 
      "Change the button text to be more action-oriented"
    ]
  },

  // Technical Questions
  {
    id: "tech_1",
    category: "technical",
    type: "multiple_choice",
    question: "What is the primary goal of UX writing?",
    options: [
      "To showcase creative writing skills",
      "To guide users smoothly through interface interactions",
      "To promote brand personality",
      "To provide detailed product information"
    ]
  },
  {
    id: "tech_2",
    category: "technical",
    type: "editing",
    question: "Improve this error message for better user experience:",
    editingTask: {
      original: "ERROR: Invalid input detected. Please check your data and try again.",
      instruction: "Rewrite this error message to be more user-friendly and actionable."
    }
  },
  {
    id: "tech_3",
    category: "technical",
    type: "multiple_choice",
    question: "Which principle is most important for effective microcopy?",
    options: [
      "Being clever and memorable",
      "Using technical accuracy",
      "Being clear and concise",
      "Matching brand voice perfectly"
    ]
  },
  {
    id: "tech_4",
    category: "technical",
    type: "editing",
    question: "Improve this call-to-action button text:",
    editingTask: {
      original: "Click Here",
      instruction: "Rewrite this button text to be more specific and action-oriented for a newsletter signup."
    }
  },

  // WISCAR Framework Questions
  {
    id: "wiscar_will_1",
    category: "wiscar",
    type: "likert", 
    question: "I am willing to spend time learning about user psychology and behavior."
  },
  {
    id: "wiscar_will_2",
    category: "wiscar",
    type: "scenario",
    question: "You receive critical feedback about copy you wrote. Your response:",
    scenario: "A colleague points out that your copy for a form might be confusing users and suggests major revisions.",
    options: [
      "Defend your original approach with reasoning",
      "Immediately accept the feedback and make changes",
      "Ask for specific examples and user data to understand the issue",
      "Suggest testing both versions to see which performs better"
    ]
  },
  {
    id: "wiscar_interest_1", 
    category: "wiscar",
    type: "likert",
    question: "I find it exciting to analyze how word choices affect user behavior."
  },
  {
    id: "wiscar_interest_2",
    category: "wiscar",
    type: "multiple_choice",
    question: "Which UX writing task sounds most appealing to you?",
    options: [
      "Writing onboarding flows for new apps",
      "Crafting error messages that reduce user frustration",
      "Creating consistent voice and tone guidelines", 
      "A/B testing different copy variations"
    ]
  },
  {
    id: "wiscar_skill_1",
    category: "wiscar", 
    type: "editing",
    question: "Simplify this instruction for a mobile app:",
    editingTask: {
      original: "To initiate the process of creating your user profile, please navigate to the account settings section and locate the profile configuration options.",
      instruction: "Rewrite this to be clear and concise for mobile users."
    }
  },
  {
    id: "wiscar_cognitive_1",
    category: "wiscar",
    type: "scenario",
    question: "Analyze this A/B test result:",
    scenario: "Version A: 'Start Free Trial' (12% click rate) vs Version B: 'Try Free for 30 Days' (18% click rate). Both buttons were identical except for text.",
    options: [
      "Version B won because it's more specific about the trial length",
      "Version B won because it sounds more beneficial to users",
      "Version A lost because it seems too sales-focused", 
      "The result is inconclusive without more context about the audience"
    ]
  },
  {
    id: "wiscar_ability_1",
    category: "wiscar",
    type: "likert",
    question: "I actively seek feedback on my writing to improve my skills."
  },
  {
    id: "wiscar_ability_2",
    category: "wiscar",
    type: "multiple_choice", 
    question: "When learning a new UX writing concept, you prefer:",
    options: [
      "Reading detailed guides and documentation",
      "Watching video tutorials and examples",
      "Practicing with hands-on exercises",
      "Discussing with peers and mentors"
    ]
  },
  {
    id: "wiscar_real_world_1",
    category: "wiscar",
    type: "scenario",
    question: "How do you handle this common workplace situation?",
    scenario: "You're working on copy for a new feature launch. Marketing wants promotional language, while the product team wants purely functional descriptions.",
    options: [
      "Create two separate versions for different contexts",
      "Find a middle ground that satisfies both teams",
      "Advocate for the user's perspective above all else",
      "Present user research to guide the decision"
    ]
  },
  {
    id: "wiscar_real_world_2",
    category: "wiscar",
    type: "likert",
    question: "I would enjoy collaborating daily with designers, developers, and product managers."
  }
];