import { useState } from "react";

import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code,
  Palette,
  TrendingUp,
  Camera,
  Music,
  Globe,
  Briefcase,
  Heart,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const goals = [
  {
    id: "programming",
    name: "Programming",
    description: "Web development, algorithms, and software engineering",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "design",
    name: "Design",
    description: "UI/UX design, graphic design, and visual creativity",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Digital marketing, SEO, and content strategy",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "photography",
    name: "Photography",
    description: "Digital photography, editing, and visual storytelling",
    icon: Camera,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "music",
    name: "Music Production",
    description: "Audio engineering, composition, and music theory",
    icon: Music,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "language",
    name: "Language Learning",
    description: "Foreign languages, grammar, and communication",
    icon: Globe,
    color: "from-teal-500 to-blue-500",
  },
  {
    id: "business",
    name: "Business Strategy",
    description: "Entrepreneurship, management, and leadership",
    icon: Briefcase,
    color: "from-gray-600 to-gray-800",
  },
  {
    id: "wellness",
    name: "Health & Wellness",
    description: "Nutrition, fitness, and mental health",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
];

const levels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Just starting out or have basic knowledge",
    duration: "15 minutes",
    questions: "20 questions",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Have some experience and want to level up",
    duration: "25 minutes",
    questions: "30 questions",
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Experienced and looking for expert validation",
    duration: "35 minutes",
    questions: "40 questions",
  },
];

const TestSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Choose Your Test</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {/* <div
              className={`flex items-center space-x-2 ${
                selectedGoal ? "text-green-600" : "text-purple-600"
              }`}
            > */}
            {/* <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedGoal
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 text-white"
                }`}
              >
                1
              </div>
              <span className="font-medium">Select Goal</span>
            </div> */}
            {/* <div
              className={`h-1 flex-1 mx-4 ${
                selectedGoal ? "bg-green-600" : "bg-gray-300"
              } rounded`}
            ></div> */}
            <div
              className={`flex items-center space-x-2 ${
                selectedLevel
                  ? "text-green-600"
                  : selectedGoal
                  ? "text-purple-600"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedLevel
                    ? "bg-green-600 text-white"
                    : selectedGoal
                    ? "bg-purple-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                1
              </div>
              <span className="font-medium">Select Level</span>
            </div>
            <div
              className={`h-1 flex-1 mx-4 ${
                selectedLevel ? "bg-green-600" : "bg-gray-300"
              } rounded`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                selectedLevel ? "text-[#4a3cbf]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedLevel
                    ? "bg-[#5a4bda] text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="font-medium">Start Test</span>
            </div>
          </div>
        </div>

        {/* Goal Selection */}
        {/* <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What would you like to test?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal) => {
              const IconComponent = goal.icon;
              return (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                    selectedGoal === goal.id
                      ? "border-purple-500 bg-purple-50 shadow-lg"
                      : "border-gray-200 bg-white/70 backdrop-blur-sm hover:shadow-md"
                  }`}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <CardHeader className="text-center pb-2">
                    <div
                      className={`mx-auto w-16 h-16 bg-gradient-to-r ${goal.color} rounded-full flex items-center justify-center mb-3`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm">
                      {goal.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div> */}

        {/* Level Selection */}
        {
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Choose your level
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {levels.map((level) => (
                <Card
                  key={level.id}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                    selectedLevel === level.id
                      ? "border-[#5a4bda] bg-[#ebe9fd] shadow-lg"
                      : "border-gray-200 bg-white/70 backdrop-blur-sm hover:shadow-md"
                  }`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-center">
                      {level.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-center">
                      {level.description}
                    </CardDescription>
                    <div className="flex justify-center space-x-4">
                      <Badge variant="secondary">{level.duration}</Badge>
                      <Badge variant="secondary">{level.questions}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        }

        {/* Start Test Button */}
        {selectedLevel && (
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Ready to start?
              </h3>
              <div className="text-gray-600 mb-6">
                <p>
                  <strong>Level:</strong>{" "}
                  {selectedLevel.charAt(0).toUpperCase() +
                    selectedLevel.slice(1)}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {levels.find((l) => l.id === selectedLevel)?.duration}
                </p>
              </div>
              <Link to={`/test?level=${selectedLevel}`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] hover:from-[#5a4bda] hover:to-[#3a2bad] text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Test Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSelection;
