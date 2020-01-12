const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
const fs = require("fs-extra");

const APP_ID = "18310903";
const API_KEY = "cvHSzgKXN4tqq3cUUc24GkUe";
const SECRET_KEY = "GYBzMSGSZ9qnQ1YEe9WaXPURZgzRKuyT";

const client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

function getBase64(imageFile) {
  return fs.readFileSync(imageFile).toString("base64");
}

exports.animalDetect = async imageFile => {
  let result = null;
  try {
    const detectResult = await client.animalDetect(getBase64(imageFile), {
      top_num: 1, // 返回预测得分top结果数，默认为6
      baike_num: 1 //	返回百科信息的结果数，默认不返回
    });
    result = detectResult.result[0];
    /*
    log_id	uint64	是	唯一的log id，用于问题定位
    result	arrry(object)	是	识别结果数组
    +name	string	是	动物名称，示例：蒙古马
    +score	uint32	是	置信度，示例：0.5321
    +baike_info	object	否	对应识别结果的百科词条名称
    ++baike_url	string	否	对应识别结果百度百科页面链接
    ++image_url	string	否	对应识别结果百科图片链接
    ++description	string	否	对应识别结果百科内容描述
    */
  } catch (e) {
    console.log(e);
  }
  return result;
};

exports.plantDetect = async imageFile => {
  let result = null;
  try {
    const detectResult = await client.plantDetect(getBase64(imageFile), {
      baike_num: 1 //	返回百科信息的结果数，默认不返回
    });
    result = detectResult.result[0];
    /*
    log_id	uint64	是	唯一的log id，用于问题定位
    result	arrry(object)	是	植物识别结果数组
    +name	string	是	植物名称，示例：吉娃莲
    +score	uint32	是	置信度，示例：0.5321
    +baike_info	object	否	对应识别结果的百科词条名称
    ++baike_url	string	否	对应识别结果百度百科页面链接
    ++image_url	string	否	对应识别结果百科图片链接
    ++description	string	否	对应识别结果百科内容描述
    */
  } catch (e) {
    console.log(e);
  }
  return result;
};
