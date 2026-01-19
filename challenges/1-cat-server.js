const server = require('../utils/server');
// Do not change anything above this line

function checkServerStatus(cb) {
  server.request('/status', (err, status) => {
    if (err !== null) {
      cb(err);
      return;
    }

    cb(null, status);
  });
}

function fetchBannerContent(cb) {
  server.request('/banner', (err, data) => {
    if (err !== null) {
      cb(err);
      return;
    }

    cb(null, { ...data, copyrightYear: 2025 });
  });
}

function fetchAllOwners() {}

function fetchCatsByOwner() {}

function fetchCatPics() {}

function fetchAllCats() {}

function fetchOwnersWithCats() {}

function kickLegacyServerUntilItWorks() {}

function buySingleOutfit() {}

// Do not change anything below this line
module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner,
  server
};
