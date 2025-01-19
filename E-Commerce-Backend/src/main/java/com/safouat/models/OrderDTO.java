package com.safouat.models;

import javax.persistence.Embedded;
import javax.validation.constraints.NotNull;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class OrderDTO {
	
	@NotNull
	@Embedded
	private CreditCard cardNumber;
	@NotNull
	private String addressType;
}
