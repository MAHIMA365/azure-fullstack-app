using ShoppingCartAPI.Data;
using ShoppingCartAPI.Models;

namespace ShoppingCartAPI.Services
{
    public class ProductService
    {
        private readonly AppDbContext _context;
        public ProductService(AppDbContext context) => _context = context;

        public IEnumerable<Product> GetAll() => _context.Products.ToList();

        public void SeedData()
        {
            // Clear existing products and add new ones
            _context.Products.RemoveRange(_context.Products);
            _context.Products.AddRange(
                new Product { Name = "Margherita Pizza", Price = 12.99m },
                new Product { Name = "Cheeseburger", Price = 8.99m },
                new Product { Name = "Spaghetti Carbonara", Price = 14.50m },
                new Product { Name = "Caesar Salad", Price = 9.99m },
                new Product { Name = "Chicken Wings", Price = 11.99m },
                new Product { Name = "Fish & Chips", Price = 13.99m },
                new Product { Name = "Beef Tacos", Price = 10.99m },
                new Product { Name = "Chocolate Cake", Price = 6.99m },
                new Product { Name = "Iced Coffee", Price = 4.99m },
                new Product { Name = "Grilled Salmon", Price = 18.99m }
            );
            _context.SaveChanges();
        }
    }
}
