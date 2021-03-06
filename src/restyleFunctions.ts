import {TextStyle, FlexStyle, ViewStyle} from 'react-native';

import createRestyleFunction from './createRestyleFunction';
import {BaseTheme, ResponsiveValue, RNStyleProperty} from './types';
import {getKeys} from './typeHelpers';

const spaceProperties = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  marginHorizontal: true,
  marginVertical: true,
  marginStart: true,
  marginEnd: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingHorizontal: true,
  paddingVertical: true,
  paddingStart: true,
  paddingEnd: true,
};

const spacePropertiesShorthand = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  ms: 'marginStart',
  me: 'marginEnd',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  ps: 'paddingStart',
  pe: 'paddingEnd',
};

const typographyProperties = {
  fontStyle: true,
  fontWeight: true,
  letterSpacing: true,
  lineHeight: true,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textTransform: true,
};

const layoutProperties = {
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
  overflow: true,
  aspectRatio: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
};

const positionProperties = {
  position: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  start: true,
  end: true,
};

const borderProperties = {
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStyle: true,
  borderTopWidth: true,
  borderStartWidth: true,
  borderEndWidth: true,
  borderWidth: true,
};

const borderRadiusProperties = {
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomStartRadius: true,
  borderBottomEndRadius: true,
  borderTopStartRadius: true,
  borderTopEndRadius: true,
};

const borderColorProperties = {
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderLeftColor: true,
  borderBottomColor: true,
  borderStartColor: true,
  borderEndColor: true,
};

const shadowProperties = {
  shadowOpacity: true,
  shadowOffset: true,
  shadowRadius: true,
  elevation: true,
};

const textShadowProperties = {
  textShadowOffset: true,
  textShadowRadius: true,
};

export const backgroundColor = createRestyleFunction({
  property: 'backgroundColor',
  themeKey: 'colors',
});

export const backgroundColorShorthand = createRestyleFunction({
  property: 'bg',
  styleProperty: 'backgroundColor',
  themeKey: 'colors',
});

export const color = createRestyleFunction({
  property: 'color',
  themeKey: 'colors',
});

export const opacity = createRestyleFunction({
  property: 'opacity',
});

export const visible = createRestyleFunction({
  property: 'visible',
  styleProperty: 'display',
  transform: ({value}) => (value === false ? 'none' : 'flex'),
});

export const space = getKeys(spaceProperties).map(property => {
  return createRestyleFunction({
    property,
    themeKey: 'space',
  });
});

export const spaceShorthand = getKeys(spacePropertiesShorthand).map(
  property => {
    const styleProperty = spacePropertiesShorthand[
      property
    ] as RNStyleProperty;

    return createRestyleFunction({
      property,
      styleProperty,
      themeKey: 'space',
    });
  },
);

export const typography = [
  ...getKeys(typographyProperties).map((property) => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'fontSize',
    themeKey: 'fontSize',
  }),
  createRestyleFunction({
    property: 'fontFamily',
    themeKey: 'fontFamily',
  }),
]

export const layout = getKeys(layoutProperties).map(property => {
  return createRestyleFunction({
    property,
  });
});

export const position = [
  ...getKeys(positionProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'zIndex',
    themeKey: 'zIndices',
  }),
];

export const border = [
  ...getKeys(borderProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  ...getKeys(borderColorProperties).map(property => {
    return createRestyleFunction({
      property,
      themeKey: 'colors',
    });
  }),
  ...getKeys(borderRadiusProperties).map(property => {
    return createRestyleFunction({
      property,
      themeKey: 'borderRadii',
    });
  }),
];

export const shadow = [
  ...getKeys(shadowProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'shadowColor',
    themeKey: 'colors',
  }),
];

export const textShadow = [
  ...getKeys(textShadowProperties).map(property => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: 'textShadowColor',
    themeKey: 'colors',
  }),
];

export const all = [
  color,
  opacity,
  backgroundColor,
  backgroundColorShorthand,
  ...space,
  ...spaceShorthand,
  ...typography,
  ...layout,
  ...position,
  ...border,
  ...shadow,
  ...textShadow,
];

export interface ColorProps<Theme extends BaseTheme> {
  color?: ResponsiveValue<keyof Theme['colors'], Theme>;
}
export interface OpacityProps<Theme extends BaseTheme> {
  opacity?: ResponsiveValue<number, Theme>;
}

export interface VisibleProps<Theme extends BaseTheme> {
  visible?: ResponsiveValue<boolean, Theme>;
}

export interface BackgroundColorProps<Theme extends BaseTheme> {
  backgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
}

export interface BackgroundColorShorthandProps<Theme extends BaseTheme> {
  bg?: ResponsiveValue<keyof Theme['colors'], Theme>;
}

export type SpaceProps<Theme extends BaseTheme> = {
  [Key in keyof typeof spaceProperties]?: ResponsiveValue<
    keyof Theme['space'] | number,
    Theme
  >;
};

export type SpaceShorthandProps<Theme extends BaseTheme> = {
  [Key in keyof typeof spacePropertiesShorthand]?: ResponsiveValue<
    keyof Theme['space'] | number,
    Theme
  >;
};

export type TypographyProps<Theme extends BaseTheme> = {
  [Key in keyof typeof typographyProperties]?: ResponsiveValue<TextStyle[Key], Theme>;
} & {
  fontSize?: ResponsiveValue<keyof Theme['fontSize'] | number, Theme>;
  fontFamily?: ResponsiveValue<keyof Theme['fontFamily'], Theme>;
};

export type LayoutProps<Theme extends BaseTheme> = {
  [Key in keyof typeof layoutProperties]?: ResponsiveValue<
    FlexStyle[Key],
    Theme
  >;
};

export type PositionProps<Theme extends BaseTheme> = {
  [Key in keyof typeof positionProperties]?: ResponsiveValue<
    FlexStyle[Key],
    Theme
  >;
} & {
  zIndex?: ResponsiveValue<
    Theme['zIndices'] extends {} ? keyof Theme['zIndices'] : number,
    Theme
  >;
};

export type BorderProps<Theme extends BaseTheme> = {
  [Key in keyof typeof borderProperties]?: ResponsiveValue<
    ViewStyle[Key],
    Theme
  >;
} &
  {
    [Key in keyof typeof borderColorProperties]?: ResponsiveValue<
      keyof Theme['colors'],
      Theme
    >;
  } &
  {
    [Key in keyof typeof borderRadiusProperties]?: ResponsiveValue<
      Theme['borderRadii'] extends {} ? keyof Theme['borderRadii'] : number,
      Theme
    >;
  };

export type ShadowProps<Theme extends BaseTheme> = {
  [Key in keyof typeof shadowProperties]?: ResponsiveValue<
    ViewStyle[Key],
    Theme
  >;
} & {
  shadowColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};

export type TextShadowProps<Theme extends BaseTheme> = {
  [Key in keyof typeof textShadowProperties]?: ResponsiveValue<
    TextStyle[Key],
    Theme
  >;
} & {
  textShadowColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};

export type AllProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme> &
  OpacityProps<Theme> &
  SpaceProps<Theme> &
  SpaceShorthandProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  TextShadowProps<Theme>;
