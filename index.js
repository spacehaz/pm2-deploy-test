const sigUtil = require('@metamask/eth-sig-util')
const ethUtil = require('ethereumjs-util')

  const encrypted_dashboard_key = ethUtil.bufferToHex(
    Buffer.from(
      JSON.stringify(
        sigUtil.encrypt({
          publicKey: '',
          data: '',
          version: 'x25519-xsalsa20-poly1305',
        })
      ),
      'utf8'
    )
  )
