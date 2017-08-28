import React, { Component, PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Form, Item, Input, Button, CheckBox, Icon } from 'native-base';

import AppString from '../strings';
import { styles, inputError, inputPlaceHolderColor, inputSelectionColor } from '../style';
import Tools from '../Tools';
import Storage from '../asyncStorage';
import { loginUser } from '../actions/familink.actions';

import { HOME_SCENE_NAME } from './HomeScreen';
import { SIGNIN_SCENE_NAME } from './SignInScreen';
import { FORGOTTENPWD_SCENE_NAME } from './ForgottenPwdScreen';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';
const logo = require('../../assets/iconFamilink.jpg');

class LoginScreen extends Component {
  static navigationOptions = {
    drawerLabel: AppString.loginPageName,
    drawerIcon: () => (<Icon name="log-out" style={styles.menuDrawer_itemIcon} />),
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      rememberMeStatus: true,
    };

    this.login = this.login.bind(this);
    this.pressedRemember = this.pressedRemember.bind(this);
    this.goHome = this.goHome.bind(this);
    this.toSignin = this.toSignin.bind(this);
    this.toForgotPassword = this.toForgotPassword.bind(this);
  }

  componentDidMount() {
    Storage.getItem('phone')
      .then((v) => {
        this.setState({
          user: v,
        });
      });
  }

  async login() {
    const loginString = `{
      "phone": "${this.state.user}",
      "password": "${this.state.password}"
    }`;

    this.props.loginAction(loginString)
      .then(() => {
        Storage.removeItem('phone'); // Remove phone from database
        // If remember me is activated :
        if (this.state.rememberMeStatus) {
          Storage.setItem('phone', this.state.user);
        }
        if (this.props.userToken !== null && this.props.userToken !== false) {
          this.goHome();
          return;
        }
        console.log('TOAST : ', this.props.rejectedMessage);
        Tools.toastWarning(this.props.rejectedMessage);
      });
  }

  pressedRemember() {
    this.setState({
      rememberMeStatus: !this.state.rememberMeStatus,
    });
  }

  goHome() {
    const navigation = this.props.navigation;
    navigation.navigate(HOME_SCENE_NAME);
  }

  toSignin() {
    const navigation = this.props.navigation;
    navigation.navigate(SIGNIN_SCENE_NAME);
  }

  toForgotPassword() {
    const navigation = this.props.navigation;
    navigation.navigate(FORGOTTENPWD_SCENE_NAME);
  }

  render() {
    return (
      <View style={styles.login_view}>
        <Image source={logo} style={styles.login_logo} />
        <Form style={styles.form}>
          <Item style={[styles.input, inputError(false)]} rounded>
            <Icon name="ios-call-outline" style={styles.inputIcon} />
            <Input
              maxLength={10}
              keyboardType="numeric"
              onChangeText={text => this.setState({ user: text })}
              value={this.state.user}
              placeholder={AppString.loginUser}
              placeholderTextColor={inputPlaceHolderColor}
              selectionColor={inputSelectionColor}
              style={styles.inputText}
            />
          </Item>
          <Item style={[styles.input, inputError(false)]} rounded>
            <Icon name="ios-lock-outline" style={styles.inputIcon} />
            <Input
              secureTextEntry
              maxLength={4}
              keyboardType="numeric"
              placeholder={AppString.loginPassword}
              onChangeText={text => this.setState({ password: text })}
              placeholderTextColor={inputPlaceHolderColor}
              selectionColor={inputSelectionColor}
              style={styles.inputText}
            />
          </Item>

          <View style={styles.checkBox} >
            <TouchableHighlight
              style={styles.checkBoxTouchable}
              onPress={() => this.pressedRemember()}
            >
              <CheckBox
                checked={this.state.rememberMeStatus}
                onPress={() => this.pressedRemember()}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.checkBoxTouchable}
              onPress={() => this.pressedRemember()}
            >
              <Text
                style={styles.textCheckbox}
              >
                {AppString.loginRememberMe}
              </Text>
            </TouchableHighlight>
          </View>
          <Button
            style={styles.button}
            iconRight
            full
            light
            onPress={this.login}
          >
            <Text style={styles.buttonText}>{AppString.loginOK}</Text>
            <Icon name="ios-arrow-dropright-outline" style={styles.iconButton} />
          </Button>
          <View style={styles.login_viewSignInPwdForgot}>
            <Text
              onPress={this.toSignin}
              style={styles.login_underlineTextLogin}
            >
              {AppString.loginSignup}
            </Text>
            <Text
              onPress={this.toForgotPassword}
              style={styles.login_underlineTextLogin}
            >
              {AppString.loginForgotPassword}
            </Text>
          </View>
        </Form>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  loginAction: PropTypes.func.isRequired,
  userToken: PropTypes.any.isRequired,
  rejectedMessage: PropTypes.any.isRequired,
};

function mapStateToProps(state) {
  return {
    userToken: state.familinkReducer.userToken,
    rejectedMessage: state.familinkReducer.rejectedMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginAction: loginString => dispatch(loginUser(loginString)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
