import alt from '../alt'
import SignUpActions from '../actions/SignUpActions'

class SignUpStore {
  constructor() {
    this.state = {
      isSignIn: false,
      showForgot: false,
      forgotSuccess: false,
      signIn: {
        email: '',
        password: ''
      },
      forgot: {
        email: ''
      },
      signUp: {
        firstName: '',
        lastName: '',
        email: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        password: ''
      },
      location: {},
      locationText: '',
      locationVerified: false,
      phone: {
        phoneNumber: '',
        phoneCode: '',
        phoneSms: false,
        phoneVerified: false
      },
      subscription: false,
      err: '',
      buttonClicked: false
    }

    this.bindListeners({
      updateActiveBlock: SignUpActions.SHOW_SIGN_UP,
      handleUpdateFormValue: SignUpActions.UPDATE_FORM_VALUE,
      handleLocationChange: SignUpActions.LOCATION_CHANGE,
      nextButtonClicked: [SignUpActions.SIGN_IN, SignUpActions.CREATE_ACCOUNT, SignUpActions.FORGOT],
      onNextButtonError: SignUpActions.ON_NEXT_ERROR,
      handleForgotUpdate: SignUpActions.UPDATE_FORGOT,
      handleForgotSuccess: SignUpActions.ON_FORGOT,
      handleSubscription: SignUpActions.UPDATE_SUBSCRIPTION
    })
  }

  handleSubscription(data){
    this.setState(data)
  }

  handleForgotSuccess(data){
    this.setState(data)
  }

  handleForgotUpdate(data){
    this.setState(data)
  }

  nextButtonClicked() {
    this.setState({
      buttonClicked: true,
      err: ''
    })
  }

  onNextButtonError(err){
    this.setState({
      buttonClicked: false,
      err
    })
  }

  updateActiveBlock(show) {
    this.setState({
      isSignIn: show,
      err: ''
    })
  }

  handleUpdateFormValue({event, name}) {
    let isManual = !!event.formName
    let formName = isManual ? event.formName : event.target.form.name
    let model = Object.assign({}, this.state[formName])
    model[name] = isManual ? event.value: event.target.value

    let obj = {}
    obj[formName] = model

    this.setState(obj)
  }

  handleLocationChange(location) {
    this.setState(location)
  }
}

export default alt.createStore(SignUpStore, 'SignUpStore')
