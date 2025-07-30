import React from 'react';
import { Brain, Database, Code, TrendingUp } from 'lucide-react';

const About = () => {
  const skills = [
    { category: 'Machine Learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost'] },
    { category: 'Programming', items: ['Python', 'R', 'SQL', 'JavaScript', 'C++'] },
    { category: 'Data & Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'Apache Spark', 'MongoDB'] },
    { category: 'Specializations', items: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'Statistics'] }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            About Me
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Passionate ML Engineer with 3+ years of experience building intelligent systems 
            that drive business value through data-driven insights and automated decision making.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800">My Journey</h3>
            <p className="text-slate-600 leading-relaxed">
              Started with a fascination for how machines could learn patterns from data. 
              I've since developed end-to-end ML pipelines, deployed models at scale, and 
              collaborated with cross-functional teams to solve complex business problems.
            </p>
            <p className="text-slate-600 leading-relaxed">
              When I'm not training models or optimizing algorithms, you'll find me exploring 
              the latest research papers, contributing to open-source ML projects, or building 
              fun interactive demos like the game below!
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Brain className="text-blue-600" size={24} />
                </div>
                <h4 className="font-semibold text-slate-800">AI/ML Models</h4>
                <p className="text-sm text-slate-600 mt-2">Deep learning & traditional ML</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Database className="text-green-600" size={24} />
                </div>
                <h4 className="font-semibold text-slate-800">Data Engineering</h4>
                <p className="text-sm text-slate-600 mt-2">ETL pipelines & data architecture</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Code className="text-purple-600" size={24} />
                </div>
                <h4 className="font-semibold text-slate-800">MLOps</h4>
                <p className="text-sm text-slate-600 mt-2">Model deployment & monitoring</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
                <h4 className="font-semibold text-slate-800">Analytics</h4>
                <p className="text-sm text-slate-600 mt-2">Statistical analysis & insights</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="text-white" size={48} />
                </div>
                <p className="text-slate-600">ML Engineer Avatar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-slate-800 mb-4 text-center">{skillGroup.category}</h4>
              <div className="space-y-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-center">
                    <span className="inline-block px-3 py-1 bg-white rounded-full text-sm text-slate-700 font-medium shadow-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;