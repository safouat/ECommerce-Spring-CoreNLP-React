package com.safouat.models;

import javax.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartDTO {

	@NotNull
	private Integer productId;

	private String productName;

	private Double price;

	@Min(1)
	private Integer quantity;

	@NotNull
	private LocalDateTime timestamp = LocalDateTime.now(); // This will store the current time

}
