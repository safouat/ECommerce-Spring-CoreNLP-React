package com.safouat.service;

import com.safouat.models.*;
import com.safouat.repository.CartItemDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.safouat.exception.ProductNotFoundException;
import com.safouat.repository.ProductDao;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Arrays;

@Service
public class CartItemServiceImpl implements CartItemService{

	@Autowired
	ProductDao productDao;
    @Autowired
    private CartItemDao cartItemDao;

	@Override
	public CartItem createItemforCart(CartDTO cartdto) {
		
		Product existingProduct = productDao.findById(cartdto.getProductId()).orElseThrow( () -> new ProductNotFoundException("Product Not found"));
		
		if(existingProduct.getStatus().equals(ProductStatus.OUTOFSTOCK) || existingProduct.getQuantity() == 0) {
			throw new ProductNotFoundException("Product OUT OF STOCK");
		}
		
		CartItem newItem = new CartItem();
		
		newItem.setCartItemQuantity(1);
		
		newItem.setCartProduct(existingProduct);
		
		return newItem;
	}

	public Map<String, Object> getProductSummaryByProductId(Integer productId) {
		System.out.println("Fetching data for productId: " + productId);

		Optional<Object[]> result = cartItemDao.findQuantityAndTotalPriceByProductId(productId);
		Map<String, Object> response = new HashMap<>();

		if (result.isPresent()) {
			Object[] outerArray = result.get();
			System.out.println("Outer array length: " + outerArray.length);
			System.out.println("Outer array content: " + Arrays.toString(outerArray));

			// Initialize variables with default values
			Long totalQuantity = 0L;
			Double totalPrice = 0.0;

			if (outerArray.length > 0 && outerArray[0] != null) {
				if (outerArray[0] instanceof Object[]) {
					Object[] innerArray = (Object[]) outerArray[0];
					System.out.println("Inner array length: " + innerArray.length);
					System.out.println("Inner array content: " + Arrays.toString(innerArray));

					// Handle quantity (first element of inner array)
					if (innerArray.length > 0 && innerArray[0] != null) {
						if (innerArray[0] instanceof BigDecimal) {
							totalQuantity = ((BigDecimal) innerArray[0]).longValue();
						} else if (innerArray[0] instanceof Long) {
							totalQuantity = (Long) innerArray[0];
						} else if (innerArray[0] instanceof Integer) {
							totalQuantity = ((Integer) innerArray[0]).longValue();
						} else {
							totalQuantity = Long.valueOf(innerArray[0].toString());
						}
					}

					// Handle price (second element of inner array)
					if (innerArray.length > 1 && innerArray[1] != null) {
						if (innerArray[1] instanceof BigDecimal) {
							totalPrice = ((BigDecimal) innerArray[1]).doubleValue();
						} else if (innerArray[1] instanceof Double) {
							totalPrice = (Double) innerArray[1];
						} else {
							totalPrice = Double.valueOf(innerArray[1].toString());
						}
					}
				}
			}

			response.put("productId", productId);
			response.put("totalQuantity", totalQuantity);
			response.put("totalPrice", totalPrice);
		} else {
			response.put("productId", productId);
			response.put("totalQuantity", 0L);
			response.put("totalPrice", 0.0);
		}

		return response;
	}


//	@Override
//	public CartItem addItemToCart(CartDTO cartdto) {
//		
//		// TODO Auto-generated method stub
//		
////		Product existingProduct = productDao.findById(cartdto.getProductId()).orElseThrow( () -> new ProductException("Product Not found"));
//		
//		Optional<Product> opt = productDao.findById(cartdto.getProductId());
//		
//		if(opt.isEmpty())
//			throw new ProductNotFoundException("Product not found");
//		
//		Product existingProduct = opt.get();
//		
//		CartItem newItem = new CartItem();
//		
//		newItem.setCartProduct(existingProduct);
//		
//		newItem.setCartItemQuantity(1);
//		
//		return newItem;
//	}

}
