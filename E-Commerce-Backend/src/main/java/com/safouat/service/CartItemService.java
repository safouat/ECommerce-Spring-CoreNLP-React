package com.safouat.service;

import com.safouat.models.CartDTO;
import com.safouat.models.CartItem;

import java.util.Map;

public interface CartItemService {
	
	CartItem createItemforCart(CartDTO cartdto);
	 Map<String, Object> getProductSummaryByProductId(Integer productId) ;

	}
