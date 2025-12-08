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
  }, 2 * 60 * 1000);

  return {
    registerAnimation: ({animation, index}: {animation: (reverse: boolean) => void, index?: number}) => {
      if(index != null){
        animations[index] = animation;
      } else { 
        animations.push(animation)
      }
    }
  }

}

export type PromoAnimationManager = ReturnType<typeof createAnimationManager>;