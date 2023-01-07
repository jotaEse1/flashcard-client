const duration = 0.5, 
    delayVisible = 0.2,
    delayExit = 0.1

export const pageTransitionAnimation = {
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