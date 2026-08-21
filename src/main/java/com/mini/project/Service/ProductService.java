package com.mini.project.Service;

import com.mini.project.Model.Product;
import com.mini.project.Repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository repo;


    public List<Product> getAllProducts(){
        return repo.findAll();
    }
    public Product getProductById(int id){
        return repo.findById(id).orElse(null);
    }
    public Product addProduct(Product product, MultipartFile imageFile)
            throws IOException {

        if (imageFile != null && !imageFile.isEmpty()) {

            String uploadDir = "uploads/";

            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String fileName =
                    System.currentTimeMillis()
                            + "_"
                            + imageFile.getOriginalFilename();

            Path filePath = Paths.get(uploadDir, fileName);

            Files.write(filePath, imageFile.getBytes());

            product.setImageUrl("/uploads/" + fileName);
        }

        return repo.save(product);
    }
    public Product updateProduct(int id, Product product){
        if(repo.existsById(id)){
            product.setId(id);
            return repo.save(product);}
        else{
            return null;}
    }

    public boolean deleteProduct(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
    public List<Product> getProductsByCategory(String category){
        return repo.findByCategory(category);
    }
    public List<Product> getProductsByBrandAndCategory(String brand, String category){
         return repo.findByBrandAndCategory(brand,category);
    }
    public List<Product> lessThanPrice(Double price){
        return repo.findByPriceLessThan(price);
    }


    public List<Product> greaterthanquantity(int quantity) {
        return repo.findByQuantityGreaterThan(quantity);
    }

    public List<Product> isAvailable(boolean available){
        return repo.findByAvailable(available);
    }
}
