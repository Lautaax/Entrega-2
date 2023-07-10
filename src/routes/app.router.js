import loggerRouter from "./loggertest.router.js"
import productsRouter from './products.router.js';
import mailRouter from './mail.router.js'
import cartrouter from './cart.router.js'
import viewrouter from './views.router.js'
import mockRouter from "./mocking.router.js";
import sessionsRouter from "./sessions.router.js"
import usersRouter from "./users.router.js"
import smsRouter from "./sms.router.js"

const routesFunction = (productServer) => {
  

  productServer.get("/mockingproducts", mockRouter)
  productServer.use("/recovery", mailRouter)
  productServer.get("/sms", smsRouter)
  //productServer.use("/chat",chatRouter);
  productServer.use("/api/sessions", sessionsRouter);
  //productServer.get("/loggerTest",loggerRouter)
  productServer.use("/api/products", productsRouter);
  productServer.get("/loggerTest", loggerRouter);
  productServer.use("/api/carts", cartrouter);
  productServer.use("/api/users", usersRouter)
  productServer.use("/", viewrouter);


};

export default routesFunction;
