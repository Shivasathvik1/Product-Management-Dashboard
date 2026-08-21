package com.mini.project.Repo;

import com.mini.project.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
   public List<Product> findByCategory(String category);
   public List<Product> findByBrandAndCategory(String brand,String category);
   public List<Product> findByPriceLessThan(Double price);
   public List<Product> findByQuantityGreaterThan(int quantity);
   public List<Product> findByAvailable(boolean available);
}
