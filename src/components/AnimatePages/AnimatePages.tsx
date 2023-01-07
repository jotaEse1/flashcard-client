import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitionAnimation } from '../../animations/pageTransition';

const AnimatePages = ({children}: any) => {
    return (
        <motion.div
            variants={pageTransitionAnimation}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            {children}
        </motion.div>
    );
};

export default AnimatePages;