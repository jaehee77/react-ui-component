import { pickRandom } from '@/service/utils';
import data from '../data';

export type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export type FetchState<T> = {
  data: T[][];
  state: 'loading' | 'fetched' | 'idle' | 'error';
};

const generatePageData = (page: number) => {
  return pickRandom({ data, length: 20 });
  // 0~49 사이의 임의의 숫자 20개를 생성해서 뽑기
};

const useInfiniteFetcher = () => {
  const pageData = generatePageData(1);
  return {
    fetchNextPage: () => {},
    state: 'fetched', // loading, fetched, idle
    data: [pageData],
  };
};

export default useInfiniteFetcher;
