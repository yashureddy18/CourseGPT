import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Layout, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Create Engaging Courses with AI Assistance
              </h1>
              <p className="text-lg text-blue-100">
                CourseGPT helps educators and content creators build better educational content with AI-powered tools and intuitive organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-blue-700"
                  >
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="CourseGPT platform preview" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Transform Your Course Creation Process</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our intuitive platform combines AI assistance with powerful organization tools to help you create exceptional educational content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:translate-y-[-5px]">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-5">
                <Sparkles className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">AI-Powered Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate high-quality educational content tailored to your course objectives with our advanced AI assistant.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:translate-y-[-5px]">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full w-fit mb-5">
                <Layout className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Structured Templates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start with professionally designed course templates or create your own custom structure to suit your teaching style.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:translate-y-[-5px]">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-5">
                <BookOpen className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Intuitive Organization</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily organize your course content with our drag-and-drop interface and modular content blocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How CourseGPT Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Create, organize, and enhance your courses in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 relative z-10">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Select a Template</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from a variety of course templates or start from scratch to match your unique teaching approach.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 relative z-10">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Add Content with AI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Leverage our AI assistant to generate, enhance, or refine your course materials quickly and efficiently.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 relative z-10">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Publish & Share</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Export your course to various platforms or share directly with students through our integrated tools.
              </p>
            </div>

            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/4 left-1/6 right-1/6 h-0.5 bg-blue-200 dark:bg-blue-800/50"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loved by Educators</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See what our users have to say about their experience with CourseGPT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">University Professor</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "CourseGPT has revolutionized my course development process. I can now create engaging content in a fraction of the time it used to take me. The AI suggestions are incredibly helpful."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Mark Thompson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Mark Thompson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Online Course Creator</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As someone who creates multiple courses per month, CourseGPT has been a game-changer. The templates and AI tools help me maintain quality while scaling my content production."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Emily Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Emily Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Corporate Trainer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The structured approach of CourseGPT helps me create consistently excellent training materials. My clients are impressed with the professional quality of the courses I deliver."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Course Creation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educators using CourseGPT to create exceptional learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Start Creating Now
              </Button>
            </Link>
            <Link to="/templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-blue-700"
              >
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CourseGPT</h3>
              <p className="text-gray-400">
                AI-powered course creation platform for educators and content creators.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2025 CourseGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;