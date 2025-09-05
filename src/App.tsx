import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Code, 
  Zap, 
  Target, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Play,
  ChevronDown,
  Activity,
  Database,
  TestTube,
  TrendingUp,
  Cpu,
  Network,
  Search
} from 'lucide-react';

function App() {
  const [activePainPoint, setActivePainPoint] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [demoStep, setDemoStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState('petstore');
  const [metricsVisible, setMetricsVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Animated counter hook
  const useAnimatedCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!metricsVisible) return;
      
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [metricsVisible, end, duration]);
    
    return count;
  };

  // Intersection Observer for metrics animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const painPoints = [
    {
      title: "Manually Writing 1000s of Test Cases",
      description: "As APIs grow, the test matrix explodes. Manually creating and maintaining these tests is slow, tedious, and prone to human error."
    },
    {
      title: "Uncertain Test Coverage",
      description: "Are we testing all possible edge cases, parameter combinations, and error states? It's hard to know for sure without intelligent analysis."
    },
    {
      title: "Diagnosing Root Causes is a Time Sink",
      description: "A test fails. Now what? Engineers spend valuable time sifting through logs and responses to find the root cause instead of fixing it."
    },
    {
      title: "Maintaining Tests is a Chore",
      description: "APIs evolve. Every contract change breaks a suite of tests, requiring manual updates and validation."
    }
  ];

  const aiStages = [
    {
      title: "Test Design & Creation",
      icon: <Code className="w-8 h-8" />,
      description: "AI auto-generates comprehensive test cases by analyzing OpenAPI/Swagger specs, learning from production traffic patterns, and intelligently predicting edge cases and failure scenarios."
    },
    {
      title: "Test Data Generation",
      icon: <Database className="w-8 h-8" />,
      description: "AI creates synthetic, realistic, and privacy-compliant test data on demand, covering various scenarios including boundary conditions, null values, and complex object relationships."
    },
    {
      title: "Test Execution & Optimization",
      icon: <TestTube className="w-8 h-8" />,
      description: "AI dynamically prioritizes test execution by running high-risk tests first, identifies and quarantines flaky tests, and optimizes test suite performance through intelligent parallelization."
    },
    {
      title: "Analysis & Insight",
      icon: <Search className="w-8 h-8" />,
      description: "AI performs automated root cause analysis by correlating test failures with recent code changes, log patterns, and historical data, pinpointing the likely source of issues within seconds."
    },
    {
      title: "Predictive Analytics",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "AI predicts quality risks based on historical patterns, code complexity metrics, and change velocity, proactively suggesting what components need the most rigorous testing."
    }
  ];

  const demoSteps = [
    "Analyzing API endpoints and parameters...",
    "Generating positive/negative test cases for /pets/{id}...",
    "Creating edge case tests for invalid data types and null values...",
    "Suggesting performance test parameters based on payload size...",
    "✅ Smart test suite generated with 47 test cases covering 95% of scenarios"
  ];

  const handleGenerateDemo = () => {
    setIsGenerating(true);
    setDemoStep(0);
    
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsGenerating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const counter1 = useAnimatedCounter(70);
  const counter2 = useAnimatedCounter(45);
  const counter3 = useAnimatedCounter(60);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 border border-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-white rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Brain className="w-5 h-5 text-teal-300" />
              <span className="text-sm font-medium">AI-Powered Quality Engineering</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Supercharge Your 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300"> API Testing</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              How Intelligent Automation is Empowering Quality Engineers to Shift Further Left, Test Smarter, and Ship Faster
            </p>
          </div>
          
          <button 
            onClick={() => scrollToSection('challenge')}
            className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Explore the Insights
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Challenge Section */}
      <section id="challenge" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Modern API Testing Bottleneck
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Despite advances in development practices, API testing remains plagued by manual inefficiencies that slow teams down
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  activePainPoint === index ? 'ring-2 ring-blue-600' : ''
                }`}
                onClick={() => setActivePainPoint(activePainPoint === index ? null : index)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{point.title}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        activePainPoint === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                  
                  {activePainPoint === index && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{point.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How AI is Transforming the API Testing Lifecycle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent automation reshapes every stage of testing, from design to deployment
            </p>
          </div>
          
          <div className="space-y-6">
            {aiStages.map((stage, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-gray-50 to-white rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeStage === index 
                    ? 'border-blue-600 shadow-xl scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                onClick={() => setActiveStage(activeStage === index ? null : index)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      activeStage === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {stage.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Stage {index + 1}: {stage.title}
                      </h3>
                      
                      {activeStage === index && (
                        <div className="mt-4">
                          <p className="text-gray-600 leading-relaxed">{stage.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        activeStage === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              See it in Action: From Spec to Smart Test Suite
            </h2>
            <p className="text-xl text-gray-300">
              Watch AI transform an OpenAPI specification into a comprehensive test strategy
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-8">
            {/* Input Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-4">Choose API Specification:</label>
              <select 
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="petstore">Petstore API (Sample)</option>
                <option value="ecommerce">E-commerce API (Sample)</option>
                <option value="social">Social Media API (Sample)</option>
              </select>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># Sample OpenAPI Spec Snippet</div>
                <div className="text-blue-300">paths:</div>
                <div className="text-white ml-4">/pets/&#123;id&#125;:</div>
                <div className="text-white ml-8">get:</div>
                <div className="text-white ml-12">parameters:</div>
                <div className="text-white ml-16">- name: id</div>
                <div className="text-white ml-20">in: path</div>
                <div className="text-white ml-20">required: true</div>
                <div className="text-white ml-20">schema:</div>
                <div className="text-white ml-24">type: integer</div>
              </div>
            </div>
            
            {/* Generate Button */}
            <button
              onClick={handleGenerateDemo}
              disabled={isGenerating}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-gray-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Generate with AI
                </>
              )}
            </button>
            
            {/* Demo Output */}
            {(isGenerating || demoStep > 0) && (
              <div className="mt-8 bg-gray-700 rounded-lg p-6">
                <div className="space-y-3">
                  {demoSteps.slice(0, demoStep + 1).map((step, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 ${
                        index === demoSteps.length - 1 ? 'text-green-400 font-semibold' : 'text-gray-300'
                      }`}
                    >
                      {index === demoSteps.length - 1 ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                      )}
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits & ROI Section */}
      <section ref={metricsRef} className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The Tangible Impact: More Than Just Automation
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real metrics from teams who've embraced AI-augmented testing workflows
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-5xl font-bold text-teal-300 mb-4">
                  {counter1}%
                </div>
                <h3 className="text-xl font-semibold mb-3">Reduction in Test Case Design Time</h3>
                <p className="text-blue-100">AI generates comprehensive test suites in minutes, not weeks</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-5xl font-bold text-teal-300 mb-4">
                  {counter2}%
                </div>
                <h3 className="text-xl font-semibold mb-3">Increased Test Coverage</h3>
                <p className="text-blue-100">Uncovering critical edge cases that manual testing missed</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-5xl font-bold text-teal-300 mb-4">
                  {counter3}%
                </div>
                <h3 className="text-xl font-semibold mb-3">Faster Root Cause Diagnosis</h3>
                <p className="text-blue-100">AI-powered analysis pinpoints issues in seconds, not hours</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Target className="w-5 h-5 text-teal-300" />
              <span className="font-medium">Enable Teams to Focus on High-Value Engineering Tasks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <Brain className="w-6 h-6 text-teal-400" />
              <span className="text-lg font-semibold">Authored by Janani</span>
            </div>
            <p className="text-sm">A Thought Leadership Initiative on the Future of Software Quality</p>
            <p className="text-xs text-gray-500">Built with bolt.new</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;