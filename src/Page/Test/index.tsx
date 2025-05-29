import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Clock, CheckCircle } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import axios from "axios";
import { useGetUserDetails } from "../../hooks/useGetUserDetails";
import Loader from "../../components/ui/loader";

const Test = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const goal = searchParams.get("goal") || "";
  const level = searchParams.get("level") || "";
  const durationInSeconds = searchParams.get("duration") || 900;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(Number(durationInSeconds));
  const cohortDetails = useGetUserDetails();
  const [questions, setQuestionBank] = useState([]);
  console.log("questions: ", questions);
  // const questions = questionBank?.[level as keyof typeof questionBank] || [];

  const getDifficultiesLevel = (level: string) => {
    switch (level) {
      case "beginner":
        return "easy";
      case "intermediate":
        return "medium";
      case "advanced":
        return "hard";

      default:
        return "easy";
    }
  };

  const fetchQuestions = async () => {
    const response = await axios.get(
      "https://know-your-self-be.onrender.com/batch-service/v1/test-roadmap/test",
      {
        params: {
          exam: cohortDetails?.exam[0],
          class: cohortDetails?.class,
          difficultyLevel: getDifficultiesLevel(level),
        },
      }
    );

    const data = response.data;
    console.log("response: ", response);
    console.log("data: ", data);
    setQuestionBank(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      // navigate("/test-selection");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmitTest();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const handleSubmitTest = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
    }

    const finalAnswers =
      selectedAnswer !== null
        ? [
            ...answers.slice(0, currentQuestion),
            selectedAnswer,
            ...answers.slice(currentQuestion + 1),
          ]
        : answers;
    const score = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === (questions[index] as any)?.correct ? 1 : 0);
    }, 0);

    navigate(
      `/results?goal=${goal}&level=${level}&score=${score}&total=${
        questions.length
      }&answers=${finalAnswers.join(",")}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center flex flex-col gap-1 items-center">
          <Loader />
          <span className="text-xl">Preparing your Test...</span>
        </div>
      </div>
    );
  }

  console.log("questions: ", questions);
  if (questions.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Test not found
          </h1>
          <Button onClick={() => navigate("/test-selection")}>
            Back to Test Selection
          </Button>
        </div>
      </div>
    );
  }

  const currentQ: any = questions[currentQuestion];
  console.log("questions: ", questions);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">
                {goal.charAt(0).toUpperCase() + goal.slice(1)} Test -{" "}
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </h1>
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-sm">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Button variant="outline" onClick={handleSubmitTest}>
                Submit Test
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl mb-4">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 md:px-6 pt-0">
              {currentQ.options.map((option: any, index: number) => (
                <div
                  key={index}
                  className={`w-full p-2 border border-[#e1e1e1]  cursor-pointer  md:p-6 rounded-md text-left justify-start h-auto ${
                    selectedAnswer === index
                      ? "bg-[#5a4bda] hover:bg-[#4a3cbf] text-white"
                      : "hover:bg-[#ebe9fd]"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? "border-white bg-white"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedAnswer === index && (
                        <CheckCircle className="h-4 w-4 text-[#5a4bda]" />
                      )}
                    </div>
                    <div className="text-sm w-[calc(100%-24px)]">{option}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-[#5a4bda] hover:bg-[#4a3cbf] text-white"
            >
              {currentQuestion === questions.length - 1
                ? "Submit Test"
                : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
