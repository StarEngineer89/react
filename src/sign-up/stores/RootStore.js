import alt from '../alt'
import SignUpActions from '../actions/SignUpActions'
import RootActions from '../actions/RootActions'

class RootStore {
  constructor() {
    this.state = {
      isMobile: false,
      countries: [],
      link: '',
      error: ''
    }

    this.bindListeners({
      //handleError: [SignUpActions.SIGNED_IN_ERROR, RootActions.HIDE_ERROR],
      handleMobile: RootActions.UPDATE_MOBILE,
      handlePopup: [RootActions.HIDE_POPUP, RootActions.SHOW_POPUP],
      handleCountries: SignUpActions.COUNTRIES_RESPONSE
    })
  }

  handleCountries(data){
    this.setState(data)
  }

  handleError(error){
    this.setState({ error })
  }

  handleMobile(value){
    this.setState({
      isMobile: value
    })
  }

  handlePopup(link){
    this.setState({ link })
  }


}

export default alt.createStore(RootStore, 'RootStore')
