import { productService } from '../dao/services/product.service.js';
import { cartService } from '../dao/services/cart.service.js';
import { messagesService } from '../dao/services/messages.service.js';
import { ticketService } from '../dao/services/ticket.service.js';
export async function getViewProducts(req,res){
    const { limit = 2, page = 1, category, usable, sort } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
      } = await productService.getProductsfilterPage(page, limit, category, usable, sort);
      res.render("products", {
      
        user:req.session.user,
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
    
      });
}
export async function getProductwithitsid(req,res){
    const { pid } = req.params;
    const product = await productService.getProductsbyitsId(pid);
    res.render("product", {
      user:req.session.user,
      product,
  
    });
}
export async function getCartwithitsId(req,res){
    const { cid } = req.params;
    const cart = await cartService.getCartsbyId(cid);
    res.render("cart", {
      cart,
    });
}
export async function ticket(req,res){
  const { cid }=req.params

  const ticketFinal= await ticketService.createTickettoCart(cid)
  
  res.render("ticket",{
    ticketFinal: JSON.parse(JSON.stringify(ticketFinal)),
    user: req.session.user
  })

}
export function loginView(req,res){
   return res.render("login");
}
export function registerView(req,res){
    return res.render("register");
}
export function productsInformation(req,res){
  return res.render("products", { user: req.session.user });
}
export const chatView = async (req, res) => {
  try {
    const messages = await messagesService.getMessages();
    res.render("chat", {
      messages,
      style: "styles.css",
      title: "Ephemer - Chat",
    });

    if (!messages) {
      return res.status(404).render("error", {
        message: "Error 404: Messages not found",
      
   
      });
    }
  } catch (error) {
    console.log(`Failed to render chat view: ${error}`);
    res
      .status(500)
      .send({ status: "error", error: "Failed to render chat view" });
  }
};