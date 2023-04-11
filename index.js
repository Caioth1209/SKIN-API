// biblioteca do npm para enviar arquivos em requisicoes com mais facilidade
const FormData = require("form-data");

// bilioteca para criar requisições http
const axios = require("axios");

// biblioteca para ler arquivos
const fs = require('fs');

// cria um objeto do tipo FormData
const data = new FormData();

// adiciona o arquivo no objeto
data.append("image", fs.createReadStream('./rosto.png'));

// adiciona os parametros da requisição
data.append("max_face_num", "1");
data.append("face_field", "color,smooth,acnespotmole,wrinkle,eyesattr,blackheadpore,skinface,skinquality");

// cria um objeto com as opções da requisição
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

// envia a requisição
axios.request(options).then(function (response) {

  // salva a resposta em um arquivo
  fs.writeFileSync('./resposta', JSON.stringify(response.data));

	console.log(response.data);
}).catch(function (error) {
  
	console.error(error);
});