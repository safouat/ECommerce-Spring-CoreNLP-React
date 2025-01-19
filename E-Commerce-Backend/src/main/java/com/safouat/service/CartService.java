package com.safouat.service;

import com.safouat.controller.ProductNotFound;
import com.safouat.exception.CartItemNotFound;
import com.safouat.models.Cart;
import com.safouat.models.CartDTO;


public interface CartService {
	
	Cart addProductToCart(CartDTO cart, String token) throws CartItemNotFound;
	Cart getCartProduct(String token);
	Cart removeProductFromCart(CartDTO cartDto, String token) throws ProductNotFound;
//	public Cart changeQuantity(Product product,Customer customer,Integer quantity);
	
	Cart clearCart(String token);
	
}
