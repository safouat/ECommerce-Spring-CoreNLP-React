package com.safouat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.safouat.models.CategoryEnum;
import com.safouat.models.Product;
import com.safouat.models.ProductDTO;
import com.safouat.models.ProductStatus;


@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	
	
	@Query("select new com.safouat.models.ProductDTO(p.productName,p.manufacturer,p.price,p.quantity) "
			+ "from Product p where p.category=:catenum")
    List<ProductDTO> getAllProductsInACategory(@Param("catenum") CategoryEnum catenum);
	
	
	@Query("select new com.safouat.models.ProductDTO(p.productName,p.manufacturer,p.price,p.quantity) "
			+ "from Product p where p.status=:status")
    List<ProductDTO> getProductsWithStatus(@Param("status") ProductStatus status);

	@Query("from Product p where p.seller.sellerId = :id")
	List<Product> getProductsOfASeller(@Param("id") Integer id);

}
