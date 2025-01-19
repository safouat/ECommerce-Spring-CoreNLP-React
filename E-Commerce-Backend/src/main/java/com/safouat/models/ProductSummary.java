package com.safouat.models;

public class ProductSummary {

    private Integer productId;
    private Long totalQuantity;
    private Double totalPrice;

    // Constructor
    public ProductSummary(Integer productId, Long totalQuantity, Double totalPrice) {
        this.productId = productId;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
