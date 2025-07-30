import React from 'react';
import { ExternalLink, Github, Brain, BarChart3, Eye, MessageSquare, TrendingUp, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Predictive Analytics Platform',
      description: 'End-to-end ML pipeline for customer churn prediction using ensemble methods. Achieved 94% accuracy with real-time inference capabilities.',
      icon: <BarChart3 className="text-blue-600" size={24} />,
      technologies: ['Python', 'TensorFlow', 'AWS SageMaker', 'Docker', 'FastAPI'],
      githubUrl: 'https://github.com/yourusername/predictive-analytics',
      liveUrl: '#',
      metrics: '94% Accuracy'
    },
    {
      title: 'Computer Vision Object Detection',
      description: 'Real-time object detection system using YOLO v8. Deployed on edge devices for manufacturing quality control with sub-second inference.',
      icon: <Eye className="text-green-600" size={24} />,
      technologies: ['PyTorch', 'OpenCV', 'YOLO', 'TensorRT', 'Raspberry Pi'],
      githubUrl: 'https://github.com/yourusername/cv-detection',
      liveUrl: '#',
      metrics: '<100ms Inference'
    },
    {
      title: 'NLP Sentiment Analysis API',
      description: 'Scalable sentiment analysis service processing 10K+ requests/day. Fine-tuned BERT model with custom domain adaptation.',
      icon: <MessageSquare className="text-purple-600" size={24} />,
      technologies: ['Transformers', 'BERT', 'Flask', 'Redis', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/sentiment-api',
      liveUrl: '#',
      metrics: '10K+ Daily Requests'
    },
    {
      title: 'Recommendation Engine',
      description: 'Hybrid recommendation system combining collaborative filtering and content-based approaches. Improved user engagement by 35%.',
      icon: <Brain className="text-orange-600" size={24} />,
      technologies: ['Scikit-learn', 'Surprise', 'Apache Spark', 'Kafka', 'MLflow'],
      githubUrl: 'https://github.com/yourusername/recommendation-engine',
      liveUrl: '#',
      metrics: '+35% Engagement'
    },
    {
      title: 'Time Series Forecasting',
      description: 'Multi-variate time series forecasting for supply chain optimization. LSTM-based model with attention mechanism.',
      icon: <TrendingUp className="text-red-600" size={24} />,
      technologies: ['TensorFlow', 'LSTM', 'Prophet', 'Pandas', 'Plotly'],
      githubUrl: 'https://github.com/yourusername/time-series-forecast',
      liveUrl: '#',
      metrics: '15% Cost Reduction'
    },
    {
      title: 'MLOps Pipeline',
      description: 'Complete MLOps infrastructure with automated training, testing, and deployment. CI/CD for machine learning models.',
      icon: <Code className="text-indigo-600" size={24} />,
      technologies: ['Kubeflow', 'Jenkins', 'Kubernetes', 'Prometheus', 'Grafana'],
      githubUrl: 'https://github.com/yourusername/mlops-pipeline',
      liveUrl: '#',
      metrics: '80% Faster Deployment'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            ML Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of machine learning projects demonstrating expertise across 
            different domains and technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="flex space-x-2">
                    <a 
                      href={project.githubUrl}
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} className="text-slate-700" />
                    </a>
                    <a 
                      href={project.liveUrl}
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                      <ExternalLink size={16} className="text-slate-700" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    {project.metrics}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;