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

// Sample questions for different goals and levels
const questionBank = {
  //   programming: {
  beginner: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      correct: 0,
    },
    {
      question: "Which of the following is NOT a programming language?",
      options: ["Python", "JavaScript", "HTML", "Java"],
      correct: 2,
    },
    {
      question: "What is a variable in programming?",
      options: [
        "A fixed value",
        "A container for storing data",
        "A type of loop",
        "A function",
      ],
      correct: 1,
    },
  ],
  intermediate: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
    },
    {
      question:
        "Which design pattern is used to create objects without specifying their exact class?",
      options: ["Singleton", "Observer", "Factory", "Decorator"],
      correct: 2,
    },
    {
      question: "What does REST stand for in web APIs?",
      options: [
        "Remote Execution State Transfer",
        "Representational State Transfer",
        "Reliable Execution State Transfer",
        "Resource Execution State Transfer",
      ],
      correct: 1,
    },
  ],
  advanced: [
    {
      question:
        "What is the primary benefit of using microservices architecture?",
      options: [
        "Faster development",
        "Better scalability and maintainability",
        "Reduced cost",
        "Simpler deployment",
      ],
      correct: 1,
    },
    {
      question: "In functional programming, what is a pure function?",
      options: [
        "A function without side effects",
        "A function that returns the same output for the same input",
        "A function with no external dependencies",
        "All of the above",
      ],
      correct: 3,
    },
    {
      question: "What is the CAP theorem in distributed systems?",
      options: [
        "Consistency, Availability, Partition tolerance",
        "Concurrency, Atomicity, Performance",
        "Caching, Authentication, Performance",
        "Consistency, Atomicity, Performance",
      ],
      correct: 0,
    },
  ],
  //   },
  //   design: {
  //     beginner: [
  //       {
  //         question: "What are the primary colors?",
  //         options: [
  //           "Red, Blue, Yellow",
  //           "Red, Green, Blue",
  //           "Red, Blue, Green",
  //           "Yellow, Blue, Green",
  //         ],
  //         correct: 0,
  //       },
  //       {
  //         question: "What does UX stand for?",
  //         options: [
  //           "User Experience",
  //           "User Extension",
  //           "Universal Experience",
  //           "User Expert",
  //         ],
  //         correct: 0,
  //       },
  //       {
  //         question: "Which software is commonly used for vector graphics?",
  //         options: ["Photoshop", "Illustrator", "Premiere", "After Effects"],
  //         correct: 1,
  //       },
  //     ],
  //     intermediate: [
  //       {
  //         question: "What is the golden ratio approximately?",
  //         options: ["1.414", "1.618", "1.732", "2.000"],
  //         correct: 1,
  //       },
  //       {
  //         question: "What is a wireframe in UX design?",
  //         options: [
  //           "A high-fidelity mockup",
  //           "A low-fidelity structural blueprint",
  //           "A color palette",
  //           "A typography guide",
  //         ],
  //         correct: 1,
  //       },
  //       {
  //         question: "Which color model is used for print design?",
  //         options: ["RGB", "CMYK", "HSB", "LAB"],
  //         correct: 1,
  //       },
  //     ],
  //     advanced: [
  //       {
  //         question: "What is the difference between serif and sans-serif fonts?",
  //         options: [
  //           "Serif fonts have decorative strokes",
  //           "Sans-serif fonts are more readable",
  //           "Serif fonts are older",
  //           "All of the above",
  //         ],
  //         correct: 3,
  //       },
  //       {
  //         question: "What is the 60-30-10 rule in color theory?",
  //         options: [
  //           "A rule for font sizes",
  //           "A color proportion guideline",
  //           "A spacing rule",
  //           "A contrast ratio",
  //         ],
  //         correct: 1,
  //       },
  //       {
  //         question: "What is progressive disclosure in UX design?",
  //         options: [
  //           "Revealing information gradually",
  //           "Using progressive web apps",
  //           "Implementing gradual loading",
  //           "Progressive color schemes",
  //         ],
  //         correct: 0,
  //       },
  //     ],
  //   },
};

const Test = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const goal = searchParams.get("goal") || "";
  const level = searchParams.get("level") || "";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = questionBank?.[level as keyof typeof questionBank] || [];

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/test-selection");
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
  }, [questions.length, navigate]);

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
      return acc + (answer === questions[index]?.correct ? 1 : 0);
    }, 0);

    navigate(
      `/results?goal=${goal}&level=${level}&score=${score}&total=${
        questions.length
      }&answers=${finalAnswers.join(",")}`
    );
  };

  if (questions.length === 0) {
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

  const currentQ = questions[currentQuestion];
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
              {currentQ.options.map((option, index) => (
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
