import {useMemo} from 'react';
import {StyleProp} from 'react-native';

import {BaseTheme, RestyleFunctionContainer, RNStyle} from '../types';
import composeRestyleFunctions from '../composeRestyleFunctions';
import {getKeys} from '../typeHelpers';

import useDimensions from './useDimensions';
import useTheme from './useTheme';
import useDeepMemo from './useDeepMemo';
import {AllProps} from '../restyleFunctions';
import {ChangeTypeOfKey, Intersection} from '../types'

const filterRestyleProps = <
  TRestyleProps,
  TProps extends Record<string, unknown> & TRestyleProps
>(
  props: TProps,
  omitList: (keyof TRestyleProps)[],
): Omit<TProps, keyof TRestyleProps> => {
  const omittedProp = omitList.reduce<Record<keyof TRestyleProps, boolean>>(
    (acc, prop) => {
      acc[prop] = true;
      return acc;
    },
    {} as Record<keyof TRestyleProps, boolean>,
  );

  return getKeys(props).reduce(
    (acc, key) => {
      if (!omittedProp[key as keyof TRestyleProps]) {
        acc[key] = props[key];
      }
      return acc;
    },
    {} as TProps,
  );
};

const useRestyle = <
  Theme extends BaseTheme,
  TRestyleProps extends Record<string, any>,
  TProps extends TRestyleProps,
  T = undefined
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TRestyleProps, Theme>
    | RestyleFunctionContainer<TRestyleProps, Theme>[])[],
  props: TProps & { style?: T },
) => {
  const theme = useTheme<Theme>();

  const dimensions = useDimensions();

  const composedRestyleFunction = useMemo(
    () => composeRestyleFunctions(restyleFunctions),
    [restyleFunctions],
  );

  const style = composedRestyleFunction.buildStyle(props, {theme, dimensions});
  const cleanProps = filterRestyleProps(
    props,
    composedRestyleFunction.properties,
  );
  return useDeepMemo(
    () =>
      (({
        ...cleanProps,
        style: props.style ? [style, props.style].filter(Boolean) : style,
      } as any) as Omit<typeof cleanProps, 'style'> & {
        style: T extends undefined ? ChangeTypeOfKey<Intersection<AllProps<Theme>, TProps>, RNStyle> : StyleProp<RNStyle>;
      }),
    [cleanProps, style, props.style],
  );;
};

export default useRestyle;
