const db = require('./database');
const {
  checkLegacyStatus,
  getBannerContent,
  checkStatus,
  getPic,
  fetchOwners,
  fetchCatsByOwner,
  buyBuyBuy
} = require('./controllers');

class Server {
  constructor(database) {
    this.db = database;
    this.errors = [];
    this.validUrls = {
      '/owners': fetchOwners,
      '/status': checkStatus,
      '/legacy-status': checkLegacyStatus,
      '/banner': getBannerContent
    };
  }

  request(requestUrl, handleResponse) {
    this.errors = [];
    let response = '';

    setTimeout(() => {
      if (/\/owners\/[^/]+\/cats/.test(requestUrl)) {
        const owner = requestUrl.split('/')[2];
        response = fetchCatsByOwner(this.errors, this.db, owner);
      } else if (/\/pics/.test(requestUrl)) {
        const pic = requestUrl.split('/')[2];
        response = getPic(this.errors, this.db, pic);
      } else if (/\/outfits/.test(requestUrl)) {
        const outfit = requestUrl.split('/')[2];
        response = buyBuyBuy(this.errors, this.db, outfit, handleResponse);
      } else {
        if (!this.validUrls[requestUrl]) {
          this.errors.push(`404 - "${requestUrl}" is not a valid path`);
        } else {
          response = this.validUrls[requestUrl](this.errors, this.db);
        }
      }
      if (this.errors.length) return handleResponse(this.errors[0]);
      else
        return response ? handleResponse(null, response) : handleResponse('404 - path not found!');
    }, Math.random() * 200);
  }
}

module.exports = new Server(db);
