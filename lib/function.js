const config = require('../config.json')
module.exports = {
    eggDetails: async function eggDetails(nest, egg) {
      const y = await axios({
        url: `${config.host}/api/application/nests/${nest}/eggs/${egg}`,
        method: "GET",
        followRedirect: true,
        maxRedirects: 5,
        headers: {
          Authorization: "Bearer " + config.ptero_api,
          "Content-Type": "application/json",
          Accept: "Application/vnd.pterodactyl.v1+json",
        },
      });
      return y.data;
    },

    client: {
      serverDetails: async function serverDetails(serverid, keyid) {
        const y = await axios({
          url: `${config.host}/api/client/servers/${serverid}/resources`,
          method: "GET",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
        });
        return y.data;
      },
      userAccount: async function userAccount(keyid) {
        try {
          const y = await axios({
            url: `${config.host}/api/client/account`,
            method: "GET",
            followRedirect: true,
            maxRedirects: 5,
            headers: {
              Authorization: "Bearer " + keyid,
              "Content-Type": "application/json",
              Accept: "Application/vnd.pterodactyl.v1+json",
            },
          });
          return y.data;
        } catch (e) {
          return { success: false };
        }
      },
      userPermissions: async function userPermissions(keyid) {
        const y = await axios({
          url: `${config.host}/api/client/permissions`,
          method: "GET",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
        });
        return y.data;
      },
      serverStop: async function serverStop(serverid, keyid) {
        const y = await axios({
          url: `${config.host}/api/servers/${serverid}/power`,
          method: "GET",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
          data: { signal: "stop" },
        });
        return y.data;
      },
      serverStart: async function serverStart(serverid, keyid) {
        const y = await axios({
          url: `${config.host}/api/servers/${serverid}/power`,
          method: "GET",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
          data: { signal: "start" },
        });
        return {};
      },
      serverKill: async function serverKill(serverid, keyid) {
        const y = await axios({
          url: `${config.host}/api/servers/${serverid}/power`,
          method: "GET",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
          data: { signal: "kill" },
        });
        return {};
      },
      serverRestart: async function serverRestart(serverid, keyid) {
        axios({
          url: `${config.host}/api/servers/${serverid}/power`,
          method: "GET",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
          data: { signal: "kill" },
        });
        setTimeout(() => {
          axios({
            url: `${config.host}/api/servers/${serverid}/power`,
            method: "GET",
            followRedirect: true,
            maxRedirects: 5,
            headers: {
              Authorization: "Bearer " + keyid,
              "Content-Type": "application/json",
              Accept: "Application/vnd.pterodactyl.v1+json",
            },
            data: { signal: "start" },
          });
        }, 500);
        return {};
      },
      serverSendCommand: async function serverSendCommand(
        serverid,
        keyid,
        message
      ) {
        const y = await axios({
          url: `${config.host}/api/client/servers/${serverid}/command`,
          method: "POST",
          followRedirect: true,
          maxRedirects: 5,
          headers: {
            Authorization: "Bearer " + keyid,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
          },
          data: { command: message },
        });
        return {};
      },
    },
  };