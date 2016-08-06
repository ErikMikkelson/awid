const environment = process.env.NODE_ENV || "development";

export default deepFreeze({
  auth0: {
    public_key: [
      "-----BEGIN PUBLIC KEY-----",
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApvgjn+8ocf4TJR6x0pEH",
      "f39RC/1awcxa9uefuHiXyEbkBDKBSXanA/tfkq9cdWN4AsBeObYkEwc40MwmY8sY",
      "X0sLZBJhmn6DxZ5R9Hnx7VQRy7oYbNplHcPV3tv9G7MqVP1crOlt0SSyo1zJ+x1E",
      "Cs5r77xIfZ5AsnOgqL19u0e4XErMIbLuDDklXvnmZTVsjVTX/lTSJB/PKbcpKOJY",
      "pwKcLHvMWLt6kWSLPk1mDhSPk1E0lUPR5AeNsPVxokk47LhPE4FX2XBMspLPMM1z",
      "6RgceuPLaqSAYDMG2a7ovtuiYY97vEfKe+LiMjr5fsOXxdw3ER3sPYMK/4sniI25",
      "fwIDAQAB",
      "-----END PUBLIC KEY-----"
    ].join("\n")
  },
  env: {
    name: environment,
    production: environment === "production",
    test: environment === "test",
    development: environment === "development"
  }
});

function deepFreeze(o) {
  Object.freeze(o);

  const props = Object.getOwnPropertyNames(o);
  props.forEach(prop => {
    const value = o[prop];
    if (!value) {
      return;
    }

    const type = typeof value;
    if (type !== "object" && type !== "function") {
      return;
    }

    if (Object.isFrozen(value)) {
      return;
    }

    deepFreeze(value);
  });

  return o;
}
