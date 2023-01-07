let duration = 0.5, 
    delayVisible = 0.3,
    delayExit = 0.2,
    width = "100%";

if (window.matchMedia("(min-width: 600px)").matches) width = "20rem"

export const sidebarAnimation = {
    hide: { opacity: 0, width: "0%" },
    visible: {
        opacity: 1,
        width,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration,
            delay: delayVisible
        }
    },
    exit: {
        opacity: 0,
        width: "0%",
        transition: {
            type: 'tween',
            ease: 'easeInOut',
            duration,
            delay: delayExit
        }
    }
}
