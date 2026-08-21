package com.mini.project.Controller;


import com.mini.project.Model.Product;
import com.mini.project.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService service;
    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return service.getAllProducts();
    }
    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }
    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addProduct(
            @RequestPart("product") Product product,
            @RequestPart("imageFile") MultipartFile imageFile) throws IOException {

        return service.addProduct(product, imageFile);
    }
    @PutMapping("/products/{id}")

    public Product updateProduct(@PathVariable int id,@RequestBody Product product){
        return service.updateProduct(id,product);
    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        boolean deleted = service.deleteProduct(id);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/products/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category){
        return service.getProductsByCategory(category);
    }
    @GetMapping("/products/search/{brand}/{category}")
    public List<Product> getProductsByBrandAndCategory(@PathVariable String brand, @PathVariable String category)
    {
        return service.getProductsByBrandAndCategory(brand,category);
    }
    @GetMapping("/products/price/{price}")
    public List<Product> lessThanPrice(@PathVariable Double price){
        return service.lessThanPrice(price);
    }
    @GetMapping("/products/quantity/{quantity}")
    public List<Product> greaterthanquantity(@PathVariable int quantity){
        return service.greaterthanquantity(quantity);
    }
    @GetMapping("/products/available")
    public List<Product> isavailable(){
        return service.isAvailable(true);
    }


}
