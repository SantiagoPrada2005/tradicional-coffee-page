import React from 'react';
import { motion, type Variant } from 'framer-motion';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'blur-in';

interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: AnimationType;
    duration?: number;
    delay?: number;
    staggerChildren?: number;
    className?: string;
    threshold?: number;
    once?: boolean;
}

const animations: Record<AnimationType, { hidden: Variant; visible: Variant }> = {
    'fade-up': {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    'scale-up': {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    'blur-in': {
        hidden: { opacity: 0, filter: 'blur(20px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
    },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fade-up',
    duration = 0.5,
    delay = 0,
    staggerChildren = 0,
    className = '',
    once = true,
}) => {
    const selectedAnimation = animations[animation];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-10%" }}
            transition={{ duration, delay, staggerChildren }}
            variants={selectedAnimation}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
