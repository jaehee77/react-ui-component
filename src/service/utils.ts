export const measureLines = (elem: HTMLTextAreaElement, val: string) => {
  if (!elem || !val) return 0;

  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

  if (!canvasContext) return 0;

  const style = window.getComputedStyle(elem);
  canvasContext.font = `${style.getPropertyValue(
    'font-size'
  )} ${style.getPropertyValue('font-family')}`;

  const measuredLines = val.split('\n').reduce((r, c) => {
    return (
      r +
      Math.max(
        Math.ceil(canvasContext.measureText(c).width / elem!.clientWidth),
        1
      )
    );
  }, 0);

  return measuredLines;
};
