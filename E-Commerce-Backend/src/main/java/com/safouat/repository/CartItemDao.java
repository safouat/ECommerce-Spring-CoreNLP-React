package com.safouat.repository;

import com.safouat.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import com.safouat.models.CartItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartItemDao extends JpaRepository<CartItem, Integer>{
    @Query("SELECT SUM(ci.cartItemQuantity) AS totalQuantity, " +
            "SUM(ci.cartItemQuantity * ci.cartProduct.price) AS totalPrice " +
            "FROM CartItem ci " +
            "JOIN ci.cartProduct p " +
            "WHERE p.productId = :productId")
    public Optional<Object[]> findQuantityAndTotalPriceByProductId(@Param("productId") Integer productId);

    void deleteByCartProduct(Product cartProduct);



}
