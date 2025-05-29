import { useState } from "react";

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const levels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Just Started the Preparation",
    duration: "15 minutes",
    questions: "15 questions",
    durationInSeconds: 900,
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Have learnt some topics and have practiced",
    duration: "25 minutes",
    questions: "30 questions",
    durationInSeconds: 1500,
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Have learnt almost all topics and have practiced",
    duration: "35 minutes",
    questions: "45 questions",
    durationInSeconds: 2100,
  },
];

const TestSelection = () => {
  const [selectedGoal] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center space-x-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex justify-start items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Choose Your Test
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
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
                  onClick={() => {
                    setSelectedLevel(level.id);
                    setSelectedDuration(level.durationInSeconds);
                  }}
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
              <Link
                to={`/test?level=${selectedLevel}&duration=${selectedDuration}`}
              >
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
