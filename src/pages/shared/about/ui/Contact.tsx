import React from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Адрес",
      info: "г. Бишкек, ул. Анкара 1/17, УК МУИТ"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Telegram",
      info: "@maksat_kanybekov"
    },
    // {
    //   icon: <Mail className="w-5 h-5" />,
    //   title: "Email",
    //   info: "innovation@muit.kg"
    // },
    // {
    //   icon: <Globe className="w-5 h-5" />,
    //   title: "Веб-сайт",
    //   info: "www.muit.kg"
    // }
  ];

  // const socialLinks = [
  //   { icon: <Github className="w-5 h-5" />, url: "#", label: "GitHub" },
  //   { icon: <Linkedin className="w-5 h-5" />, url: "#", label: "LinkedIn" },
  //   { icon: <Twitter className="w-5 h-5" />, url: "#", label: "Twitter" },
  //   { icon: <Globe className="w-5 h-5" />, url: "#", label: "Website" }
  // ];

  return (
    <footer className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className=" ">
          <div className='flex gap-10 items-center'>
            <div className="mb-8 w-[500px]">
              <h3 className="text-3xl font-bold text-white mb-4">
                Свяжитесь с нами
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Готовы обсудить новые проекты, партнерство или просто узнать больше 
                о наших разработках? Мы всегда открыты для диалога.
              </p>
            </div>
            
            <div className="flex flex-col gap-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-blue-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-slate-300">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h4 className="text-xl font-semibold text-white mb-6">Отправить сообщение</h4>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Тема сообщения"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              
              <div>
                <textarea
                  rows={4}
                  placeholder="Ваше сообщение"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Отправить сообщение</span>
              </button>
            </form>
          </div> */}
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div>
                <h4 className="text-white font-semibold mb-1">Центр инноваций   УК МУИТ</h4>
                <p className="text-slate-300 text-sm">Powered by OurEra Soft</p>
              </div>
            </div>
            
            {/* <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div> */}
          </div>
          
          <div className="mt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Центр инноваций и программных разработок УК МУИТ. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;