package com.safouat.models;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seller {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer sellerId;
	
	@NotNull(message="Please enter the first name")
	@Pattern(regexp="[A-Za-z\\s]+", message="First Name should contains alphabets only")
	private String firstName;
	
	@NotNull(message="Please enter the last name")
	@Pattern(regexp="[A-Za-z\\s]+", message="First Name should contains alphabets only")
	private String lastName;
	
   @Pattern(regexp="[A-Za-z0-9!@#$%^&*_]{8,15}", message="Please Enter a valid Password")
	private String password;
	
	@NotNull(message="Please enter your mobile Number")
	@Pattern(regexp = "^0[67][0-9]{8}$", message = "Enter a valid 10-digit mobile number")
	@Column(unique = true)
	private String mobile;
	
	
	@Email
	@Column(unique = true)
	private String emailId;




	@OneToMany(mappedBy = "seller")
	@JsonIgnore
	private List<Product> products = new ArrayList<>();


	// Other fields and getters/setters



}
