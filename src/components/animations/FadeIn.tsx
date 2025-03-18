
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface FadeInProps extends PropsWithChildren {
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
  x?: number;
  once?: boolean;
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = '',
  y = 0,
  x = 0,
  once = true,
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once }}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
