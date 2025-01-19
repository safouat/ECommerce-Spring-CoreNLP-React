package com.safouat.service;

import java.util.List;

import com.safouat.models.CategoryEnum;
import com.safouat.models.Product;
import com.safouat.models.ProductDTO;
import com.safouat.models.ProductStatus;

public interface ProductService {

	Product addProductToCatalog(String token, Product product);

	Product getProductFromCatalogById(Integer id);

	String deleteProductFromCatalog(Integer id);

	Product updateProductIncatalog(Product product);
	
	List<Product> getAllProductsIncatalog();
	
	List<Product> getAllProductsOfSeller(Integer id);
	
	List<ProductDTO> getProductsOfCategory(CategoryEnum catenum);
	
	List<ProductDTO> getProductsOfStatus(ProductStatus status);
	
	
	
	Product updateProductQuantityWithId(Integer id, ProductDTO prodDTO);

}
