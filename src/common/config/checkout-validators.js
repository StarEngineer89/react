export default {
  //payment page
  country: {
    check: function (value) {
      return value > 0 || value.length > 0
    },
    message: 'validation.country'
  },
  countryName: {
    check: function () {
      return true
    },
    message: ''
  },
  street: {
    check: function (value) {
      return value.length > 5
    },
    message: 'validation.street'
  },
  house: {
    check: function (value) {
      return value.length > 0
    },
    message: 'validation.house'
  },
  additional: {
    check: function () {
      return true
    },
    message: ''
  },
  additionalInfo: {
    check: function () {
      return true
    },
    message: ''
  },
  postalCode: {
    check: function (value) {
      return !!value.match(/^[0-9a-z \-]{4,12}$/i)
    },
    message: 'validation.postal-code'
  },
  city: {
    check: function (value) {
      return value.length > 2
    },
    message: 'validation.city'
  },

  birthMonth: {
    check: function (value) {
      return value > 0 && value < 13
    },
    message: 'validation.birth-day.other'
  },

  birthDay: {
    check: function (value) {
      return value > 0 && value < 32
    },
    message: 'validation.birth-day.other'
  },

  birthYear: {
    check: function (value) {
      return value > 1920
    },
    message: 'validation.birth-day.other'
  },

  gender: {
    check: function (value) {
      return value.length > 0
    },
    message: 'validation.gender'
  },

  cardNumber: {
    check: function (value) {
      return !!value.match(/^[0-9]{16,20}$/i)
    },
    message: 'validation.card-number'
  },

  cardExpires: {
    check: function (value) {
      return !!value.match(/^[0-9]{2}[\.\-\/][0-9]{2}$/i)
    },
    message: 'validation.card-expires'
  },

  cardCsc: {
    check: function (value) {
      return value.length === 3 || value.length === 4
    },
    message: 'validation.card-csc'
  },
  cardName: {
    check: function (value) {
      return !!value.match(/^[a-z]+( [a-z]+)+$/i)
    },
    message: 'validation.holder-name'
  },

  //personal information page

  firstName: {
    check: function (value) {
      return value.length > 0
    },
    message: 'validation.first-name'
  },

  lastName: {
    check: function (value) {
      return value.length > 0
    },
    message: 'validation.last-name'
  },

  email: {
    check: function (value) {
      return !!value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    },
    message: 'validation.email'
  },

  phoneNumber: {
    check: function (value) {
      return !!value.match(/^[0-9]{6,}$/i)
    },
    message: 'validation.phone'
  },

  phoneCode: {
    check: function (value) {
      return !!value.match(/^\+[0-9]+$/i)
    },
    message: 'validation.phone'
  },

  password: {
    check: function (value) {
      return value.length > 7
    },
    message: 'validation.password'
  },

  //default
  default: {
    check: function (value) {
      return (value || "").length > 0
    },
    message: 'validation.default'
  }
}
