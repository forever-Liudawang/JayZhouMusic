export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
const test = ()=>{
  console.log('1233', 1233)
}
const testV2 = ()=>{
  console.log('1233', 1233)
}
const a = 10;
const Test = ()=>{
  
}

//这是v1特有代码
const b = 100

const c = 200

const e = 400
const d = 300
