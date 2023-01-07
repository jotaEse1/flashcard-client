const duration = 0.5, 
    delayVisible = 0.3,
    delayExit = 0.3

export const opacityAnimation = {
    hide: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'tween',
            duration,
            delay: delayVisible
        }
    },
    exit: {
        opacity: 0,
        transition: {
            type: 'tween',
            duration,
            delay: delayExit
        }
    }
}

export const modalAnimation = {
    hide: { opacity: 0, y: '100vh' },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration,
            delay: delayVisible
        }
    },
    exit: {
        opacity: 0,
        y: '-100vh',
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration,
            delay: delayExit
        }
    }
}

