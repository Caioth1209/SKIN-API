const FormData = require("form-data");
const axios = require("axios");
const fs = require('fs');

const data = new FormData();
data.append("image", fs.createReadStream('./rosto.png'));
data.append("max_face_num", "1");
data.append("face_field", "color,smooth,acnespotmole,wrinkle,eyesattr,blackheadpore,skinface,skinquality");

const options = {
  method: 'POST',
  url: 'https://skin-analysis.p.rapidapi.com/face/effect/skin_analyze',
  headers: {
    'X-RapidAPI-Key': '4adafb9956mshd8a3e78fca35258p1ac093jsn805054c398d1',
    'X-RapidAPI-Host': 'skin-analysis.p.rapidapi.com',
    ...data.getHeaders()
  },
  data: data
};

axios.request(options).then(function (response) {
    fs.writeFileSync('./resposta', JSON.stringify(response.data));

	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});