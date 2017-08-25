import { StyleSheet, Platform } from 'react-native';

export const secondaryColor = '#256F5B';
export const secondaryColor2 = '#89A236';
export const complementaryColor = '#519331';

const borderColorInput = '#000000';
const sizeIcon = 135;
const defaultPadding = 20;
const defaultFontSizeButton = 20;
const defaultFontSize = 20;
const defaultFontSizeButtonIcon = defaultFontSizeButton + 10;
const defaultHeightButton = 36;
const defaultBorderRadius = 20;

const primaryColor = '#0097A7'; // Blue
export const darkPrimaryColor = '#00BCD4'; // Dark Blue
export const lightPrimaryColor = '#B2EBF2'; // Light Blue
const accentColor = '#FFC107'; // Yellow
const textColor = '#212121'; // Black
const errorColor = '#F90606'; // Red

const textSecondaryColor = '#757575'; // Gray
// dark-primary-color    { background: #0097A7 ; }
// .default-primary-color { background: #00BCD4 ; }
// .light-primary-color   { background: #B2EBF2 ; }
// .text-primary-color    { color: #FFFFFF ; }
// .accent-color          { background: #FFC107 ; }
// .primary-text-color    { color: #212121 ; }
// .secondary-text-color  { color: #757575 ; }
// .divider-color         { border-color: #BDBDBD ; }


export const buttonColor = primaryColor;

export function inputError(error) {
  return {
    borderColor: error ? errorColor : borderColorInput,
    borderWidth: error ? 2 : 1,
  };
}
export const styles = StyleSheet.create({

  // form
  form: {
    padding: 40,
  },
  // loginView
  login_view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  login_logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
  },

  login_viewSignInPwdForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  login_underlineTextLogin: {
    color: primaryColor,
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  // -------------------------------------  Universel  ---------------------------------------------
  // --------------  CheckBox
  checkBox: {
    marginTop: 15,
    flexDirection: 'row',
  },
  textCheckbox: {
    paddingLeft: 20,
    color: textSecondaryColor,
  },
  // --------------  Button
  button: {
    borderRadius: defaultBorderRadius,
    backgroundColor: accentColor,
    marginTop: 30,
  },
  iconButton: {
    fontSize: defaultFontSizeButtonIcon,
  },
  buttonText: {
    color: textColor,
    fontSize: defaultFontSizeButton,
  },

  // --------------  Input
  input: {
    marginTop: 10,
    backgroundColor: primaryColor,
    paddingLeft: 20,
    borderRadius: defaultBorderRadius,
    borderColor: borderColorInput,
    borderWidth: 1,
  },
  // -------------------------------------  HEADER BAR  -------------------------------------------
  headerBarHeader: {
    backgroundColor: darkPrimaryColor,
  },
  headerBarIcon: {
    fontSize: 35,
    color: '#FFFFFF',
  },
  headerBarTitle: {
    fontSize: Platform.OS === 'ios' ? 25 : 30,
    color: '#FFFFFF',
  },
  // -------------------------------------  MENU  -------------------------------------------
  menuDrawer_itemLabel: {
    color: darkPrimaryColor,
    fontSize: 18,
  },
  menuDrawer_itemIcon: {
    color: darkPrimaryColor,
  },

  text: {
    color: textColor,
    fontSize: 20,
  },
  icon: {
    fontSize: sizeIcon,
    color: secondaryColor,
    textAlign: 'center',
  },
  iconR: {
    fontSize: sizeIcon,
    color: primaryColor,
    textAlign: 'center',
  },
  grid: {
  },
  MenuText: {
    fontSize: 24,
    textAlign: 'center',
    color: secondaryColor,
  },
  MenuTextR: {
    fontSize: 24,
    textAlign: 'center',
    color: primaryColor,
  },
  defaultButtonAtBottom: {
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: defaultBorderRadius,
  },
  textTouchableHighlight: {
    textAlign: 'center',
    fontSize: defaultFontSize,
    color: complementaryColor,
  },
  flex1: {
    flex: 1,
  },
  // ContactScreen
  gravatar: {
    width: 60,
    height: 60,
    marginTop: 15,
  },
});
