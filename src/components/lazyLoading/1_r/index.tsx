import { useEffect, useRef, useState } from 'react';
import cx from '../cx';
import data from '../data';
import useIntersectionObserver from '@/hook/useIntersectionObserber';

const ioOptions: IntersectionObserverInit = {
  threshold: 0,
};

const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  //
  const imgRef = useRef<HTMLImageElement>(null);
  const { entries, observerRef } = useIntersectionObserver(imgRef, ioOptions);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if ('loading' in HTMLImageElement.prototype) {
      imgRef.current!.setAttribute('src', src);
      observerRef.current?.disconnect();
      return;
    }

    if (!entries?.length || !imgRef.current) return;

    const isVisible = entries[0].isIntersecting;

    if (isVisible) {
      // imgRef.current!.src = src;

      setLoaded(true);

      // console.log(src, isVisible);

      imgRef.current.setAttribute('src', src);
      observerRef.current?.disconnect();
      // or observerRef.current?.unobserve(imgRef.current)
    }

    return () => {};
  }, [src, entries]);

  return (
    <img
      ref={imgRef}
      className={cx({ lazy: !loaded })}
      width={width}
      height={height}
      alt=""
      loading="lazy"
    />
  );
};

const builtInLazySupported = 'loading' in HTMLImageElement.prototype;

const LazyLoad1 = () => {
  // 아래 방법(Component)은 지원여부에 따라 선택적 사용
  const Component = builtInLazySupported
    ? (props: any) => <img {...props} />
    : LazyImage;

  return (
    <>
      <h2>
        지연로딩 <sub>#1</sub>
      </h2>
      {data.map((url, index) => (
        <LazyImage src={url} key={index} width={600} height={320} />
      ))}
    </>
  );
};

export default LazyLoad1;
