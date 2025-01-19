package com.safouat.service;

import java.util.List;
import java.util.Optional;

import com.safouat.exception.ResourceNotFoundException;
import com.safouat.models.*;
import com.safouat.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.safouat.exception.CategoryNotFoundException;
import com.safouat.exception.ProductNotFoundException;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductDao prodDao;

	@Autowired
	private SellerService sService;

	@Autowired
	private SellerDao sDao;
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private ImageDao imageDao;
    @Autowired
    private CartItemDao cartItemDao;
    @Autowired
    private CartDao cartDao;

	@Override
	@Transactional
	public Product addProductToCatalog(String token, Product product) {
		// Get current seller
		Seller currentSeller = sService.getCurrentlyLoggedInSeller(token);

		// Verify seller exists
		if (currentSeller == null) {
			throw new RuntimeException("Seller not found");
		}

		// Set up bidirectional relationship
		product.setSeller(currentSeller);

		// Save the product first
		Product savedProduct = prodDao.save(product);

		// Add to seller's product collection
		currentSeller.getProducts().add(savedProduct);

		// Update seller
		sDao.save(currentSeller);

		return savedProduct;
	}

	@Override
	public Product getProductFromCatalogById(Integer id) throws ProductNotFoundException {

		Optional<Product> opt = prodDao.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}

		else
			throw new ProductNotFoundException("Product not found with given id");
	}

	@Override
	@Transactional
	public String deleteProductFromCatalog(Integer id) throws ProductNotFoundException {
		Product product = prodDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found"));

		List<Cart> carts = cartDao.findAll();
		for (Cart cart : carts) {
			// Remove cart items that reference this product
			cart.getCartItems().removeIf(item -> item.getCartProduct().getProductId().equals(id));
			// Update cart total
			cart.setCartTotal(calculateCartTotal(cart.getCartItems()));
			cartDao.save(cart);
		}
		cartItemDao.deleteByCartProduct(product);

		// First, delete all associated comments
		commentDao.deleteByProduct(product);

		// Delete all associated images
		imageDao.deleteByProduct(product);

		// Finally delete the product
		prodDao.delete(product);
		return "product deleted";

	}
	private Double calculateCartTotal(List<CartItem> cartItems) {
		return cartItems.stream()
				.mapToDouble(item -> item.getCartProduct().getPrice() * item.getCartItemQuantity())
				.sum();
	}


	@Override
	public Product updateProductIncatalog(Product prod) throws ProductNotFoundException {

		Optional<Product> opt = prodDao.findById(prod.getProductId());

		if (opt.isPresent()) {
			Product existingProduct = opt.get();

			// Preserve the existing relationships if not explicitly updated
			if (prod.getSeller() == null) {
				prod.setSeller(existingProduct.getSeller());
			}

			// Update other fields of the product if necessary
			Product updatedProduct = prodDao.save(prod);
			return updatedProduct;
		} else {
			throw new ProductNotFoundException("Product not found with given id");
		}

	}

	@Override
	public List<Product> getAllProductsIncatalog() {
		List<Product> list = prodDao.findAll();
		
		if (list.size() > 0) {
			return list;
		} else
			throw new ProductNotFoundException("No products in catalog");

	}

	@Override
	public List<ProductDTO> getProductsOfCategory(CategoryEnum catenum) {

		List<ProductDTO> list = prodDao.getAllProductsInACategory(catenum);
		if (list.size() > 0) {

			return list;
		} else
			throw new CategoryNotFoundException("No products found with category:" + catenum);
	}

	@Override
	public List<ProductDTO> getProductsOfStatus(ProductStatus status) {

		List<ProductDTO> list = prodDao.getProductsWithStatus(status);

		if (list.size() > 0) {
			return list;
		} else
			throw new ProductNotFoundException("No products found with given status:" + status);
	}

	@Override
	public Product updateProductQuantityWithId(Integer id,ProductDTO prodDto) {
		Product prod = null;
		 Optional<Product> opt = prodDao.findById(id);
		 
		 if(opt!=null) {
			  prod = opt.get();
			 prod.setQuantity(prod.getQuantity()+prodDto.getQuantity());
			 prod.setProductName(prodDto.getProdName());
			 prod.setPrice(prodDto.getPrice());
			 prod.setManufacturer(prodDto.getManufaturer());
			 if(prod.getQuantity()>0) {
				 prod.setStatus(ProductStatus.AVAILABLE);
			 }
			 prodDao.save(prod);
			 
		 }
		 else
			 throw new ProductNotFoundException("No product found with this Id");
		
		return prod;
	}

	

	@Override
	public List<Product> getAllProductsOfSeller(Integer id) {
		
		List<Product> list = prodDao.getProductsOfASeller(id);
		
		if(list.size()>0) {
			
			return list;
			
		}
		
		else {
			throw new ProductNotFoundException("No products with SellerId: "+id);
		}
	}

}
