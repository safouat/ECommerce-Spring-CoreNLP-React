package com.safouat.models;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer productId;

	@NotNull
	@Size(min = 3, max = 30, message = "Product name size should be between 3-30")
	private String productName;

	@NotNull
	@DecimalMin(value = "0.00")
	private Double price;

	private String description;

	@NotNull
	private String manufacturer;

	@NotNull
	@Min(value = 0)
	private Integer quantity;

	@Enumerated(EnumType.STRING)
	private CategoryEnum category;

	@Enumerated(EnumType.STRING)
	private ProductStatus status;

//	@ManyToMany(cascade = CascadeType.ALL)
//	private Order order;


	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Comment> comment;


	@ManyToOne
	@JsonIgnore
	private Seller seller;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	private List<Image> images = new ArrayList<>();


//	@ManyToMany
//	@JsonIgnore
//	private List<Cart> productCarts = new ArrayList<>();

}
