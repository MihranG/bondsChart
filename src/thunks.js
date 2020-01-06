import { priceApiGetterStandard } from "./fakeApi/fakeApiGetter";
import { setData, setLoading } from "./store";

export const fetchData = () => {
  return function(dispatch, getState) {
    const { activePeriod } = getState().time;
    dispatch(setLoading(true));
    return () =>
      priceApiGetterStandard(activePeriod)
        .then(res => {
          dispatch(setData(res));
          dispatch(setLoading(false));
        })
        .catch(e => {
          console.error(e);
        });
  };
};
