import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'
// import './utils/print'

interface Course {
  title: string
  count: number
}

interface CourseResult {
  time: number
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

class Spider {
  private url = 'https://www.worldometers.info/coronavirus/'
  private titleName: string = ''
  public spiderData: object = {}

  getHTMLInfo = async () => {
    const result = await superagent.get(this.url)
    return result.text
  }

  getNowFormatDate = (): string => {
    var date = new Date()
    var seperator1 = '-'

    var year = date.getFullYear()
    var month: number = date.getMonth() + 1
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var strDate: number = date.getDate()

    if (month >= 1 && month <= 9) {
      month = parseInt('0' + month)
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = parseInt('0' + strDate)
    }
    var currentdate =
      year +
      seperator1 +
      month +
      seperator1 +
      strDate +
      '  ' +
      hour +
      ':' +
      minutes +
      ':' +
      seconds

    return currentdate
  }

  // 根据Index返回标题
  getIndexToTitle = (index: number) => {
    switch (index) {
      case 0:
        return (this.titleName = '总数')
      case 1:
        return (this.titleName = '死亡总数')
      case 2:
        return (this.titleName = '治愈总数')
    }
  }

  getTargetEventJson = async (html: string) => {
    const $ = cheerio.load(html, {
      ignoreWhitespace: true,
      xmlMode: true,
    })
    const professionInfos: object[] = []
    let list = $('.maincounter-number')

    list.map((index, element) => {
      const text = $(element).find('span')
      this.getIndexToTitle(index)
      professionInfos.push({
        [this.titleName]: text.text(),
      })
    })

    professionInfos.push({
      当前时间: this.getNowFormatDate(),
    })
    console.log('professionInfos', professionInfos)
    let fileName = path.resolve(__dirname, 'current.json')
    fs.writeFileSync(fileName, JSON.stringify(professionInfos))
    return professionInfos
  }

  generateJSON = (dataJSON: object) => {
    let fileName = path.resolve(__dirname, '../data/covid.json')
    let pastData: object[] = []
    let currentData: object = {
      data: dataJSON,
      createTime: this.getNowFormatDate(),
    }
    if (fs.existsSync(fileName)) {
      pastData = [...JSON.parse(fs.readFileSync(fileName, 'utf-8'))]
      pastData.push(currentData)
    }
    fs.writeFileSync(fileName, JSON.stringify(pastData))
  }

  getInitSpider = async () => {
    const html = await this.getHTMLInfo()
    const dataJSON: object = await this.getTargetEventJson(html)
    this.generateJSON(dataJSON)
  }

  constructor() {
    this.getInitSpider()
  }
}
// new Spider()
// setInterval(() => {
//   new Spider()
// }, 30000)

export default Spider
