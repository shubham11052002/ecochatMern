import React from "react";

const RightSideSignUp = () => {
  return (
    <div className="hidden md:flex relative max-h-screen max-w-screen overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Moving Gradient Orbs */}
      <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float-1" 
           style={{ top: '10%', left: '20%' }}></div>
      <div className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/30 to-red-500/30 rounded-full blur-3xl animate-float-2" 
           style={{ top: '60%', right: '10%' }}></div>
      <div className="absolute w-72 h-72 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-float-3" 
           style={{ bottom: '20%', left: '10%' }}></div>
      <div className="absolute w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-float-4" 
           style={{ top: '30%', right: '30%' }}></div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-flow"
            style={{
              width: '200%',
              left: '-50%',
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
      </div>

      {[...Array(30)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10 animate-mesh-1"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-pink-600/10 via-transparent to-cyan-600/10 animate-mesh-2"></div>
      
      <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-40 right-32 w-24 h-24 border border-purple-400/20 animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-bounce-slow"></div>
    </div>

    <div className="relative z-10 flex flex-col justify-center items-center text-center px-8 backdrop-blur-sm bg-black/20">
      <div className="max-w-lg">
        <h2 className="text-white text-4xl font-bold mb-6 animate-fade-in-up">
          Join our Ecochat community
        </h2>
        <p className="text-gray-200 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Share ideas, stay connected, and explore new conversations in a beautiful, dynamic environment.
        </p>
        
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center space-x-3 text-gray-200">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Real-time messaging</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-200">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-200">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Global Community</span>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes float-1 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(30px, -30px) rotate(120deg); }
        66% { transform: translate(-20px, 20px) rotate(240deg); }
      }
      @keyframes float-2 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-40px, -20px) rotate(180deg); }
      }
      @keyframes float-3 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(20px, -40px) rotate(90deg); }
        50% { transform: translate(-30px, -20px) rotate(180deg); }
        75% { transform: translate(10px, 30px) rotate(270deg); }
      }
      @keyframes float-4 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-20px, 40px) scale(1.1); }
      }
      @keyframes flow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }
      @keyframes mesh-1 {
        0%, 100% { transform: translateX(-50%) rotate(0deg); }
        50% { transform: translateX(50%) rotate(180deg); }
      }
      @keyframes mesh-2 {
        0%, 100% { transform: translateY(-50%) rotate(0deg); }
        50% { transform: translateY(50%) rotate(-180deg); }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
      .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
      .animate-float-3 { animation: float-3 12s ease-in-out infinite; }
      .animate-float-4 { animation: float-4 6s ease-in-out infinite; }
      .animate-flow { animation: flow linear infinite; }
      .animate-twinkle { animation: twinkle ease-in-out infinite; }
      .animate-mesh-1 { animation: mesh-1 15s linear infinite; }
      .animate-mesh-2 { animation: mesh-2 20s linear infinite; }
      .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
    `}</style>
  </div>
  )
};

export default RightSideSignUp;
