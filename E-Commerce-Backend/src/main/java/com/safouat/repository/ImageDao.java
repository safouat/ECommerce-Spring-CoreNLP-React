package com.safouat.repository;


import com.safouat.models.Image;
import com.safouat.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageDao extends JpaRepository<Image, Integer> {
    // You can add custom queries if needed
    // For example, find all images by productId
    // List<Image> findByProductId(Integer productId);
    List<Image> findByProduct_ProductId(Integer productId);
    void deleteByProduct(Product product);

}
