import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { SneakersController } from '../controllers';
import { CartItem, OrderDetails, OrderItems } from '../models';
import { CartItemRepository, OrderDetailsRepository, OrderItemsRepository, ShoppingSessionRepository, SizesRepository, SneakersRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CheckoutService {
  constructor(
    @repository(CartItemRepository) public cartItemRepository: CartItemRepository,
    @repository(ShoppingSessionRepository) public shoppingSessionRepository: ShoppingSessionRepository,
    @repository(SneakersRepository) public sneakersRepository: SneakersRepository,
    @repository(SizesRepository) public sizesRepository: SizesRepository,
    @repository(OrderDetailsRepository) public orderDetailsRepository: OrderDetailsRepository,
    @repository(OrderItemsRepository) public orderItemsRepository: OrderItemsRepository,
  ) {}

  public async create(id: number, cartItem: CartItem): Promise<CartItem> {
    const session = await this.shoppingSessionRepository.findOne({where: {user_id: id}});
    const size = await this.sizesRepository.findById(cartItem.size_id);

    cartItem.session_id = session?.id!;
    const cartItems = await this.cartItemRepository.find({where: {session_id: session!.id}});
    let cartItemCreated = new CartItem();
    if (cartItems.length > 0) {
      console.log(cartItems);
      cartItems.filter(item => {
        console.log(item.sneakers_id === cartItem.sneakers_id);
        if(item.sneakers_id === cartItem.sneakers_id){
          cartItem.quantity += item.quantity;
          cartItem.id = item.id;
          cartItemCreated = cartItem;
        }
      });
      await this.cartItemRepository.updateById(cartItemCreated.id, cartItemCreated);
    } else {
      cartItemCreated = await this.cartItemRepository.create(cartItem);
    }
    if(cartItemCreated.sneakers_id) {

      const sneakers = await this.sneakersRepository.findById(cartItemCreated.sneakers_id);
      for(let i = 0; i < cartItem.quantity; i++){
        session!.total! += sneakers.price;
      }
      await this.shoppingSessionRepository.updateById(session!.id!, session!);

    } else {
      this.checkoutError(400, 'Bad Request', 'U need add a skenaers to the cart');
    }
    
    return cartItemCreated;
  }

  public async sell(userId: number): Promise<OrderDetails> {
    const session = await this.shoppingSessionRepository.findOne({where: {user_id: userId}});
    const items = await this.cartItemRepository.find({
      where: {session_id: session!.id},
      include: [
        {
          relation: 'sneakers'
        }
      ],
    });
    
    const order = new OrderDetails({
      total: session?.total,
      user_id: userId
    });
    const orderGenerated = await this.orderDetailsRepository.create(order);
    
    for (let i = 0; i < items.length; i++){
      let item = Object.assign(items[i]);
      const orderItem = new OrderItems({
        order_id: orderGenerated.id,
        sneakers_id: item.sneakers_id
      });
      const snekaersPrice = item.sneakers.price *  item.quantity;
      session!.total! -= snekaersPrice;
      await this.orderItemsRepository.create(orderItem);
      await this.cartItemRepository.deleteById(item.id);
    }
    
    await this.shoppingSessionRepository.updateById(session?.id, session!);

    return orderGenerated;
  }

  private checkoutError(errorCode: number, code: string, message: string) {
    const error = new HttpErrors[errorCode]();
    //Temporalmente se establece asi, ya que el code del 404 es este mismo
    error.code = code;
    error.message = message;
    throw error;
  }
}
