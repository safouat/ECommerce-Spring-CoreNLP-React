package com.safouat.models;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	
	private String prodName;
	private String manufaturer;
	private Double price;
	private Integer quantity;
	
	
}
