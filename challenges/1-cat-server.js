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

function fetchCatPics(catPics, cb) {
  if (catPics.length === 0) cb(null);
  const fileNames = []; // Cat pic file names received with each response

  catPics.forEach(catPic => {
    const requestUrl = `/pics/${catPic}`;

    server.request(requestUrl, (err, fileName) => {
      if (err !== null) {
        fileNames.push('placeholder.jpg');

        if (fileNames.length === catPics.length) {
          cb(null, fileNames);
        }
        return;
      }

      fileNames.push(fileName);

      if (fileNames.length === catPics.length) {
        cb(null, fileNames);
      }
    });
  });
}

function fetchAllCats(cb) {
  fetchAllOwners((err, owners) => {
    if (err !== null) {
      cb(err);
      return;
    }

    let allCats = [];
    let fetchCatsRequestCount = 0;

    owners.forEach(owner => {
      fetchCatsByOwner(owner, (err2, cats) => {
        fetchCatsRequestCount++;

        if (err2 === null) {
          allCats = allCats.concat(cats);

          if (fetchCatsRequestCount === owners.length) {
            allCats.sort();
            cb(null, allCats);
          }
        }
      });
    });
  });
}

function fetchOwnersWithCats(cb) {
  fetchAllOwners((err, owners) => {
    if (err !== null) {
      cb(err);
      return;
    }
    const catsByOwner = {};
    let fetchCatsRequestCount = 0;

    owners.forEach(owner => {
      fetchCatsByOwner(owner, (err2, cats) => {
        fetchCatsRequestCount++;

        if (err2 === null) {
          catsByOwner[owner] = cats;

          if (fetchCatsRequestCount === owners.length) {
            const ownersWithCats = owners.map(owner => ({ owner, cats: catsByOwner[owner] }));
            cb(null, ownersWithCats);
          }
        }
      });
    });
  });
}

function kickLegacyServerUntilItWorks(cb) {
  server.request('/legacy-status', (err, status) => {
    if (err === null) {
      cb(null, status);
      return;
    }
    kickLegacyServerUntilItWorks(cb);
  });
}

function buySingleOutfit(outfit, cb) {
  let hasCalledBackOnce = false;
  const requestUrl = `/outfits/${outfit}`;

  server.request(requestUrl, (err, response) => {
    if (hasCalledBackOnce) {
      return;
    }

    if (err !== null) {
      cb(err);
      return;
    }

    cb(null, response);
    hasCalledBackOnce = true;
  });
}

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
