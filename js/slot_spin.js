document.addEventListener('DOMContentLoaded', () => {
    const num_icons = 9, time_per_icon = 50;
    let reelsList = document.querySelectorAll('.triple_middle_outside_gold_box_inner');
    const icon_height = 79;
    const icon_width = parseFloat(getComputedStyle(reelsList[0]).width);
    let animations1=[], animations2=[], animations3=[];

    //icon height 구하기
    

    const roll = (reel, offset = 0) => {
        const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
        const style = getComputedStyle(reel);
        const backgroundPositionY = parseFloat(style["background-position-y"]);
        console.log(backgroundPositionY)

        console.log("icon_height",icon_height)
        // Calculate target background position
        const targetBackgroundPositionY = Math.round((backgroundPositionY + delta * icon_height) / icon_height) * icon_height;


        reel.style.transition = `none`; // Disable transition initially

        // Trigger reflow
        reel.offsetHeight;

        // Enable transition
        reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms linear`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

        // Return a promise to handle animation completion
        return new Promise((resolve, reject) => {
            const animationEndHandler = () => {
                reel.removeEventListener('transitionend', animationEndHandler);
                resolve(delta);
            };
            reel.addEventListener('transitionend', animationEndHandler);
        });
    };

    function rollReel(reel, animations) {
        roll(reel);
        animations.push(setInterval(() => roll(reel), 8 + num_icons * time_per_icon));  // Infinite rolling
    }
    
    function rollAll() {
        rollReel(reelsList[0], animations1);
        rollReel(reelsList[1], animations2);
        rollReel(reelsList[2], animations3);
    }

    rollAll();

    const btns = document.querySelectorAll('.triple_bottom_board_btn');
    btns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === 0) {
                animations1.forEach(animation => clearInterval(animation));
            } else if (index === 1) {
                animations2.forEach(animation => clearInterval(animation));
            } else if (index === 2) {
                animations3.forEach(animation => clearInterval(animation));
            }
        });
    });
 
});
