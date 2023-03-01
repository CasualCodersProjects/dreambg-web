import { useState, useEffect } from 'react';

export function useQueryParameters() {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams(searchParams);
  }, []);

  return params;
}

export function useImageParams() {
  const params = useQueryParameters();

  if (!params) {
    return {
      uuid: null,
      image: null,
    };
  }

  const uuid = params.get('uuid');
  const image = params.get('image');

  return { uuid, image };
}

export function useVerticalParam() {
  const params = useQueryParameters();

  if (!params) {
    return false;
  }

  return params.get('vertical') !== null;
}
