var axios = require('axios').default;
var moment = require('moment');

const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream('outTeste.csv');

var merchants = [];
var countError = 0
var count = 0;

function toPascalCase(str) {
  return (str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  )).trim();
}

async function obtainData(options) {
  try {
    return await axios.request(options);
  } catch (err) {
    countError ++
    console.log(err)
    return undefined
  }
}

async function getExtras() {
  if (count < merchants.length) {
    const id = merchants[count].id;
    const extraOptions = {
      method: 'GET',
      url: `https://marketplace.ifood.com.br/v1/merchants/${id}/extra`
    };
    const response = await obtainData(extraOptions);
    if (response) {
      merchants[count] = Object.assign({}, merchants[count], response.data);
    }
    count++;
    await getExtras();
  }
}

async function allMerchantsRestaurantes(cursor) {
  try {
    let options = {
      method: 'POST',
      url: 'https://marketplace.ifood.com.br/v2/home',
      params: {
        latitude: '-22.4992513',
        longitude: '-44.1245899',
        channel: 'IFOOD',
        size: '100',
        alias: 'SINGLE_TAB_CMS',
        cursor: cursor
      },
      headers: { 'Content-Type': 'application/json' },
      data: {

        "supported-cards": [
        
          "NEXT_CONTENT",
      
          "MERCHANT_LIST_V2"
      
        ],
        "supported-actions": [
      
          "merchant",
          "page",
          "card-content",
          "last-restaurants"
      
        ],
        "feed-feature-name": "",
        "faster-overrides": ""
      }
    };
    let response = await obtainData(options);
    let json = response.data;
    let cards = json['sections'][0]['cards'];
    const cardMerchantList = cards.find(a => a.cardType === 'MERCHANT_LIST_V2');
    const merchantList = cardMerchantList.data.contents;
    const cardResponseCursor = cards.find(a => a.cardType === 'NEXT_CONTENT');
    if (!cardResponseCursor){
      merchants = merchants.concat(merchantList);
    } else {
      let responseCursor = cardResponseCursor ? cardResponseCursor.data.action : false;
      if (!responseCursor) return
      responseCursor = responseCursor.replace('card-content?cursor=', '');
      merchants = merchants.concat(merchantList);
      await allMerchantsRestaurantes(responseCursor);
    }
  } catch (err) {
    console.log(err);
  }
}
async function allMerchantsBebidas(cursor) {
    try {
      let options = {
        method: 'POST',
        url: 'https://marketplace.ifood.com.br/v2/home',
        params: {
          latitude: '-22.4992513',
          longitude: '-44.1245899',
          channel: 'IFOOD',
          size: '100',
          alias: 'MERCADO_BEBIDAS',
          cursor: cursor
        },
        headers: { 'Content-Type': 'application/json' },
        data: {

            "supported-cards": [
            
                "NEXT_CONTENT",
                "MERCHANT_LIST_V2"
        
            ],
            "supported-actions": [
        
                "merchant",
                "page",
                "card-content",
                "last-restaurants"
        
            ],
            "feed-feature-name": "",
            "faster-overrides": ""
        }
      };
      let response = await obtainData(options);
      let json = response.data;
      let cards = json['sections'][0]['cards'];
      const cardMerchantList = cards.find(a => a.cardType === 'MERCHANT_LIST_V2');
      const merchantList = cardMerchantList.data.contents;
      const cardResponseCursor = cards.find(a => a.cardType === 'NEXT_CONTENT');
      if (!cardResponseCursor){
        merchants = merchants.concat(merchantList);
      } else {
        let responseCursor = merchantList ? cardResponseCursor.data.action : false;
        if (!responseCursor) return
        responseCursor = responseCursor.replace('card-content?cursor=', '');
        merchants = merchants.concat(merchantList);
        await allMerchantsBebidas(responseCursor);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function allMerchantsMercado(cursor) {
    try {
      let options = {
        method: 'POST',
        url: 'https://marketplace.ifood.com.br/v2/home',
        params: {
          latitude: '-22.4992513',
          longitude: '-44.1245899',
          channel: 'IFOOD',
          size: '100',
          alias: 'MERCADO_BR_CLEAN',
          cursor: cursor
        },
        headers: { 'Content-Type': 'application/json' },
        data: {

            "supported-cards": [
            
                "NEXT_CONTENT",
                "MERCHANT_LIST_V2"
        
            ],
            "supported-actions": [
        
                "merchant",
                "page",
                "card-content",
                "last-restaurants"
        
            ],
            "feed-feature-name": "",
            "faster-overrides": ""
        }
      };
      let response = await obtainData(options);
      let json = response.data;
      let cards = json['sections'][0]['cards'];
      const cardMerchantList = cards.find(a => a.cardType === 'MERCHANT_LIST_V2');
      const merchantList = cardMerchantList.data.contents;
      const cardResponseCursor = cards.find(a => a.cardType === 'NEXT_CONTENT');
      if (!cardResponseCursor){
        merchants = merchants.concat(merchantList);
      } else {
        let responseCursor = merchantList ? cardResponseCursor.data.action : false;
        if (!responseCursor) return
        responseCursor = responseCursor.replace('card-content?cursor=', '');
        merchants = merchants.concat(merchantList);
        await allMerchantsBebidas(responseCursor);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function allMerchantsFarmacia(cursor) {
    try {
      let options = {
        method: 'POST',
        url: 'https://marketplace.ifood.com.br/v2/home',
        params: {
          latitude: '-22.4992513',
          longitude: '-44.1245899',
          channel: 'IFOOD',
          size: '100',
          alias: 'MERCADO_FARMACIA',
          cursor: cursor
        },
        headers: { 'Content-Type': 'application/json' },
        data: {

            "supported-cards": [
            
                "NEXT_CONTENT",
                "MERCHANT_LIST_V2"
        
            ],
            "supported-actions": [
        
                "merchant",
                "page",
                "card-content",
                "last-restaurants"
        
            ],
            "feed-feature-name": "",
            "faster-overrides": ""
        }
      };
      let response = await obtainData(options);
      let json = response.data;
      let cards = json['sections'][0]['cards'];
      const cardMerchantList = cards.find(a => a.cardType === 'MERCHANT_LIST_V2');
      const merchantList = cardMerchantList.data.contents;
      const cardResponseCursor = cards.find(a => a.cardType === 'NEXT_CONTENT');
      if (!cardResponseCursor){
        merchants = merchants.concat(merchantList);
      } else {
        let responseCursor = merchantList ? cardResponseCursor.data.action : false;
        if (!responseCursor) return
        responseCursor = responseCursor.replace('card-content?cursor=', '');
        merchants = merchants.concat(merchantList);
        await allMerchantsBebidas(responseCursor);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function allMerchantsPetshop(cursor) {
    try {
      let options = {
        method: 'POST',
        url: 'https://marketplace.ifood.com.br/v2/home',
        params: {
          latitude: '-22.4992513',
          longitude: '-44.1245899',
          channel: 'IFOOD',
          size: '100',
          alias: 'MERCADO_PETSHOP',
          cursor: cursor
        },
        headers: { 'Content-Type': 'application/json' },
        data: {

            "supported-cards": [
            
                "NEXT_CONTENT",
                "MERCHANT_LIST_V2"
        
            ],
            "supported-actions": [
        
                "merchant",
                "page",
                "card-content",
                "last-restaurants"
        
            ],
            "feed-feature-name": "",
            "faster-overrides": ""
        }
      };
      let response = await obtainData(options);
      let json = response.data;
      let cards = json['sections'][0]['cards'];
      const cardMerchantList = cards.find(a => a.cardType === 'MERCHANT_LIST_V2');
      const merchantList = cardMerchantList.data.contents;
      const cardResponseCursor = cards.find(a => a.cardType === 'NEXT_CONTENT');
      if (!cardResponseCursor){
        merchants = merchants.concat(merchantList);
      } else {
        let responseCursor = merchantList ? cardResponseCursor.data.action : false;
        if (!responseCursor) return
        responseCursor = responseCursor.replace('card-content?cursor=', '');
        merchants = merchants.concat(merchantList);
        await allMerchantsBebidas(responseCursor);
      }
    } catch (err) {
      console.log(err);
    }
  }
(async () => {
    await allMerchantsRestaurantes();
    await allMerchantsBebidas();
    await allMerchantsMercado();
    await allMerchantsFarmacia();
    await allMerchantsPetshop();
    await getExtras();
      merchants = merchants.map((merchant, index) => {
        merchants[index].friendlyName = merchant.mainCategory !== undefined ? merchant.mainCategory.friendlyName : 'Sem Registro';
        merchants[index].latitude = merchant.address !== undefined ? merchant.address.latitude.toString() : 'Sem Localização';
        merchants[index].longitude = merchant.address !== undefined ? merchant.address.longitude.toString() : 'Sem Localização';
        merchants[index].city = merchant.address !== undefined ? merchant.address.city : 'Sem Registro';
        merchants[index].phoneIf = merchant.phoneIf !== undefined ? merchant.phoneIf : 'Sem Número';
        merchants[index].district = merchant.address !== undefined ? merchant.address.district : 'Sem Endereço';
        merchants[index].zipcode = merchant.address !== undefined ? merchant.address.zipCode : 'Sem Endereço';
        merchants[index].street = merchant.address !== undefined ? merchant.address.streetName : 'Sem Endereço';
        merchants[index].number = merchant.address !== undefined ? merchant.address.streetNumber : 'Sem Endereço';
        merchants[index].value = merchant.documents !== undefined ? merchant.documents.CNPJ !== undefined ? merchant.documents.CNPJ.value : 'Sem Registro' : 'Sem Registro';
        if (merchant.shifts !== undefined) {
          merchant.shifts.map((day) => {
            let start = moment(day.start,'HH:mm:ss');
            let end = start.clone().add(day.duration, 'm');
            merchants[index][day.dayOfWeek] = start.format('HH:mm:ss') + ' - ' + end.format('HH:mm:ss');
          })
        } else {
          'Não Abre';
        }
      const {
        latitude,
        longitude,
        distance,
        isIfoodDelivery,
        isNew,
        isSuperRestaurant,
        name,
        supportsTracking,
        userRating,
        minimumOrderValue,
        value,
        phoneIf,
        userRatingCount,
        city,
        district,
        zipcode,
        street,
        number,
        friendlyName,
        type,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
      } = merchants[index];

      return {
        'Loja': toPascalCase(name),
        'Categoria': type,
        'Sub Categoria': friendlyName,
        'Distância': distance,
        'Nota': userRating.toFixed(1),
        'Contagem de Votos': userRatingCount,
        'Ifood Delivery': isIfoodDelivery,
        'Novo': isNew,
        'Super Restaurante': isSuperRestaurant,
        'Rastreamento': supportsTracking,
        'Pedido Mínimo': minimumOrderValue,
        'CNPJ': value,
        'Cidade': city,
        'Telefone': phoneIf,
        'CEP': zipcode,
        'Bairro': toPascalCase(district),
        'Rua': toPascalCase(street),
        'Número': number,
        'Latitude': latitude,
        'Longitude': longitude,
        'Segunda-feira': MONDAY,
        'Terça-feira': TUESDAY,
        'Quarta-feira': WEDNESDAY,
        'Quinta-feira': THURSDAY,
        'Sexta-feira': FRIDAY,
        'Sábado': SATURDAY,
        'Domingo': SUNDAY
      };
    });
    console.log(merchants)
    console.log(countError)
    fastcsv
      stream.write(merchants, { headers: true, encoding: 'utf-16le' })
      .pipe(ws);
})();