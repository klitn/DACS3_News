
import {
  ElementType,
  ReactNode,
} from "react";
import {
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";

export interface WidgetDimensionsProps {
  width: number;
  height: number;
}

export interface IconComponentProps {
  name: string;
  size?: number;
  color?: string;
}
  
export interface WidgetPanelProps extends ViewProps {
  contentText: string;
  Icon: ElementType<any>;
  iconProps: IconComponentProps;
  style?: StyleProp<ViewStyle>;
}

export interface WidgetHeaderProps extends WidgetPanelProps {}

export interface WidgetFooterProps {
  borderTopWidth?: number;
  borderTopColor?: string;
  paddingTop?: number;
  contentText: string;
  Icon?: ElementType<any>;
  iconProps?: IconComponentProps;
  style?: StyleProp<ViewStyle>;
}
  
export interface WidgetProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  // Additional custom style properties
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  padding?: number;
  children: ReactNode;
}

export interface WidgetBodyProps {
  children?: ReactNode;
  contentText?: string;
  subContentText?: string;
  contentSize?: "Normal" | "Large";
}

export interface WidgetBodyProps {
  children?: ReactNode;
  contentText?: string;
  subContentText?: string;
  contentSize?: "Normal" | "Large";
}