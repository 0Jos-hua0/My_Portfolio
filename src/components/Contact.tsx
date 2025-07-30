import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Interested in collaborating on ML projects or discussing opportunities? 
            I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                Get In Touch
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Whether you have a machine learning project in mind, want to discuss 
                the latest in AI research, or explore collaboration opportunities, 
                I'm always excited to connect with fellow data enthusiasts.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Email</p>
                  <p className="text-slate-600">your.email@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Phone</p>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Location</p>
                  <p className="text-slate-600">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-semibold text-slate-800 mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:transform hover:scale-105"
                >
                  <Github className="text-slate-700" size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:transform hover:scale-105"
                >
                  <Linkedin className="text-slate-700" size={20} />
                </a>
                <a 
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:transform hover:scale-105"
                >
                  <Twitter className="text-slate-700" size={20} />
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:transform hover:scale-105"
                >
                  <Mail className="text-slate-700" size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="ML Collaboration Opportunity"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;