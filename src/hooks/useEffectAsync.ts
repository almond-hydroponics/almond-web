import { DependencyList, useEffect } from 'react';

const useEffectAsync = (effect: any, inputs: DependencyList | undefined) => {
	useEffect(() => {
		effect();
	}, inputs); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useEffectAsync;
