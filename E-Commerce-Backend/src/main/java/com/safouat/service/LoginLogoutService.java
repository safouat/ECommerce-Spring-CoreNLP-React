package com.safouat.service;

import com.safouat.models.CustomerDTO;
import com.safouat.models.SellerDTO;
import com.safouat.models.SessionDTO;
import com.safouat.models.UserSession;


public interface LoginLogoutService {
	
	UserSession loginCustomer(CustomerDTO customer);
	
	SessionDTO logoutCustomer(SessionDTO session);
	
	void checkTokenStatus(String token);
	
	void deleteExpiredTokens();
	
	
	UserSession loginSeller(SellerDTO seller);
	
	SessionDTO logoutSeller(SessionDTO session);
	
	
}
