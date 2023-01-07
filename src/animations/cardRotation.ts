const duration = 0.5, 
    delayVisible = 0.3,
    delayExit = 0.2

export const wordAnimation = {
    hidden: { opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: delayVisible
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            delay: delayExit
        }
    }
}

export const cardRotationVariant = {
    hidden: { opacity: 0, height: '0%'},
    visible: {
        opacity: 1,
        height: '100%',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            when: 'afterChildren',
            staggerChildren: 0.2,
            staggerDirection: -1,
            duration,
            delay: delayVisible
        }
    },
    exit: {
        height: '0%',
        opacity: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            when: 'afterChildren',
            staggerChildren: 0.2,
            staggerDirection: -1,
            duration,
            delay: delayExit
        }
    }
}

export const cardChange = {
    hidden: { opacity: 0, height: '0%'},
    visible: {
        opacity: 1,
        height: '100%',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            when: 'afterChildren',
            staggerChildren: 0.2,
            staggerDirection: -1,
            duration: duration - 0.1,
            delay: delayVisible
        }
    },
    exit: {
        height: '0%',
        opacity: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            when: 'afterChildren',
            staggerChildren: 0.2,
            staggerDirection: -1,
            duration,
            delay: delayExit
        }
    }
}