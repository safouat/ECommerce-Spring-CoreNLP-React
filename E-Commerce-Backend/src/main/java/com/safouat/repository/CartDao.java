package com.safouat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.safouat.models.Cart;

@Repository
public interface CartDao extends JpaRepository<Cart,Integer> {

//	public Map<Product,Integer> findbyName(String productName);
//	public Cart findbyId(Integer cartId);
}
