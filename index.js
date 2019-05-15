var FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')

const token = '5bb42ea331ee010001a0b7d7d7459fef860c4c559441cdb1c9882305'
const urlApi = 'https://api.kalapa.vn/user-profile'

const getInfoFromIdCard = () => {
  const readStream = fs.createReadStream('./idcard/userB.jpeg')

  let options = {
    method: 'POST',
    headers: {
      Authorization: token
    }
  }

  options.body = new FormData()
  options.body.append('image', readStream)

  const url = urlApi + '/id_card/post/?verify=true'
  return fetch(url, options).then(response => {
    return response.json().then(responseJson => {
      console.log('\n Id card extr Record')
      console.log(responseJson)
      if (responseJson && responseJson.idCardInfo) {
        getCreditInfoFromId(responseJson.idCardInfo.id)
        getCareerInfoFromId(responseJson.idCardInfo.id)
        getFamilyInfoFromId(responseJson.idCardInfo.id)
        getMedicalInfoFromId(responseJson.idCardInfo.id)
      }
      return responseJson
    })
  })
}

const getCreditInfoFromId = idNumber => {
  let options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  const url = urlApi + '/credit/get/?id=' + idNumber
  return fetch(url, options).then(response => {
    return response.json().then(responseJson => {
      console.log('\n CreditStatus Record')
      console.log(responseJson)
      if (responseJson.mobile != '') {
        getFacebookInfoFromPhoneNumber(responseJson.mobile)
      }
      return responseJson
    })
  })
}

const getCareerInfoFromId = idNumber => {
  let options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  const url = urlApi + '/career/get/?id=' + idNumber
  return fetch(url, options).then(response => {
    return response.json().then(responseJson => {
      console.log('\n Career Info Record')
      console.log(responseJson)
      return responseJson
    })
  })
}

const getFamilyInfoFromId = idNumber => {
  let options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  const url = urlApi + '/family/get/?id=' + idNumber + '&include_mobile=true'
  return fetch(url, options).then(response => {
    return response.json().then(responseJson => {
      console.log('\n FamilyInfo Record')
      console.log(responseJson)
      return responseJson
    })
  })
}

const getMedicalInfoFromId = idNumber => {
  let options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  const url = urlApi + '/medical/get/?id=' + idNumber
  return fetch(url, options).then(response => {
    return response.json().then(responseJson => {
      console.log('\n Medical Insurance Info Record')
      console.log(responseJson)
      return responseJson
    })
  })
}

const getFacebookInfoFromPhoneNumber = phoneNumber => {
  let options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  const url = urlApi + '/facebook/get/?mobile=' + phoneNumber
  return fetch(url, options).then(response => {
    return response.json().then(responseJson => {
      console.log('\n FacebookInfo Record')
      console.log(responseJson)
      return responseJson
    })
  })
}

getInfoFromIdCard()
