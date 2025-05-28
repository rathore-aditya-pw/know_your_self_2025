import { Link } from "react-router-dom";
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
  Share2,
  CheckCircle,
  AlertTriangle,
  Target,
  BookOpen,
  Users,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const PWResults = () => {
  // const [searchParams] = useSearchParams();
  const overallScore = 62; // This would come from the quiz results

  // Mock data - would come from actual quiz results
  const subjectScores = [
    { subject: "Physics", score: 70, color: "#22c55e" },
    { subject: "Chemistry", score: 55, color: "#f59e0b" },
    { subject: "Biology", score: 60, color: "#ef4444" },
  ];

  const performanceData = [
    { name: "Strong", value: 40, color: "#22c55e" },
    { name: "Average", value: 35, color: "#f59e0b" },
    { name: "Needs Work", value: 25, color: "#ef4444" },
  ];

  const recommendedBatches = [
    {
      title: "Infinity Pro Batch",
      label: "Covers your weak areas",
      description: "Complete NEET preparation with focus on Chemistry",
      price: "₹15,999",
      originalPrice: "₹19,999",
      features: ["Live Classes", "Doubt Resolution", "Test Series"],
      popular: true,
    },
    {
      title: "Arjuna JEE Batch",
      label: "Most popular for your level",
      description: "Comprehensive JEE Main + Advanced preparation",
      price: "₹12,999",
      originalPrice: "₹16,999",
      features: ["Recorded Lectures", "Practice Tests", "Personal Mentor"],
    },
  ];

  const insights = [
    {
      type: "strong",
      icon: CheckCircle,
      text: "Strong in Motion and Thermodynamics",
      color: "text-green-600",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Needs improvement in Organic Chemistry",
      color: "text-amber-600",
    },
    {
      type: "average",
      icon: Target,
      text: "Good foundation in Cell Biology",
      color: "text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your Readiness Report
              </h1>
              <p className="text-gray-600 mt-2">
                Based on your responses, we've analyzed your strengths and gaps.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Performance Summary */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Overall Score Card */}
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <span>Overall Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">
                    {overallScore}%
                  </div>
                  <div className="text-lg text-gray-600">
                    You're on the right track!
                  </div>
                </div>

                <div className="w-48 h-48 mx-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center space-x-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subject Breakdown */}
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span>Subject-wise Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {subjectScores.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {subjectScores.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          {subject.subject}
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: subject.color }}
                        >
                          {subject.score}%
                        </span>
                      </div>
                      <Progress value={subject.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span>Key Insights</span>
              </CardTitle>
              <CardDescription>
                Here's what your performance tells us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border"
                  >
                    <insight.icon
                      className={`h-5 w-5 mt-0.5 ${insight.color}`}
                    />
                    <span className="text-gray-700">{insight.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Next Steps */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Recommended for You
              </h2>
              <p className="text-gray-600">
                Batches and resources tailored to boost your weak areas
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {recommendedBatches.map((batch, index) => (
                <Card
                  key={index}
                  className="bg-white/70 backdrop-blur-sm shadow-lg border-0 relative overflow-hidden"
                >
                  {batch.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{batch.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-sm">
                        {batch.label}
                      </Badge>
                      <CardDescription className="text-gray-600">
                        {batch.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-purple-600">
                        {batch.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {batch.originalPrice}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        Save 20%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {batch.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Join Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Free Resources */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2 text-green-800">
                <BookOpen className="h-5 w-5" />
                <span>Free Resources to Get Started</span>
              </CardTitle>
              <CardDescription className="text-green-700">
                Start improving immediately with these free tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/70 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Infinite Practice
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    Revise weak areas with unlimited practice questions
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Start Practicing
                  </Button>
                </div>
                <div className="bg-white/70 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Talk to Saarthi
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    Get personalized guidance from our AI mentor
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Chat Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final CTA */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl border-0">
            <CardContent className="text-center py-12">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">Ready to Improve?</h2>
                <p className="text-purple-100 text-lg">
                  Join thousands of students who have improved their scores with
                  PW's expert guidance
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Explore All Batches
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    Challenge a Friend
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Test Selection */}
          <div className="text-center pt-8">
            <Link to="/test-selection">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-purple-600"
              >
                ← Take Another Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWResults;
