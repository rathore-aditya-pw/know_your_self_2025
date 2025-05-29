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
import { useGetUserDetails } from "../../hooks/useGetUserDetails";
import { useEffect, useState } from "react";
import { useGetTestSubmission } from "../../hooks/useGetTestSubmission";
import axios from "axios";

import RoadmapComponent from "../../components/ui/roadmap";

interface Topic {
  topic: string;
  accuracy: number;
  avgTime: number;
}

interface SubjectData {
  level: string;
  accuracy: number;
  avgTime: number;
  topperAccuracy: number;
  topperAvgTime: number;
  strongTopics: Topic[];
  weakTopics: Topic[];
  total: number;
  correct: number;
}

interface InputData {
  [key: string]: SubjectData;
}

interface ExtractedSubjects {
  strongSubjects: { [key: string]: string[] };
  weakSubjects: { [key: string]: string[] };
}

const Results = () => {
  const [isLoadingRoadMap, setIsLoadingRoadMap] = useState(true);
  const [roadmapData, setRoadmapData] = useState<any[]>([]);
  const userDetail = useGetUserDetails();
  const testSubmission = useGetTestSubmission();
  console.log("testSubmission: ", testSubmission);
  const [topTwoBatches, setTopTwoBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<any | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const extractTopicNames = (data: InputData): ExtractedSubjects => {
    console.log("data:== ", data);
    return Object.entries(data).reduce(
      (acc, [subject, subjectData]) => {
        const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);

        acc.strongSubjects[subjectName] = subjectData.strongTopics.map(
          (topic) => topic.topic
        );
        acc.weakSubjects[subjectName] = subjectData.weakTopics.map(
          (topic) => topic.topic
        );

        return acc;
      },
      { strongSubjects: {}, weakSubjects: {} } as ExtractedSubjects
    );
  };

  const fetchRoadMap = async () => {
    const res = await axios.post(
      "https://stage-api.penpencil.co/batch-service/test-mettle/get-roadmap",
      {
        classes: userDetail?.class,
        exam: userDetail?.exam[0],
        duration: 6,
        durationType: "Week",
        strongSubjects: extractTopicNames(testSubmission?.subjects)
          ?.strongSubjects,
        weakSubjects: extractTopicNames(testSubmission?.subjects)?.weakSubjects,
      },
      {
        headers: {
          Authorization: `Bearer ${userDetail?.token}`,
        },
      }
    );

    const roadmapData = res.data?.data?.roadmap || [];
    console.log("res.data: ", res.data);
    console.log("roadmapData: ", roadmapData);
    setRoadmapData(roadmapData);
    setIsLoadingRoadMap(false);
  };
  const fetchBatches = async () => {
    const response = await axios.get(
      `https://stage-api.penpencil.co/v1/cohort/${userDetail?.cohortId}/batches`,
      {
        params: {
          page: 1,
          version: 2,
          filter: true,
          tag: "online",
        },
        headers: {
          Authorization: `Bearer ${userDetail?.token}`,
          "Content-Type": "application/json",
          "X-Client-Id": "penpencil-web",
          "X-Client-Version": "1.0.0",
          "X-User-Id": userDetail?.userId,
        },
      }
    );

    const fullData = response.data;
    const topTwo = fullData.data.slice(0, 2);

    const enrichedBatches: any[] = topTwo.map((item: any, index: number) => ({
      batchId: item.batchId,
      recommended: index === 0,
      features:
        index === 0
          ? [
              "Live Classes",
              "Doubt Resolution",
              "Test Series",
              "Study Material",
            ]
          : [
              "Recorded Lectures",
              "Practice Tests",
              "Mentorship",
              "Study Material",
            ],
    }));
    setTopTwoBatches(enrichedBatches);
    setSelectedBatch(enrichedBatches[0]);
  };

  const fetchPlans = async () => {
    const response = await axios.get(
      `https://stage-api.penpencil.co/batch-service/v2/batch-plans/${selectedBatch.batchId._id}/compare-plans
`,
      {
        headers: {
          Authorization: `Bearer ${userDetail?.token}`,
          "Content-Type": "application/json",
          "X-Client-Id": "penpencil-web",
          "X-Client-Version": "1.0.0",
          "X-User-Id": userDetail?.userId,
        },
      }
    );

    const plansData = response.data?.data?.plans || [];
    setPlans(plansData);
    setSelectedPlan(plansData[0]);
    console.log("Fetched Plans:", plansData);
  };

  useEffect(() => {
    fetchRoadMap();
    fetchBatches();
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      fetchPlans();
    }
  }, [selectedBatch]);

  const score = testSubmission?.overall?.correctQuestions || 0;
  const total = testSubmission?.availableQuestion || 10;

  const percentage = Math.round((score / total) * 100);

  const subjectPerformance = testSubmission?.subjects;
  console.log("subjectPerformance: ", subjectPerformance);

  const performanceParams = Object.entries(testSubmission?.skills)?.reduce(
    (acc: any, data: any) => {
      return [
        ...acc,
        {
          parameter: data[0],
          maxScore: 100,
          score: data[1].accuracy,
          topperAvgTime: data[1].topperAccuracy,
        },
      ];
    },
    []
  );
  console.log("performanceParams: ", performanceParams);

  const radarData = performanceParams.map((data: any) => ({
    parameter: data.parameter,
    score: data.score,
    topperAvg: data.topperAvgTime,
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

  const improvement = performanceParams.filter(
    (param: any) => param.score < 75
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-gray-50 to-brand-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-brand-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {userDetail?.username}
              </h1>
              <p className="text-brand-500">
                Detailed insights to accelerate your preparation
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="border-brand-500 text-brand-500 hover:bg-brand-50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Challenge Friend
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Your Score Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl">
              <CardHeader className="text-center pb-2">
                <Trophy className="h-12 w-12 mx-auto text-yellow-300 mb-2" />
                <CardTitle className="text-2xl">Your Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold mb-2">{percentage}%</div>
                <div className="text-brand-200">
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

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-200">
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

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-200">
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
                  <span>
                    Toppers:{" "}
                    {Math.round(testSubmission?.overall?.topperAccuracy)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Performance */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-100">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-brand-500" />
                <span>Subject-wise Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(subjectPerformance).map(
                  ([subject, data], index) => {
                    return (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                            {subject === "physics" && (
                              <Zap className="h-4 w-4" />
                            )}
                            {subject === "chemistry" && (
                              <Atom className="h-4 w-4" />
                            )}
                            {subject === "Mathematics" && (
                              <Calculator className="h-4 w-4" />
                            )}
                            <span className="uppercase">{subject}</span>
                          </h3>
                          <Badge
                            variant={
                              (data as any)?.accuracy >= 75
                                ? "default"
                                : "secondary"
                            }
                          >
                            {(data as any)?.accuracy}%
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Your Score</span>
                            <span>{(data as any)?.accuracy}%</span>
                          </div>
                          <Progress
                            value={(data as any)?.accuracy}
                            className="h-2"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>
                              Topper Avg: {(data as any)?.topperAccuracy}%
                            </span>
                            {(data as any)?.accuracy < 100 ? (
                              <span className="text-red-500">
                                Gap:{" "}
                                {(data as any)?.topperAccuracy -
                                  (data as any)?.accuracy}
                                %
                              </span>
                            ) : (
                              <div className="text-white text-xs flex items-center justify-center rounded-full px-3 bg-green-500">
                                Awesome
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Parameters Radar Chart */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-100">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Target className="h-6 w-6 text-brand-500" />
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
                        stroke="#5A4BDA"
                        fill="#5A4BDA"
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

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-100">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  <span>Improvement Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvement?.length > 0 ? (
                    improvement.map((param: any, index: any) => (
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
                          Focus area -{" "}
                          {param.score <= 0
                            ? 100
                            : 25 - (Math.round(param.score) - 50)}
                          % improvement needed
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-[200px] justify-center items-center">
                      Everything looks good as is
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Roadmap */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-100">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <div className="flex items-center">
                  <ArrowRight className="h-6 w-6 text-brand-500" />
                </div>
                <div className="text-2xl  bg-gradient-to-r from-[#5a4bda] to-blue-600 bg-clip-text text-transparent">
                  Personalized Roadmap
                </div>
              </CardTitle>
              <CardDescription>
                Your journey to mastery, week by week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoadmapComponent
                isLoading={isLoadingRoadMap}
                roadmapData={roadmapData}
              />
            </CardContent>
          </Card>

          {/* PW Batch Recommendations */}
          <Card className="bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Crown className="h-6 w-6 text-yellow-300" />
                <span>Recommended PW Batches</span>
              </CardTitle>
              <CardDescription className="text-brand-50">
                Based on your performance analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {topTwoBatches.map((batch, index) => {
                  const isSelected =
                    selectedBatch?.batchId._id === batch.batchId._id;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedBatch(batch)}
                      className={`p-6 rounded-lg border-2 cursor-pointer ${
                        isSelected
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
                          <h3 className="text-xl font-bold">
                            {batch.batchId.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-2xl font-bold">
                              ₹{batch.batchId.feeId.amount}
                            </span>
                            <Badge className="bg-green-500 text-white">
                              {batch.batchId.feeId.discount}% OFF
                            </Badge>
                          </div>
                          <p className="text-brand-50">
                            {new Date(
                              batch.batchId.startDate
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              batch.batchId.endDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <ul className="space-y-2">
                            {batch.features.map((feature: any, i: any) => (
                              <li
                                key={i}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-400" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button className="w-full bg-white text-brand-500 hover:bg-gray-100">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Free Trial Conversion */}
          <Card className="bg-gradient-to-r bg-[#1b2124] text-white shadow-xl">
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

              <div className="flex flex-wrap justify-center gap-6">
                {plans.map((plan) => {
                  const isSelected = selectedPlan?._id === plan._id;

                  return (
                    <div
                      key={plan._id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-4 rounded-lg cursor-pointer border-2 transition-all w-80 ${
                        isSelected
                          ? "border-yellow-300 bg-white/20"
                          : "border-white/10 bg-white/10"
                      }`}
                    >
                      {plan.isBest && (
                        <Badge className="bg-yellow-500 text-black mb-2">
                          Most Popular
                        </Badge>
                      )}

                      <h3 className="font-bold">{plan.title}</h3>
                      <p className="text-2xl font-bold">
                        ₹{plan.priceAfterDiscount}
                      </p>
                      <p className="text-sm text-green-100">
                        Monthly: ₹{plan.pricePerMonth || plan.price}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#1b2124] hover:bg-gray-100 px-8 py-3">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1b2124] px-8 py-3"
                >
                  View All Plans
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Friend */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-brand-200">
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <Share2 className="h-12 w-12 mx-auto text-brand-500" />
                <h3 className="text-xl font-bold text-gray-800">
                  Challenge Your Friends!
                </h3>
                <p className="text-gray-600">
                  See how you stack up against your study group
                </p>
                <div className="flex flex-col gap-2 md:flex-row justify-center">
                  <Button className="text-white bg-brand-500 hover:bg-brand-600">
                    <Share2 className="h-4 w-4" />
                    Share Test Link
                  </Button>
                  <Button
                    variant="outline"
                    className="border-brand-300 text-brand-600 hover:bg-brand-50"
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
