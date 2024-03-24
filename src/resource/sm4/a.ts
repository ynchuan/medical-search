import * as s from './s'
import { Buffer as e } from 'node:buffer'
import { sm2, sm4 } from 'sm-crypto'

export const keys = {
  appCode: "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
  version: "1.0.0",
  appSecret: "NMVFVILMKT13GEMD3BKPKCTBOQBPZR2P",
  publicKey: "BEKaw3Qtc31LG/hTPHFPlriKuAn/nzTWl8LiRxLw4iQiSUIyuglptFxNkdCiNXcXvkqTH79Rh/A2sEFU6hjeK3k=",
  privateKey: "AJxKNdmspMaPGj+onJNoQ0cgWk2E3CYFWKBJhpcJrAtC",
  publicKeyType: "base64",
  privateKeyType: "base64"
}
export const signData = function (input) {
  var n = m(input)
    , i = p(n)
  // @ts-ignore
  i.data = p(i.data)
  var d = e.from(keys.privateKey, "base64").toString("hex")
  var r = v(i)
    , a = sm2.doSignature(r, d, {
      hash: !0
    })
  return e.from(a, "hex").toString("base64")
}

export const encData = data => {
  for (var t = data && JSON.stringify(data), n = "", i = 0; i < t.length; i++) {
    var r = t.charAt(i)
      , o = t.charCodeAt(i)
    n += o > 127 ? "\\u" + o.toString(16).padStart(4, "0") : r
  }
  var a = A(n)
  var s = y(keys.appCode, keys.appSecret)
    , l = b(s, a)
  return l.toUpperCase()
}

export const decodeData = (data) => {
  return function (t) {
    if (!t)
      return null
    var n = e.from(t.data.data.encData, "hex")
      , i = function (t, n) {
        return sm4.decrypt(n, t)
      }(y(keys.appCode, keys.appSecret), n)
    return JSON.parse(i)
  }(data)
}

function A(e) {
  var t, n, i = new Array
  t = e.length
  for (var r = 0; r < t; r++)
    (n = e.charCodeAt(r)) >= 65536 && n <= 1114111 ? (i.push(n >> 18 & 7 | 240),
      i.push(n >> 12 & 63 | 128),
      i.push(n >> 6 & 63 | 128),
      i.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (i.push(n >> 12 & 15 | 224),
        i.push(n >> 6 & 63 | 128),
        i.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (i.push(n >> 6 & 31 | 192),
          i.push(63 & n | 128)) : i.push(255 & n)
  return i
}
function y(e, t) {
  return A(b(A(e.substr(0, 16)), A(t)).toUpperCase().substr(0, 16))
}
function b(t, n) {
  // @ts-ignore
  var i = 16 - parseInt(n.length % 16)
  n = n.concat(new Array(i).fill(i))
  var r = s.encrypt(n, t)
  return e.from(r).toString("hex")
}
function p(e) {
  var t = new Array
    , n = 0
  for (var i in e)
    t[n] = i,
      n++
  var r = [].concat(t).sort()
    , o = {}
  for (var a in r)
    o[r[a]] = e[r[a]]
  return o
}
function m(e) {
  var t = {}
    , n = ["signData", "encData", "extra"]
  for (var i in e)
    e.hasOwnProperty(i) && !n.includes(i) && null != e[i] && (t[i] = e[i])
  return t
}
function v(e) {
  var t = []
  for (var n in e)
    if (e.hasOwnProperty(n) && (e[n] || "".concat(e[n])))
      if ("data" === n) {
        var i = Object.assign({}, e[n])
        for (var r in i) {
          if ("number" != typeof i[r] && "boolean" != typeof i[r] || (i[r] = "" + i[r]),
            Array.isArray(i[r]) && !i[r].length && delete i[r],
            Array.isArray(i[r]) && i[r].length > 0)
            for (var o = 0; o < i[r].length; o++)
              i[r][o] = p(i[r][o])
          null != i[r] && i[r] || delete i[r]
        }
        var a = p(i)
        t.push("".concat(n, "=").concat(JSON.stringify(a)))
      } else
        t.push("".concat(n, "=").concat(e[n]))
  return t.push("key=".concat(keys.appSecret)),
    t.join("&")
}
