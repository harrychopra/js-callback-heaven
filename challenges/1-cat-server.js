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

function fetchAllOwners(cb) {
  server.request('/owners', (err, owners) => {
    if (err !== null) {
      cb(err);
      return;
    }

    const ownerNames = owners.map(owner => owner.toLowerCase());
    cb(null, ownerNames);
  });
}

function fetchCatsByOwner(ownerName, cb) {
  const requestUrl = `/owners/${ownerName}/cats`;
  server.request(requestUrl, (err, cats) => {
    if (err !== null) {
      cb(err);
      return;
    }
    cb(null, cats);
  });
}

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
