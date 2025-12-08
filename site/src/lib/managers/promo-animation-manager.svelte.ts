export function createAnimationManager() {
  const animations: ((reverse: boolean) => void)[] = [];

  let nextAnimationIndex: number = 0;

  setInterval(() => {
    const animation = animations[nextAnimationIndex];
    if(animation == null) return; 
    animation(false);
    setTimeout(() => {
      animation(true);
      nextAnimationIndex = (nextAnimationIndex + 1) % animations.length;
    }, 4000);
  }, 5 * 1000);

  return {
    registerAnimation: ({animation}: {animation: (reverse: boolean) => void}) => {
      animations.push(animation)
    }
  }

}

export type PromoAnimationManager = ReturnType<typeof createAnimationManager>;