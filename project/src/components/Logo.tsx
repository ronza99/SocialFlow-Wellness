import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'transparent' | 'minimal';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true,
  variant = 'transparent'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  // Usa sempre la versione trasparente per integrazione perfetta
  const logoSrc = "/socialflow_logo_gear_leaf_transparent.png";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src={logoSrc}
          alt="SocialFlow Logo" 
          className={`${sizeClasses[size]} object-contain filter drop-shadow-sm`}
          style={{
            // Assicura che il logo si integri perfettamente con lo sfondo
            mixBlendMode: variant === 'minimal' ? 'multiply' : 'normal'
          }}
        />
      </div>
      {showText && (
        <div className={`ml-3 ${textSizeClasses[size]} font-sans font-bold`}>
          <span className="text-high-contrast">Social</span>
          <span className="gradient-text">Flow</span>
          <div className="text-xs text-readable font-normal tracking-wider uppercase mt-1">
            Marketing Automation
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;