import chai from "chai"
import supertest from "supertest"
import config from "../../src/config.js";
import { ProductsMock } from "../../src/mocking.js";
const expect = chai.expect;


const requester = supertest("http://localhost:8080")
before(function () {

  this.productMock = new ProductsMock();
});
describe("Set de pruebas para los productos", function () {
  const product = {
    title: "Gabinete Gamer Xigmatek Master X Full 6 Fan Edition Templado",
    description: "INCLUYE 6 FANES 120 MM SIN LED CONEXION 3 PINES MOTHER , O MOLEX MACHO HEMBRA ( SE SPUEDE CONECTAR TODOS ENTRE SI A UN SOLO MOLEX) , CABLE LARGO 50 CM)",
    code: "PR0255",
    status: true,
    price: 26624,
    category: "Gabinete",
    owner: "admin",
    stock: 25,
    thumbnails: "./test/integration/assets/1689548524176-1681689657952-Gabinete-mid-tower_1.png"
  }

  it("GET /api/products/ GET debe retornar todos los productos", async function () {
    const result = await requester.get("/api/products/")
    expect(result.status).to.be.eql(200)
  }).timeout(10000);


  it("GET /api/products/:pid debe retornar un producto", async function () {
    const result = await requester.get("/api/products/64b45c1e2e71b72e3bb2ecd5")
    //console.log(result)

    expect(result._body.payload).to.have.property("_id");
    expect(result._body.payload._id).to.be.eql("64b45c1e2e71b72e3bb2ecd5")
    expect(result.status).to.be.eql(200)

  }).timeout(10000)



  it("POST /api/products Debe crear un producto correctamente", async function () {

    const result = await requester.post("/api/products")
    .field("title", product.title)
    .field("description", product.description)
    .field("price", product.price).field("status", product.status)
    .field("code", product.code)
    .field("stock", product.stock)
    .field("category", product.category)
    .field("owner", product.owner)
    .attach("thumbnails", product.thumbnails)
   // expect(response.headers["Content-Type"]).toMatch(/json/);
   // expect(result.status).to.be.eql(200);

   // expect(response.body.email).toEqual('foo@bar.com');
    // console.log(result)
    // expect(result.status).to.be.eql(500);
    // expect(result._body.payload).to.have.property("_id");
  }).timeout(10000)


}).timeout(10000)