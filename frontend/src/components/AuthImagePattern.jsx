import { useEffect, useState } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [colors, setColors] = useState(
    Array(9).fill().map(() => generateNiceColor())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prev) =>
        prev.map(() => generateNiceColor())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function generateNiceColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 65 + Math.random() * 20; // 65–85%
    const lightness = 55 + Math.random() * 10;  // 55–65%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {colors.map((color, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: color,
                boxShadow: `0 -2px 10px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.4)`,
              }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
