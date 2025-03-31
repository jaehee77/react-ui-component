import { pickRandom } from '@/service/utils';
import data from '../data';

export type FetchState<T> = {
  data: T[][];
  state: 'loading' | 'fetchec' | 'idle' | 'error';
};

const generatePageData = async (page: number) => {
  return pickRandom({ data, length: 20 });
  // 0~49 사이의 임의의 숫자 20개를 생성해서 뽑기
};

const useInfiniteFetcher = () => {
  return {
    fetchNextPage,
    state, // loading, fetched, idle
    data,
  };
};

export default useInfiniteFetcher;
