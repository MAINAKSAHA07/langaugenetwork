import React from 'react';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'default'
}) => {
  const baseStyles = 'bg-white rounded-card shadow-card transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-card-hover hover:-translate-y-1' : '';

  const paddingStyles = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
