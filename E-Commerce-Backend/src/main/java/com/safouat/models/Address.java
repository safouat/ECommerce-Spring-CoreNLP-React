package com.safouat.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer addressId;
	
	@Pattern(regexp = "[A-Za-z0-9\\s-]{3,}", message = "Not a valid street no")
	private String streetNo;
	
	@Pattern(regexp = "[A-Za-z0-9\\s-]{3,}", message = "Not a valid building name")
	private String buildingName;
	

	private String locality;
	

	private String city;
	
	private String state;
	
	@NotNull(message = "Pincode cannot be null")
	@Pattern(regexp = "[0-9]{6}", message = "Pincode not valid. Must be 6 digits")
	private String pincode;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	private Customer customer;
	
	
}
