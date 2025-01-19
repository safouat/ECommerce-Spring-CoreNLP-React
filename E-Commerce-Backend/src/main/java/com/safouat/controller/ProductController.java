package com.safouat.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import com.safouat.models.*;
import com.safouat.repository.ImageDao;
import com.safouat.repository.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.safouat.service.ProductService;
import org.springframework.http.MediaType;

import org.springframework.web.multipart.MultipartFile;

@RestController
public class ProductController {

	@Autowired
	private ProductService pService;

	@Autowired
	private ImageDao imageRepository;
	@Autowired
	private ProductDao productRepository;



	// this method adds new product to catalog by seller(if seller is new it adds
	// seller as well
	// if seller is already existing products will be mapped to same seller) and
	// returns added product

	@Value("${file.upload-dir}")
	private String uploadDir;

	@PostConstruct
	public void init() {
		try {
			Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
			Files.createDirectories(uploadPath);
			System.out.println("Upload directory created at: " + uploadPath);
		} catch (IOException e) {
			throw new RuntimeException("Could not create upload directory!");
		}
	}


	@PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Product> addProductToCatalogHandler(
			@RequestHeader("token") String token,
			@RequestPart("product") @Valid Product product,
			@RequestPart("images") MultipartFile[] files) {

		try {
			Product savedProduct = pService.addProductToCatalog(token, product);
			List<Image> images = new ArrayList<>();

			// Get the absolute path of the upload directory
			Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
			System.out.println("Current upload path: " + uploadPath); // Debug log

			// Create directory if it doesn't exist
			Files.createDirectories(uploadPath);

			for (MultipartFile file : files) {
				String originalFilename = file.getOriginalFilename();
				if (originalFilename == null || originalFilename.isEmpty()) {
					continue; // Skip files without names
				}

				// Get file extension
				String fileExtension = "";
				int lastDotIndex = originalFilename.lastIndexOf(".");
				if (lastDotIndex > 0) {
					fileExtension = originalFilename.substring(lastDotIndex);
				}

				// Generate unique filename with extension
				String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

				// Create complete file path
				Path filePath = uploadPath.resolve(uniqueFilename);
				System.out.println("Attempting to save file to: " + filePath); // Debug log

				// Save the file
				Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
				System.out.println("File saved successfully at: " + filePath); // Debug log

				Image image = new Image();
				image.setImageUrl("/uploads/" + uniqueFilename);
				image.setProduct(savedProduct);
				images.add(image);
			}

			savedProduct.setImages(images);
			return new ResponseEntity<>(productRepository.save(savedProduct), HttpStatus.CREATED);

		} catch (IOException e) {
			e.printStackTrace(); // Print the full stack trace
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}
	}

	@GetMapping("/products/{productId}/images")
	public ResponseEntity<?> getProductImages(@PathVariable Integer productId) {
		try {
			List<Image> images = imageRepository.findByProduct_ProductId(productId);

			if (images.isEmpty()) {
				return ResponseEntity
						.status(HttpStatus.NOT_FOUND)
						.body(new HashMap<String, String>() {{
							put("message", "No images found for product ID: " + productId);
						}});
			}

			return ResponseEntity.ok(images);

		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new HashMap<String, String>() {{
						put("message", "Error retrieving images for product ID: " + productId);
						put("error", e.getMessage());
					}});
		}
	}
	// This method gets the product which needs to be added to the cart returns
	// product

	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getProductFromCatalogByIdHandler(@PathVariable("id") Integer id) {

		Product prod = pService.getProductFromCatalogById(id);

		return new ResponseEntity<Product>(prod, HttpStatus.ACCEPTED);

	}

	// This method will delete the product from catalog and returns the response
	// This will be called only when the product qty will be zero or seller wants to
	// delete for any other reason

	@DeleteMapping("/product/{id}")
	public ResponseEntity<String> deleteProductFromCatalogHandler(@PathVariable("id") Integer id) {
		
		String res = pService.deleteProductFromCatalog(id);
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}

	@PutMapping("/products")
	public ResponseEntity<Product> updateProductInCatalogHandler(@Valid @RequestBody Product prod) {

		Product prod1 = pService.updateProductIncatalog(prod);

		return new ResponseEntity<Product>(prod1, HttpStatus.OK);

	}

	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProductsHandler() {

		List<Product> list = pService.getAllProductsIncatalog();

		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
	}
	
  //this method gets the products mapped to a particular seller
	@GetMapping("/products/seller/{id}")
	public ResponseEntity<List<Product>> getAllProductsOfSellerHandler(@PathVariable("id") Integer id) {

		List<Product> list = pService.getAllProductsOfSeller(id);

		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
	}

	@GetMapping("/products/{catenum}")
	public ResponseEntity<List<ProductDTO>> getAllProductsInCategory(@PathVariable("catenum") String catenum) {
		CategoryEnum ce = CategoryEnum.valueOf(catenum.toUpperCase());
		List<ProductDTO> list = pService.getProductsOfCategory(ce);
		return new ResponseEntity<List<ProductDTO>>(list, HttpStatus.OK);

	}

	@GetMapping("/products/status/{status}")
	public ResponseEntity<List<ProductDTO>> getProductsWithStatusHandler(@PathVariable("status") String status) {

		ProductStatus ps = ProductStatus.valueOf(status.toUpperCase());
		List<ProductDTO> list = pService.getProductsOfStatus(ps);

		return new ResponseEntity<List<ProductDTO>>(list, HttpStatus.OK);

	}
	
	
	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateQuantityOfProduct(@PathVariable("id") Integer id,@RequestBody ProductDTO prodDto){
		
		 Product prod =   pService.updateProductQuantityWithId(id, prodDto);
		
		 return new ResponseEntity<Product>(prod,HttpStatus.ACCEPTED);
	}

}
