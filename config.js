export default {
  port: 4000,
  //backendUrl: 'http://localhost:4000',
  //frontEndUrl: "http://localhost:5173",
  backendUrl: "https://ceriga-backend-test.vercel.app",
  //frontEndUrl: "https://ceriga-devy.vercel.app",
  frontEndUrl: "https://studio.ceriga.co",
  //backendUrl: "https://studio-ceriga-backend.vercel.app",

  corsOptions: {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false,
    maxAge: 86400,
    exposedHeaders: 'X-My-Custom-Header,X-Another-Custom-Header'
  },
  strapiKey: "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",
  strapiEndpointSecret: "whsec_a21a53849bdc06e971a24c2a8fc675c9b17ce8de124d5f2b2f215a58ab58131d",
  jwtSecret: "qwrewrwetwe",
  // mongoUrl: `mongodb+srv://wdceriga:pmu5U5H7yGvxoCUg@ceriga.qma2q.mongodb.net/?retryWrites=true&w=majority&appName=Ceriga`,
  mongoUrl: `mongodb://localhost:27017`,
  GOOGLE_CLIENT_ID: "444991310753-kq1casqnt693hmaki225br1l2ok2faca.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: "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",
  email: {
    user: "cerigasender@gmail.com",
    pass: "lqis qqqm ebnl gsbz"
  }, googleApplicationCredentials: {
    "type": "service_account",
    "project_id": "ceriga",
    "private_key_id": "0f7d6e0abdab9aa814bdd05b36de95560d227157",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCzwuDg91avIZmG\n6Z+PUEYg6LpppdI7u9rBC8rUTgl1aYYZFHCk1X3WIKHuN5k45igcvtu/fNGT0/MC\nEwp5N2UMZ0NFYpqoHd65qm7HuGtZp4MQ7j3JjawL7QudCOrF7i8GP3npn8Cv5L/u\nsC05yxyTypyQd/mbAjIzUsEefmvlo3RlfV+7gIxoYK2xc9pasA09LVPFbY1b9hHG\nMj01n5Cpi3YX1eCN2RqfB5273yF+QaDXa7wTkmN6mNLj7uFYwVU321tW7l0aRc+R\ncC4F+jXByGre4xxxm0kWtDFI8BEZbMjRsaHx5vBRq07YwIORVODsDiMAmxb9joQY\nGGMoWZudAgMBAAECggEAJvS8HDStxe0/orOdXwbz86zLvRpw6X4H5Z8DGShCN34j\nT+sUkDwt9YoD3aaR33lNRxF7eM95cZJUjuYGdodxMBNuyioYvwceHdlYAZMvPHIn\nXrNqk3POzZTU1/a3PiakbTOzXVRAAz5M89KdMnGYY1Tcwhgl8Rg0PdgYvt2Bz3VT\nbUXewMJk0WbCGC7e1pDqPIS04T1dhDHJgoTerkv7MW/tXGt/EtDYCQUs+2iKTm1b\nybn8LoqZavqg3KDrvRm4nyf7X0CTtS/YL6VAuq6SYkYyj8HKBMnpg8l6nebzoM+E\nvYjszx7caVR9oeQb66k3FCfoCSWzCpP3u3K4/aAYIQKBgQD1umaNJpMBzlm+vb5r\nFSQcjZJp8xRcxupP9Rp1WLPbguKSUYaHJobib+VgNcfumo+Fkr6k1KDplx/dZdDh\nPbq1qM5zLX2ypmWhmRv5t02PBx6RkXcKS9eEZsr/1FR8x8+gS9oZHPz/s3BwCu4X\nK1Z7oxcidXRuxRH2C33nKKP8cQKBgQC7RoykewFbxsOFHologSH5i+O+xRrIWgIz\nPhebGpluxh2dPt9qBFs+YM6M2/q011rKIJEwlFvQuPpM2J2XvY7X2mJPDafOFVMb\n9pcyTHhONg+l4MCMkBhtHj31HCYZ1ZAwOkBKIYRZt+iIZz8SjpVlTiyhzZ95qoWB\n+Vg1IubX7QKBgHp+p2yp1BLMaRSaxfffnBbXxCsoz/fH+TpOtxfUViSRRJ0oIuXw\noMD0guXJKZeaWP1/P6YvkN+hRHM7tDr0aMTyF6h2/vg11ugNyVJcvD8Wj3iFiVAK\nqq8IBx4tHMjvWmNQLLLkLoLRUrWn3TSTmBMeJAQ7hQVLHD8JT4QSUF0hAoGAW6xY\nUnfIHXX55eMh3l9AE1kwHgV8a9DrvMvLYGiv7PLcMkpBsTL6u1lGItvYKMg2sDUq\n/X3SSCUUmaN72Xi4QN+tOgd0OkRkD48xSjT2u0ppdIjFmMk8u8WPDLo/yGurjoAl\nUmR/1i9Zi9QGov3bEeEnpfjy9OrNOeemDzTLja0CgYB//7PNnHYTxtE9vyV+LmhD\nxo71IK7soZkVy8IfvpFuBzDoE7TDxVrrDrTh3UAhgGa/xruV9kHjMK1fxiJ7cS3C\n3wpyaWKQJzIo16YDVViNwFntyIK9Egu9nGEq8E+vyLmijP8TiFRuxFnEqXDcQ3/m\no1q3g9ST4/EaBCLzapX2pg==\n-----END PRIVATE KEY-----\n",
    "client_email": "storage-admin@ceriga.iam.gserviceaccount.com",
    "client_id": "110594432292973460522",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/storage-admin%40ceriga.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  ,
}
