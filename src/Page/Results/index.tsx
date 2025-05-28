import { useSearchParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Trophy,
  Target,
  BookOpen,
  CheckCircle,
  XCircle,
  ArrowRight,
  Users,
  TrendingUp,
  PlayCircle,
  FileText,
  Share2,
  Lock,
  Crown,
  Zap,
  Brain,
  Calculator,
  Atom,
} from "lucide-react";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Results = () => {
  const [searchParams] = useSearchParams();
  const goal = searchParams.get("goal") || "programming";
  const level = searchParams.get("level") || "beginner";
  const score = parseInt(searchParams.get("score") || "75");
  const total = parseInt(searchParams.get("total") || "100");
  const answers = searchParams.get("answers")?.split(",").map(Number) || [];

  const percentage = Math.round((score / total) * 100);

  // Mock data for JEE performance analysis
  const subjectPerformance = [
    { subject: "Physics", score: 78, topperAvg: 92, color: "#8b5cf6" },
    { subject: "Chemistry", score: 72, topperAvg: 88, color: "#06b6d4" },
    { subject: "Mathematics", score: 80, topperAvg: 95, color: "#10b981" },
  ];

  const performanceParams = [
    { parameter: "Concept Clarity", score: 75, maxScore: 100 },
    { parameter: "Theoretical Knowledge", score: 82, maxScore: 100 },
    { parameter: "Problem Solving", score: 70, maxScore: 100 },
    { parameter: "Application Skills", score: 68, maxScore: 100 },
    { parameter: "Speed & Accuracy", score: 65, maxScore: 100 },
    { parameter: "Formula Retention", score: 85, maxScore: 100 },
  ];

  const radarData = performanceParams.map((param) => ({
    parameter: param.parameter.split(" ")[0],
    score: param.score,
    topperAvg: param.score + 15,
  }));

  const weeklyRoadmap = [
    {
      week: 1,
      title: "Foundation Strengthening",
      focus: "Concept Clarity & Basic Problem Solving",
      videos: [
        "Kinematics Basics",
        "Organic Chemistry Fundamentals",
        "Coordinate Geometry",
      ],
      practice: ["50 Basic Problems", "Formula Revision", "Concept Maps"],
      tests: ["Weekly Assessment 1", "Subject-wise Mini Tests"],
      free: true,
    },
    {
      week: 2,
      title: "Application Development",
      focus: "Advanced Problem Solving",
      videos: [
        "Complex Problem Strategies",
        "Time Management",
        "Error Analysis",
      ],
      practice: ["100 Medium Level Problems", "Previous Year Questions"],
      tests: ["Mock Test 1", "Speed Test Series"],
      free: false,
    },
    {
      week: 3,
      title: "Speed Enhancement",
      focus: "Time Management & Accuracy",
      videos: ["Quick Solving Techniques", "Formula Shortcuts"],
      practice: ["Timed Practice Sessions", "Error Log Maintenance"],
      tests: ["Full Length Mock", "Subject-wise Tests"],
      free: false,
    },
  ];

  const pwBatches = [
    {
      name: "Arjuna JEE 2025",
      price: "₹15,999",
      duration: "12 Months",
      features: [
        "Live Classes",
        "Doubt Resolution",
        "Test Series",
        "Study Material",
      ],
      recommended: true,
      discount: "30% OFF",
    },
    {
      name: "Lakshya JEE 2026",
      price: "₹12,999",
      duration: "6 Months",
      features: ["Recorded Lectures", "Practice Tests", "Mentorship"],
      recommended: false,
      discount: "25% OFF",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-50 to-purple-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                JEE Performance Analysis
              </h1>
              <p className="text-purple-600">
                Detailed insights to accelerate your preparation
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Challenge Friend
              </Button>
              <Link to="/test-selection">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Retake Test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Your Score Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl">
              <CardHeader className="text-center pb-2">
                <Trophy className="h-12 w-12 mx-auto text-yellow-300 mb-2" />
                <CardTitle className="text-2xl">Your Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold mb-2">{percentage}%</div>
                <div className="text-purple-200">
                  ({score}/{total} marks)
                </div>
                <Badge className="mt-3 bg-white/20 text-white border-white/30">
                  {percentage >= 80
                    ? "Excellent"
                    : percentage >= 60
                    ? "Good"
                    : "Needs Improvement"}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
              <CardHeader className="text-center pb-2">
                <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg text-gray-800">
                  Rank Potential
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  AIR 15,000 - 25,000
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Based on current performance
                </div>
                <Progress value={65} className="h-3" />
                <div className="text-xs text-gray-500 mt-2">
                  65% to target rank
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
              <CardHeader className="text-center pb-2">
                <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg text-gray-800">
                  Topper Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  15% Gap
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  From topper average
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>You: {percentage}%</span>
                  <span>Toppers: 90%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Performance */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <span>Subject-wise Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                        {subject.subject === "Physics" && (
                          <Zap className="h-4 w-4" />
                        )}
                        {subject.subject === "Chemistry" && (
                          <Atom className="h-4 w-4" />
                        )}
                        {subject.subject === "Mathematics" && (
                          <Calculator className="h-4 w-4" />
                        )}
                        <span>{subject.subject}</span>
                      </h3>
                      <Badge
                        variant={subject.score >= 75 ? "default" : "secondary"}
                      >
                        {subject.score}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Your Score</span>
                        <span>{subject.score}%</span>
                      </div>
                      <Progress value={subject.score} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Topper Avg: {subject.topperAvg}%</span>
                        <span className="text-red-500">
                          Gap: {subject.topperAvg - subject.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Parameters Radar Chart */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Target className="h-6 w-6 text-purple-600" />
                  <span>Performance Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="parameter" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Your Score"
                        dataKey="score"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Topper Average"
                        dataKey="topperAvg"
                        stroke="#06b6d4"
                        fill="transparent"
                        strokeDasharray="5 5"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  <span>Improvement Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceParams
                    .filter((param) => param.score < 75)
                    .map((param, index) => (
                      <div
                        key={index}
                        className="p-4 bg-red-50 rounded-lg border border-red-200"
                      >
                        <h3 className="font-semibold text-red-800">
                          {param.parameter}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <Progress
                            value={param.score}
                            className="flex-1 mr-4 h-2"
                          />
                          <span className="text-red-600 font-semibold">
                            {param.score}%
                          </span>
                        </div>
                        <p className="text-sm text-red-600 mt-2">
                          Focus area - {25 - (param.score - 50)}% improvement
                          needed
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Roadmap */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <ArrowRight className="h-6 w-6 text-purple-600" />
                <span>Personalized 7-Day Roadmap</span>
              </CardTitle>
              <CardDescription>
                Free for the first week, then unlock premium features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyRoadmap.map((week, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${
                      week.free
                        ? "border-green-300 bg-green-50"
                        : "border-purple-300 bg-purple-50"
                    } relative`}
                  >
                    {!week.free && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-purple-600 text-white">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          week.free ? "bg-green-600" : "bg-purple-600"
                        }`}
                      >
                        {week.week}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {week.title}
                        </h3>
                        <p className="text-sm text-gray-600">{week.focus}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 flex items-center space-x-2 mb-2">
                          <PlayCircle className="h-4 w-4" />
                          <span>Videos</span>
                        </h4>
                        <ul className="space-y-1">
                          {week.videos.map((video, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex items-center space-x-2"
                            >
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{video}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 flex items-center space-x-2 mb-2">
                          <Brain className="h-4 w-4" />
                          <span>Practice</span>
                        </h4>
                        <ul className="space-y-1">
                          {week.practice.map((practice, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex items-center space-x-2"
                            >
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{practice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 flex items-center space-x-2 mb-2">
                          <FileText className="h-4 w-4" />
                          <span>Tests</span>
                        </h4>
                        <ul className="space-y-1">
                          {week.tests.map((test, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex items-center space-x-2"
                            >
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PW Batch Recommendations */}
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Crown className="h-6 w-6 text-yellow-300" />
                <span>Recommended PW Batches</span>
              </CardTitle>
              <CardDescription className="text-purple-100">
                Based on your performance analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {pwBatches.map((batch, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${
                      batch.recommended
                        ? "border-yellow-300 bg-white/10"
                        : "border-white/30 bg-white/5"
                    } relative`}
                  >
                    {batch.recommended && (
                      <Badge className="absolute -top-2 left-4 bg-yellow-500 text-black">
                        Recommended
                      </Badge>
                    )}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">{batch.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-2xl font-bold">
                            {batch.price}
                          </span>
                          <Badge className="bg-green-500 text-white">
                            {batch.discount}
                          </Badge>
                        </div>
                        <p className="text-purple-100">{batch.duration}</p>
                      </div>
                      <div>
                        <ul className="space-y-2">
                          {batch.features.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Free Trial Conversion */}
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                🎯 Unlock Your Full Potential
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-green-100 text-lg">
                You've completed your free analysis! Choose a plan to continue
                your JEE journey
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-bold">3 Months</h3>
                  <p className="text-2xl font-bold">₹2,999</p>
                  <p className="text-sm text-green-100">
                    Perfect for quick revision
                  </p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg border-2 border-yellow-300">
                  <Badge className="bg-yellow-500 text-black mb-2">
                    Most Popular
                  </Badge>
                  <h3 className="font-bold">6 Months</h3>
                  <p className="text-2xl font-bold">₹4,999</p>
                  <p className="text-sm text-green-100">
                    Comprehensive preparation
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-bold">12 Months</h3>
                  <p className="text-2xl font-bold">₹7,999</p>
                  <p className="text-sm text-green-100">Complete mastery</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
                >
                  View All Plans
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Friend */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-purple-200">
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <Share2 className="h-12 w-12 mx-auto text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  Challenge Your Friends!
                </h3>
                <p className="text-gray-600">
                  See how you stack up against your study group
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Test Link
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Create Group Challenge
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
