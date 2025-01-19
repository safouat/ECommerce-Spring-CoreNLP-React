package com.safouat.service;

import java.util.List;

import com.safouat.exception.SellerException;
import com.safouat.models.Seller;
import com.safouat.models.SellerDTO;
import com.safouat.models.SessionDTO;

public interface SellerService {
	
	Seller addSeller(Seller seller);
	
	List<Seller> getAllSellers() throws SellerException;
	
	Seller getSellerById(Integer sellerId)throws SellerException;
	
	Seller getSellerByMobile(String mobile, String token) throws SellerException;
	
	Seller getCurrentlyLoggedInSeller(String token) throws SellerException;
	
	SessionDTO updateSellerPassword(SellerDTO sellerDTO, String token) throws SellerException;
	
	Seller updateSeller(Seller seller, String token)throws SellerException;
	
	Seller updateSellerMobile(SellerDTO sellerdto, String token)throws SellerException;
	
	Seller deleteSellerById(Integer sellerId, String token)throws SellerException;

}
