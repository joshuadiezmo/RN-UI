import TextInputLib from './TextInput';
import ContainerLib from './Container';
import FormLabelLib from './FormLabel';
import ButtonLib from './Button';
import TextLib from './Text';
import IconLib from './Icon';
import TouchableLib from './Touchable';
import AvatarLib from './Avatar';
import ActivityIndicatorLib from './ActivityIndicator';
import {ThemeContext} from './ThemeContext';
const variables = ThemeContext._currentValue.variables;

export const TextInput = TextInputLib;
export const Container = ContainerLib;
export const FormLabel = FormLabelLib;
export const Button = ButtonLib;
export const Text = TextLib;
export const Icon = IconLib;
export const Touchable = TouchableLib;
export const Avatar = AvatarLib;
export const ActivityIndicator = ActivityIndicatorLib;
export const theme = variables;