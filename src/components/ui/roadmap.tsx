import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  BookOpen,
  Target,
} from "lucide-react";
import { roadmap } from "../../lib/constants";

const RoadmapComponent = () => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [expandedSubjects, setExpandedSubjects] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleWeek = (weekIndex: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekIndex)
        ? prev.filter((i) => i !== weekIndex)
        : [...prev, weekIndex]
    );
  };

  const toggleSubject = (weekIndex: number, subjectIndex: number) => {
    const key = `${weekIndex}-${subjectIndex}`;
    setExpandedSubjects((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      "from-violet-500 to-purple-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-pink-600",
      "from-indigo-500 to-blue-600",
      "from-teal-500 to-green-600",
      "from-orange-500 to-red-600",
      "from-purple-500 to-indigo-600",
      "from-pink-500 to-rose-600",
      "from-cyan-500 to-blue-600",
      "from-lime-500 to-emerald-600",
      "from-fuchsia-500 to-purple-600",
      "from-sky-500 to-indigo-600",
      "from-yellow-500 to-amber-600",
    ];
    return gradients[index % gradients.length];
  };

  const getSubjectColors = (weekIndex: number, subjectIndex: number) => {
    const colors = [
      {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-700",
        accent: "bg-slate-100",
      },
      {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        accent: "bg-blue-100",
      },
      {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        accent: "bg-emerald-100",
      },
      {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        accent: "bg-amber-100",
      },
      {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        accent: "bg-rose-100",
      },
      {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-700",
        accent: "bg-purple-100",
      },
      {
        bg: "bg-teal-50",
        border: "border-teal-200",
        text: "text-teal-700",
        accent: "bg-teal-100",
      },
      {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
        accent: "bg-orange-100",
      },
      {
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        text: "text-indigo-700",
        accent: "bg-indigo-100",
      },
      {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-700",
        accent: "bg-pink-100",
      },
      {
        bg: "bg-cyan-50",
        border: "border-cyan-200",
        text: "text-cyan-700",
        accent: "bg-cyan-100",
      },
      {
        bg: "bg-lime-50",
        border: "border-lime-200",
        text: "text-lime-700",
        accent: "bg-lime-100",
      },
      {
        bg: "bg-fuchsia-50",
        border: "border-fuchsia-200",
        text: "text-fuchsia-700",
        accent: "bg-fuchsia-100",
      },
      {
        bg: "bg-sky-50",
        border: "border-sky-200",
        text: "text-sky-700",
        accent: "bg-sky-100",
      },
      {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        accent: "bg-yellow-100",
      },
    ];
    return colors[(weekIndex * 3 + subjectIndex) % colors.length];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="space-y-6">
        {roadmap.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Week Header */}
            <div
              onClick={() => toggleWeek(weekIndex)}
              className={`bg-gradient-to-r ${getGradientColors(
                weekIndex
              )} text-white p-6 cursor-pointer transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Week {week.duration}
                    </h2>
                    <p className="text-white/80 text-sm">
                      {week.focus.length} subject
                      {week.focus.length > 1 ? "s" : ""} to explore
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm transition-transform duration-300">
                  {expandedWeeks.includes(weekIndex) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Week Content */}
            {expandedWeeks.includes(weekIndex) && (
              <div className="p-6 space-y-4 animate-in slide-in-from-top duration-300">
                {week.focus.map((subject, subjectIndex) => {
                  const subjectName = Object.values(subject)[0];
                  const topics = subject.topics;
                  const key = `${weekIndex}-${subjectIndex}`;
                  const colors = getSubjectColors(weekIndex, subjectIndex);

                  return (
                    <div
                      key={key}
                      className={`${colors.bg} border ${colors.border} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md`}
                    >
                      {/* Subject Header */}
                      <div
                        onClick={() => toggleSubject(weekIndex, subjectIndex)}
                        className={`p-4 cursor-pointer transition-all duration-200 hover:${colors.accent}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`${colors.accent} p-2 rounded-lg`}>
                              <BookOpen className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div>
                              <h3
                                className={`font-semibold ${colors.text} text-lg`}
                              >
                                {subjectName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {topics.length} topic
                                {topics.length > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`${colors.accent} p-1 rounded-full transition-transform duration-300`}
                          >
                            {expandedSubjects[key] ? (
                              <ChevronDown
                                className={`w-4 h-4 ${colors.text}`}
                              />
                            ) : (
                              <ChevronRight
                                className={`w-4 h-4 ${colors.text}`}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Topics List */}
                      {expandedSubjects[key] && (
                        <div className="px-4 pb-4 animate-in slide-in-from-top duration-200">
                          <div className="space-y-3">
                            {topics.map((topic, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="bg-white rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-2 rounded-lg mt-0.5">
                                    <Target className="w-4 h-4 text-gray-600" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 mb-1">
                                      {topic.topic}
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      {topic.Description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapComponent;
