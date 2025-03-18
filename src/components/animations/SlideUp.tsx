
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface SlideUpProps extends PropsWithChildren {
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
  staggerIndex?: number;
}

const SlideUp = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = '',
  distance = 20,
  once = true,
  staggerIndex,
}: SlideUpProps) => {
  const actualDelay = staggerIndex !== undefined ? delay + (staggerIndex * 0.1) : delay;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ 
        duration, 
        delay: actualDelay,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideUp;
