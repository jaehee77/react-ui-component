export const measureLines = (elem: HTMLElement, val: string) => {
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

export const randomize = ({
  min = 0,
  max = 0,
  step = 1,
}: {
  min: number;
  max: number;
  step: number;
}) => {
  if (max < min || max - min < step) throw Error('wrong aurguments');

  const num = Math.random() * (max - min) + min; // min <= num <= max

  return Math.round(num / step) * step;
};

// randomize({min:1, max: 50, step: 1});

Array.from({ length: 20 }, () => randomize({ min: 1, max: 50, step: 1 }));

export const pickRandom = <T>({
  data = [],
  length = 1,
}: {
  data: T[];
  length: number;
}) => {
  const shuffled = [...data].sort(() => (Math.random() - 0.5 >= 0 ? 1 : -1));
  return shuffled.slice(0, length);
};

Array.from({ length: 20 }, (_, i) => i + 1).sort(() =>
  Math.random() - 0.5 >= 0 ? 1 : -1
);
