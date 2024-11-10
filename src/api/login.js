import request from '@/utils/request'

// 获取图形验证码api
export const getimg = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码api
export const getmsgcode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: captchaCode,
      captchaKey: captchaKey,
      mobile: mobile
    }
  })
}

// 手机验证码登录api
export const login = (smsCode, mobile) => {
  return request.post('/passport/login', {

    form: {
      isParty: false,
      mobile: mobile,
      partyData: {},
      smsCode: smsCode
    }

  }, {
    headers: {
      platform: 'H5'
    }
  })
}
