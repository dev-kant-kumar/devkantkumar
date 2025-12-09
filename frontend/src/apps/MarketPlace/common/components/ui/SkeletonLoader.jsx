import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'text', count = 1, className = '' }) => {
  const skeletons = Array(count).fill(0);

  const getStyles = () => {
    switch (type) {
      case 'avatar':
        return 'h-10 w-10 rounded-full';
      case 'title':
        return 'h-6 w-3/4 rounded-md';
      case 'text':
        return 'h-4 w-full rounded-md';
      case 'card':
        return 'h-48 w-full rounded-xl';
      case 'button':
        return 'h-10 w-32 rounded-lg';
      default:
        return 'h-4 w-full rounded-md';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${getStyles()}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
