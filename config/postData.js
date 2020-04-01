const axios = require("axios");
const ports = require("./ports");
const service = require("./service");
module.exports = postData;

async function postData({ target, trigger = service, data, mins = 0.01 }) {
  // console.log({data})

  const url = getApiUrl(target, trigger);
  try {
    const response = await axios({
      method: "post",
      url,
      timeout: mins * 60 * 1000,
      data
    });
    return response.data;
  } catch (e) {
    let code, status, url;

    ({ code } = e);
    if (e.response) {
      ({ status } = e.response);
    }
    if (e.config) {
      ({ url } = e.config);
    }

    if (code === "ECONNABORTED" && mins === 0.01) {
      console.log(`intentional early abortion for ${target}`);
    } else {
      console.log(`error with postData for ${target}`);
      console.log({ status, code, url });
    }
    return;
  }
}

function getApiUrl(target, trigger) {
  const project = process.env._GCP_PROJECT;
  const apis = {
    production: `https://${target}-dot-${project}.appspot.com/${target}/${trigger}`,
    local: `http://localhost:${ports[target]}/${target}/${trigger}`
  };

  let env = "production";
  if (enableLocal(target)) {
    env = process.env.NODE_ENV || "local";
  }

  return apis[env];
}

function enableLocal(target) {
  let res = false;
  const locals = [
    // 'informant-snapshot',
    // 'informant-newsletter',
    // 'informant-bubble',
    // 'informant-twitter',
    // "scanner",
    // "calculator",
    // "librarian",
    // "editor"
    // 'helper-date',
    // 'helper-links',
  ];
  if (locals.indexOf(target) > -1) {
    res = true;
  }
  return res;
}
