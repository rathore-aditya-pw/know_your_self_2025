import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Target,
  TrendingUp,
  Users,
  Clock,
  BookOpen,
  Trophy,
  Star,
  ArrowRight,
  Zap,
  BarChart3,
} from "lucide-react";

import { Button } from "../../components/ui/Button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-50 to-purple-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-[#5a4bda]" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
              SkillTest Pro
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600  bg-clip-text text-transparent">
            Discover Your True Potential
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take our comprehensive skill assessment to understand where you
            stand and get a personalized roadmap to achieve your career goals.
          </p>
          <Link to="/test-selection">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] hover:from-[#5a4bda] hover:to-[#3a2bad] text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* What is this test? */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            What is SkillTest Pro?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            SkillTest Pro is an adaptive assessment platform that evaluates your
            skills across multiple domains. Our scientifically designed tests
            adapt to your responses, providing accurate insights into your
            current abilities.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 text-[#5a4bda] mx-auto mb-4" />
                <CardTitle className="text-lg">
                  Comprehensive Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get detailed insights into your strengths and areas for
                  improvement across various skill domains.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-[#5a4bda] mx-auto mb-4" />
                <CardTitle className="text-lg">Personalized Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Receive a customized learning path with specific
                  recommendations based on your results.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <Trophy className="h-12 w-12 text-[#5a4bda] mx-auto mb-4" />
                <CardTitle className="text-lg">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Monitor your improvement over time with regular assessments
                  and progress tracking.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why take this test? - USPs */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm rounded-3xl my-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose SkillTest Pro?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Adaptive Testing</h4>
              <p className="text-gray-600 text-sm">
                Questions adjust to your skill level for accurate assessment
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">
                Quick & Efficient
              </h4>
              <p className="text-gray-600 text-sm">
                Complete assessment in just 15-20 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">15+ Domains</h4>
              <p className="text-gray-600 text-sm">
                Cover Programming, Design, Marketing, and more
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">
                Industry Validated
              </h4>
              <p className="text-gray-600 text-sm">
                Questions curated by industry experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Choose Your Goal
              </h4>
              <p className="text-gray-600">
                Select from 15+ skill domains including Programming, Design,
                Marketing, Data Science, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Take Assessment
              </h4>
              <p className="text-gray-600">
                Answer 20-25 carefully crafted questions that adapt to your
                skill level in real-time.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Get Your Roadmap
              </h4>
              <p className="text-gray-600">
                Receive detailed results with personalized learning
                recommendations and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm rounded-3xl my-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Chen</h4>
                    <p className="text-sm text-gray-600">Software Developer</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "SkillTest Pro helped me identify my weak areas in React. The
                  personalized roadmap guided me to the right resources, and I
                  landed my dream job!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Rodriguez</h4>
                    <p className="text-sm text-gray-600">UX Designer</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "The design assessment was spot-on! It showed me exactly where
                  I needed to improve my prototyping skills. The recommendations
                  were incredibly valuable."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold">Aisha Patel</h4>
                    <p className="text-sm text-gray-600">Digital Marketer</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "I discovered gaps in my data analytics knowledge through the
                  marketing assessment. The learning path helped me upskill and
                  get promoted!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Progress Touchpoints */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Track Your Growth Journey
          </h3>
          <p className="text-lg text-gray-600 mb-12">
            See exactly where you stand and monitor your progress over time
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg shadow">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">
                    Initial Assessment
                  </h4>
                  <p className="text-gray-600">
                    Baseline skill evaluation across your chosen domain
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg shadow">
                <TrendingUp className="h-8 w-8 text-[#5a4bda]" />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">Weekly Progress</h4>
                  <p className="text-gray-600">
                    Track improvement with mini-assessments
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg shadow">
                <Trophy className="h-8 w-8 text-[#6a5ff0] to-[#4a3cbf]" />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">
                    Milestone Achievements
                  </h4>
                  <p className="text-gray-600">
                    Celebrate your learning milestones and competency gains
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-6">
                Your Progress Dashboard
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Overall Skill Level</span>
                  <span className="font-bold text-[#5a4bda]">Intermediate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] h-3 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#5a4bda]">78%</div>
                    <div className="text-sm text-gray-600">
                      Technical Skills
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6a5ff0]">92%</div>
                    <div className="text-sm text-gray-600">Problem Solving</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">54%</div>
                    <div className="text-sm text-gray-600">Advanced Topics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#6a5ff0] to-[#4a3cbf] rounded-3xl p-6 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Discover Your Potential?
          </h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of learners who have transformed their careers with
            SkillTest Pro
          </p>
          <Link to="/test-selection">
            <Button
              size="lg"
              className="bg-white text-[#5a4bda] hover:bg-gray-100 px-4 md:px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Assessment
            </Button>
          </Link>
          <div className="flex justify-center items-center space-x-8 mt-8 text-sm opacity-75">
            <span>✓ 100% Free</span>
            <span>✓ No Credit Card Required</span>
            <span>✓ Instant Results</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
