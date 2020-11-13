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
  private url = 'https://www.lagou.com/zhaopin/Node.js/?labelWords=label'
  private cookie =
    'user_trace_token=20201012170657-983c40af-9023-421d-8c64-92c7447df0b8; _ga=GA1.2.700225282.1602493618; LGUID=20201012170658-102cf365-7c51-4d5a-a32e-616284c18958; RECOMMEND_TIP=true; _gid=GA1.2.691311988.1602493631; index_location_city=%E5%85%A8%E5%9B%BD; gate_login_token=c61185354de3e38287a4f6a4b3ef0dcc584d8f8e07aef554feece8c9451f1174; LG_HAS_LOGIN=1; _putrc=EC2E1C9A80332EDC123F89F2B170EADC; JSESSIONID=ABAAAECABIEACCA567FB66F06A43A595B7E51719FF590AB; login=true; hasDeliver=0; privacyPolicyPopup=false; WEBTJ-ID=20201013143351-17520aa47c63a1-085ce4780f753a-6701b35-1024000-17520aa47c7ca9; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1602493618,1602493631,1602570766,1602570953; TG-TRACK-CODE=index_navigation; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217520adbe651f4-0b10b19d1d6eb-6701b35-1024000-17520adbe66cdd%22%2C%22%24device_id%22%3A%2217520adbe651f4-0b10b19d1d6eb-6701b35-1024000-17520adbe66cdd%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; LGSID=20201013153807-e0bd1dce-75b5-4ed3-ad3b-6aabc9b8449c; _gat=1; unick=%E7%94%A8%E6%88%B78783; SEARCH_ID=e8c807ce06434ee4a3a5210f3f8ac10f; X_HTTP_TOKEN=5e89e0a97454eb0f53467520614f75320f58d788c0; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1602576436; LGRID=20201013160715-040fb061-993a-4692-8188-de5c8da91dd6'
  getHTMLInfo = async () => {
    const result = await superagent.get(this.url).set('cookie', this.cookie)
    return result.text
  }
  //
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

  getTargetEventJson = async (html: string) => {
    const $ = cheerio.load(html, {
      ignoreWhitespace: true,
      xmlMode: true,
    })
    const professionInfos: object[] = []
    let list = $('.default_list')

    list.map((index, element) => {
      const post = $(element).find('h3')
      const wage = $(element).find('.money')
      const company = $(element).find('.company_name')
      const welfare = $(element).find('.li_b_r')
      professionInfos.push({
        Post: post.text(),
        Wage: wage.text(),
        company: company.eq(0).text(),
        welfare: welfare.text(),
      })
    })

    professionInfos.pop()
    return professionInfos
  }

  generateJSON = (dataJSON: object) => {
    let fileName = path.resolve(__dirname, '../data/lagou.json')
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
    console.log('dasdsa', dataJSON)
    this.generateJSON(dataJSON)
  }

  constructor() {
    this.getInitSpider()
  }
}

// new Spider()

export default Spider
